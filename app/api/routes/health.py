from fastapi import APIRouter
from app.ml.loader import MLArtifacts
from app.schemas.response import BaseResponse
import time

router = APIRouter(prefix="/health", tags=["System"])

@router.get("", summary="Comprehensive Health Check")
async def health_check():
    model = MLArtifacts.get_model()
    scaler = MLArtifacts.get_scaler()
    
    data = {
        "status": "online",
        "model_loaded": True if model is not None else False,
        "scaler_loaded": True if scaler is not None else False,
        "database_connected": False, # Placeholder until Supabase is strict
        "api_ready": True
    }
    
    status_ok = data["model_loaded"] and data["scaler_loaded"]
    message = "System is fully operational." if status_ok else "System is degraded."
    
    return BaseResponse(
        success=status_ok,
        message=message,
        data=data
    )
