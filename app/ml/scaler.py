import numpy as np
from app.ml.loader import MLArtifacts

def apply_scaling(
    tingkat_stok: float,
    volume_produksi: float,
    waktu_produksi: float,
    biaya_produksi: float,
    total_biaya: float,
    tingkat_cacat: float,
    inspeksi_encoded: float
) -> tuple:
    scaler = MLArtifacts.get_scaler()
    if scaler is None:
        raise ValueError("Scaler is not loaded")

    # Scaler expects EXACTLY 8 features:
    # ['Total_waktu_tunggu', 'Tingkat_stok_gudang', 'Volume_produksi_pabrik', 
    #  'Waktu_produksi_pabrik', 'Biaya_produksi_pabrik', 'Total_biaya_operasional', 
    #  'Tingkat_cacat_produk', 'Inspeksi_Encoded']
    
    # TECH DEBT: 'Total_waktu_tunggu' is the target. Using dummy 15.0 to satisfy scaler shape.
    dummy_total_waktu_tunggu = 15.0 
    
    scaler_input = np.array([[
        dummy_total_waktu_tunggu,
        tingkat_stok,
        volume_produksi,
        waktu_produksi,
        biaya_produksi,
        total_biaya,
        tingkat_cacat,
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

    return (
        scaled_volume_produksi,
        scaled_waktu_produksi,
        scaled_biaya_produksi,
        scaled_total_biaya,
        scaled_tingkat_cacat,
        scaled_inspeksi
    )
