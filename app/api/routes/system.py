from fastapi import APIRouter
from app.schemas.response import BaseResponse
from app.ml.loader import MLArtifacts

router = APIRouter(prefix="/system", tags=["System"])

@router.get("/status", summary="Get System Component Status")
async def system_status():
    model_ready = MLArtifacts.get_model() is not None
    scaler_ready = MLArtifacts.get_scaler() is not None
    inference_ready = model_ready and scaler_ready
    
    return BaseResponse(
        success=True,
        message="System status retrieved successfully.",
        data={
            "Model Ready": model_ready,
            "Scaler Ready": scaler_ready,
            "Supabase Ready": False,
            "Inference Ready": inference_ready
        }
    )

@router.get("/feature-boundaries", summary="Feature Boundaries for UI Guardrails")
async def feature_boundaries():
    return BaseResponse(
        success=True,
        message="Boundaries fetched successfully.",
        data={
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
    )
