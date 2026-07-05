import time
from fastapi import BackgroundTasks
from app.schemas.prediction import PredictionRequest, PredictionData
from app.ml.preprocessing import encode_inspection
from app.ml.feature_engineering import calculate_efficiency_ratio, calculate_workload, determine_efficiency_segments
from app.ml.scaler import apply_scaling
from app.ml.predictor import run_prediction
from app.ml.decision_engine import run_decision_engine
from app.database.repository import insert_prediction_history
from app.core.exceptions import MLServiceException
from app.core.logger import logger

def process_prediction(payload: PredictionRequest, background_tasks: BackgroundTasks) -> dict:
    start_time = time.time()
    
    try:
        # 1. Preprocessing
        inspeksi_encoded = encode_inspection(payload.Hasil_inspeksi_kualitas)
        
        # 2. Feature Engineering
        rasio_efisiensi = calculate_efficiency_ratio(payload.Biaya_produksi_pabrik, payload.Total_biaya_operasional)
        beban_kerja = calculate_workload(payload.Volume_produksi_pabrik, payload.Waktu_produksi_pabrik)
        seg_0, seg_1, seg_2 = determine_efficiency_segments(rasio_efisiensi, payload.Tingkat_cacat_produk)
        
        # 3. Scaling
        (scaled_vol, scaled_waktu, scaled_biaya, scaled_total, scaled_cacat, scaled_inspeksi) = apply_scaling(
            tingkat_stok=payload.Tingkat_stok_gudang,
            volume_produksi=payload.Volume_produksi_pabrik,
            waktu_produksi=payload.Waktu_produksi_pabrik,
            biaya_produksi=payload.Biaya_produksi_pabrik,
            total_biaya=payload.Total_biaya_operasional,
            tingkat_cacat=payload.Tingkat_cacat_produk,
            inspeksi_encoded=inspeksi_encoded
        )
        
        # 4. Predict Lead Time
        predicted_lead_time = run_prediction(
            harga_jual=payload.Harga_jual,
            jumlah_produk_terjual=payload.Jumlah_produk_terjual,
            kuantitas_pesanan=payload.Kuantitas_pesanan,
            scaled_volume_produksi=scaled_vol,
            scaled_waktu_produksi=scaled_waktu,
            scaled_biaya_produksi=scaled_biaya,
            scaled_total_biaya=scaled_total,
            scaled_tingkat_cacat=scaled_cacat,
            scaled_inspeksi=scaled_inspeksi,
            rasio_efisiensi=rasio_efisiensi,
            beban_kerja=beban_kerja,
            seg_0=seg_0,
            seg_1=seg_1,
            seg_2=seg_2
        )
        
        # 5. Decision Engine
        rop_units, recommendation = run_decision_engine(payload.Jumlah_produk_terjual, predicted_lead_time)
        
        # 6. Response Construction
        data = PredictionData(
            predicted_lead_time_days=round(predicted_lead_time, 2),
            calculated_rop_units=rop_units,
            ai_agent_recommendation=recommendation,
            feature_deviations={
                "rasio_efisiensi": round(rasio_efisiensi, 2),
                "inspeksi_status": int(inspeksi_encoded)
            }
        )
        
        # 7. Background task for DB insertion
        latency = (time.time() - start_time) * 1000
        background_tasks.add_task(
            insert_prediction_history,
            payload=payload.model_dump(),
            result=data.model_dump()
        )
        
        return {
            "data": data,
            "latency_ms": latency
        }

    except ValueError as ve:
        raise MLServiceException(f"Data processing error: {str(ve)}", status_code=400)
    except Exception as e:
        logger.error(f"Inference computation error: {str(e)}", exc_info=True)
        raise MLServiceException("Inference error occurred. Please check system health.", status_code=500)
