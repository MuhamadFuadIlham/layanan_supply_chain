from typing import Any, Dict, Generic, Optional, TypeVar
from pydantic import BaseModel, Field

T = TypeVar("T")

class ResponseMetadata(BaseModel):
    model_version: Optional[str] = None
    latency_ms: Optional[float] = None
    prediction_time: Optional[str] = None
    
    model_config = {"extra": "allow"}

class BaseResponse(BaseModel, Generic[T]):
    success: bool
    message: str
    data: Optional[T] = None
    metadata: ResponseMetadata = Field(default_factory=ResponseMetadata)
