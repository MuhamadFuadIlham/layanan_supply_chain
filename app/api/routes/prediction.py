from fastapi import APIRouter, BackgroundTasks, status
from app.schemas.prediction import PredictionRequest, PredictionData
from app.schemas.response import BaseResponse, ResponseMetadata
from app.services.prediction_service import process_prediction
from datetime import datetime

router = APIRouter(prefix="/predict-rop", tags=["Prediction"])

@router.post(
    "", 
    response_model=BaseResponse[PredictionData], 
    status_code=status.HTTP_200_OK,
    summary="Predict Reorder Point (ROP)",
    description="Calculate ROP and Lead Time based on factory capabilities, costs, and historical demands."
)
async def predict_rop_endpoint(payload: PredictionRequest, background_tasks: BackgroundTasks):
    result = process_prediction(payload, background_tasks)
    
    return BaseResponse(
        success=True,
        message="Prediction generated successfully.",
        data=result["data"],
        metadata=ResponseMetadata(
            model_version="2.0.0",
            latency_ms=result["latency_ms"],
            prediction_time=datetime.utcnow().isoformat()
        )
    )
