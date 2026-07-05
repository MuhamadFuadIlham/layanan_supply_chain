from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from app.core.logger import logger
from app.schemas.response import BaseResponse

class MLServiceException(Exception):
    """Exception raised for errors in the ML inference pipeline."""
    def __init__(self, message: str, status_code: int = status.HTTP_500_INTERNAL_SERVER_ERROR):
        self.message = message
        self.status_code = status_code

def setup_exception_handlers(app: FastAPI):
    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        logger.error(f"Unhandled exception: {str(exc)}", exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "message": "Internal server error occurred.",
                "data": None,
                "metadata": {"error": type(exc).__name__}
            }
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        logger.warning(f"Validation Error: {exc.errors()}")
        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "message": "Data validation failed.",
                "data": exc.errors(),
                "metadata": {"error": "ValidationError"}
            }
        )

    @app.exception_handler(MLServiceException)
    async def ml_exception_handler(request: Request, exc: MLServiceException):
        logger.warning(f"ML Service Exception: {exc.message}")
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.message,
                "data": None,
                "metadata": {"error": "MLServiceException"}
            }
        )
