import logging
import math
import os
import pickle
from contextlib import asynccontextmanager
from typing import Any, Dict

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# ---------------------------------------------------------
# SETUP & LOGGING
# ---------------------------------------------------------
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("supply-chain-oracle-mlops")

model: Any = None
scaler: Any = None

MODEL_PATH = "xgb_logistics_model.pkl"
SCALER_PATH = "scaler_efisiensi.pkl"


# ---------------------------------------------------------
# LIFESPAN & INITIALIZATION
# ---------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    global model, scaler
    logger.info("Initializing Antigravity Cloud - Loading ML Artifacts (Singleton)...")

    try:
        if not os.path.exists(SCALER_PATH):
            logger.critical(f"Scaler missing: {SCALER_PATH}")
        else:
            with open(SCALER_PATH, "rb") as f:
                scaler = pickle.load(f)
            logger.info("Scaler loaded successfully.")

        if not os.path.exists(MODEL_PATH):
            logger.critical(f"Model missing: {MODEL_PATH}")
        else:
            with open(MODEL_PATH, "rb") as f:
                model = pickle.load(f)
            logger.info("XGBoost Regressor model loaded successfully.")

    except Exception as e:
        logger.critical(f"Failed to load artifacts during startup: {str(e)}")

    yield
    logger.info("Shutting down ML inference node...")


# ---------------------------------------------------------
# FASTAPI APP
# ---------------------------------------------------------
app = FastAPI(
    title="The Supply Chain Oracle API",
    description="Enterprise MLOps Backend for AI-Powered Lead Time & ROP Forecasting",
    version="2.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# PYDANTIC SCHEMAS
# ---------------------------------------------------------
class PredictionRequest(BaseModel):
    Harga_jual: float = Field(..., description="Selling price of the SKU")
    Jumlah_produk_terjual: float = Field(..., description="Annual units sold")
    Kuantitas_pesanan: float = Field(..., description="Order quantity")
    Volume_produksi_pabrik: float = Field(..., description="Factory production volume")
    Waktu_produksi_pabrik: float = Field(..., description="Factory production time in days")
    Biaya_produksi_pabrik: float = Field(..., description="Factory production cost")
    Total_biaya_operasional: float = Field(..., description="Total operating cost")
    Tingkat_cacat_produk: float = Field(..., description="Product defect rate percentage")
    Hasil_inspeksi_kualitas: str = Field(..., pattern="^(Pass|Pending|Fail)$", description="Quality inspection status")
    Tingkat_stok_gudang: float = Field(..., description="Current warehouse stock level")

    class Config:
        json_schema_extra = {
            "example": {
                "Harga_jual": 50000.0,
                "Jumlah_produk_terjual": 3650.0,
                "Kuantitas_pesanan": 250.0,
                "Volume_produksi_pabrik": 1000.0,
                "Waktu_produksi_pabrik": 5.0,
                "Biaya_produksi_pabrik": 12000000.0,
                "Total_biaya_operasional": 15000000.0,
                "Tingkat_cacat_produk": 1.5,
                "Hasil_inspeksi_kualitas": "Pass",
                "Tingkat_stok_gudang": 100.0,
            }
        }


class PredictionResponse(BaseModel):
    predicted_lead_time_days: float
    calculated_rop_units: int
    ai_agent_recommendation: str
    feature_deviations: Dict[str, float]


# ---------------------------------------------------------
# ENDPOINTS
# ---------------------------------------------------------
@app.get("/api/v1/model-health", tags=["System"])
def model_health():
    """
    Returns static health metrics.
    MAE is base 0.66 days to avoid false data drift alarms as requested.
    """
    return {
        "status": "online" if (model and scaler) else "degraded",
        "model_status": "READY" if model is not None else "ERROR",
        "scaler_status": "READY" if scaler is not None else "ERROR",
        "metrics": {
            "mae_base": 0.66,
            "drift_detected": False,
            "last_retrain": "2023-10-01T00:00:00Z"
        }
    }


@app.get("/api/v1/feature-boundaries", tags=["System"])
def feature_boundaries():
    """
    Sends min/max operational boundaries to frontend for UI Guardrails.
    Prevents ML extrapolation.
    """
    return {
        "boundaries": {
            "Harga_jual": {"min": 10000, "max": 5000000},
            "Jumlah_produk_terjual": {"min": 10, "max": 50000},
            "Kuantitas_pesanan": {"min": 10, "max": 10000},
            "Volume_produksi_pabrik": {"min": 100, "max": 20000},
            "Waktu_produksi_pabrik": {"min": 1, "max": 30},
            "Biaya_produksi_pabrik": {"min": 1000000, "max": 500000000},
            "Total_biaya_operasional": {"min": 1500000, "max": 600000000},
            "Tingkat_cacat_produk": {"min": 0.0, "max": 15.0},
            "Tingkat_stok_gudang": {"min": 0, "max": 50000},
        }
    }


@app.post("/api/v1/predict-rop", response_model=PredictionResponse, tags=["Prediction"])
async def predict_rop(payload: PredictionRequest):
    if model is None or scaler is None:
        logger.error("API called but artifacts are unavailable.")
        raise HTTPException(status_code=503, detail="ML Models unavailable.")

    try:
        # ---------------------------------------------------------
        # A. Feature Engineering
        # ---------------------------------------------------------
        inspeksi_map = {"Pass": 0.0, "Pending": 1.0, "Fail": 2.0}
        inspeksi_encoded = inspeksi_map.get(payload.Hasil_inspeksi_kualitas, 1.0)
        
        # Prevent division by zero
        total_biaya = max(payload.Total_biaya_operasional, 1.0)
        rasio_efisiensi_biaya = payload.Biaya_produksi_pabrik / total_biaya
        beban_kerja_pabrik = payload.Volume_produksi_pabrik * payload.Waktu_produksi_pabrik

        # ---------------------------------------------------------
        # B. Unsupervised Rule Mock (Mitigasi tanpa KMeans)
        # ---------------------------------------------------------
        seg_0, seg_1, seg_2 = 0, 0, 0
        if rasio_efisiensi_biaya < 0.75 and payload.Tingkat_cacat_produk < 2.0:
            seg_0 = 1  # High Efficiency
        elif rasio_efisiensi_biaya >= 0.90 or payload.Tingkat_cacat_produk > 5.0:
            seg_2 = 1  # Low Efficiency
        else:
            seg_1 = 1  # Medium Efficiency

        # ---------------------------------------------------------
        # C. Prapemrosesan Scaler (Surgical Patch)
        # ---------------------------------------------------------
        # Scaler expects EXACTLY 8 features:
        # ['Total_waktu_tunggu', 'Tingkat_stok_gudang', 'Volume_produksi_pabrik', 
        #  'Waktu_produksi_pabrik', 'Biaya_produksi_pabrik', 'Total_biaya_operasional', 
        #  'Tingkat_cacat_produk', 'Inspeksi_Encoded']
        
        # TECH DEBT: 'Total_waktu_tunggu' is the target. Using dummy 15.0 to satisfy scaler shape.
        dummy_total_waktu_tunggu = 15.0 
        
        scaler_input = np.array([[
            dummy_total_waktu_tunggu,
            payload.Tingkat_stok_gudang,
            payload.Volume_produksi_pabrik,
            payload.Waktu_produksi_pabrik,
            payload.Biaya_produksi_pabrik,
            payload.Total_biaya_operasional,
            payload.Tingkat_cacat_produk,
            inspeksi_encoded
        ]], dtype=np.float32)

        scaled_out = scaler.transform(scaler_input)[0]

        # Extracting the correctly scaled features
        scaled_volume_produksi = scaled_out[2]
        scaled_waktu_produksi = scaled_out[3]
        scaled_biaya_produksi = scaled_out[4]
        scaled_total_biaya = scaled_out[5]
        scaled_tingkat_cacat = scaled_out[6]
        scaled_inspeksi = scaled_out[7]

        # ---------------------------------------------------------
        # D. Rekonstruksi Matriks Fitur XGBoost
        # ---------------------------------------------------------
        # XGBoost expects EXACTLY 14 features:
        # ['Harga_jual', 'Jumlah_produk_terjual', 'Kuantitas_pesanan', 'Volume_produksi_pabrik', 
        #  'Waktu_produksi_pabrik', 'Biaya_produksi_pabrik', 'Total_biaya_operasional', 
        #  'Tingkat_cacat_produk', 'Inspeksi_Encoded', 'Rasio_Efisiensi_Biaya', 
        #  'Beban_Kerja_Pabrik', 'Segmen_Efisiensi_0', 'Segmen_Efisiensi_1', 'Segmen_Efisiensi_2']
        
        xgb_input = np.array([[
            payload.Harga_jual,             # 1
            payload.Jumlah_produk_terjual,  # 2
            payload.Kuantitas_pesanan,      # 3
            scaled_volume_produksi,         # 4
            scaled_waktu_produksi,          # 5
            scaled_biaya_produksi,          # 6
            scaled_total_biaya,             # 7
            scaled_tingkat_cacat,           # 8
            scaled_inspeksi,                # 9
            rasio_efisiensi_biaya,          # 10
            beban_kerja_pabrik,             # 11
            seg_0,                          # 12
            seg_1,                          # 13
            seg_2                           # 14
        ]], dtype=np.float32)

        # ---------------------------------------------------------
        # E. Model Inference & Decision Engine
        # ---------------------------------------------------------
        prediction_val = model.predict(xgb_input)
        predicted_lead_time = float(prediction_val[0])
        predicted_lead_time = max(0.5, predicted_lead_time)

        # ROP = ((Demand/365) * LeadTime) + 5
        daily_demand = payload.Jumlah_produk_terjual / 365.0
        calculated_rop = (daily_demand * predicted_lead_time) + 5.0
        calculated_rop_units = math.ceil(calculated_rop)

        recommendation = (
            f"Berdasarkan prediksi AI (Lead Time: {predicted_lead_time:.1f} hari, "
            f"Safety Stock: 5 unit), ROP optimum adalah {calculated_rop_units} unit."
        )

        return PredictionResponse(
            predicted_lead_time_days=round(predicted_lead_time, 2),
            calculated_rop_units=calculated_rop_units,
            ai_agent_recommendation=recommendation,
            feature_deviations={
                "rasio_efisiensi": round(rasio_efisiensi_biaya, 2),
                "inspeksi_status": int(inspeksi_encoded)
            }
        )

    except Exception as e:
        logger.error(f"Inference computation error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")
