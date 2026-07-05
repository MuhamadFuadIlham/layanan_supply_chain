import numpy as np
from app.ml.loader import MLArtifacts

def run_prediction(
    harga_jual: float,
    jumlah_produk_terjual: float,
    kuantitas_pesanan: float,
    scaled_volume_produksi: float,
    scaled_waktu_produksi: float,
    scaled_biaya_produksi: float,
    scaled_total_biaya: float,
    scaled_tingkat_cacat: float,
    scaled_inspeksi: float,
    rasio_efisiensi: float,
    beban_kerja: float,
    seg_0: int,
    seg_1: int,
    seg_2: int
) -> float:
    model = MLArtifacts.get_model()
    if model is None:
        raise ValueError("Model is not loaded")

    # XGBoost expects EXACTLY 14 features:
    xgb_input = np.array([[
        harga_jual,             # 1
        jumlah_produk_terjual,  # 2
        kuantitas_pesanan,      # 3
        scaled_volume_produksi, # 4
        scaled_waktu_produksi,  # 5
        scaled_biaya_produksi,  # 6
        scaled_total_biaya,     # 7
        scaled_tingkat_cacat,   # 8
        scaled_inspeksi,        # 9
        rasio_efisiensi,        # 10
        beban_kerja,            # 11
        seg_0,                  # 12
        seg_1,                  # 13
        seg_2                   # 14
    ]], dtype=np.float32)

    prediction_val = model.predict(xgb_input)
    predicted_lead_time = float(prediction_val[0])
    
    # Ensure min lead time is 0.5 days
    return max(0.5, predicted_lead_time)
