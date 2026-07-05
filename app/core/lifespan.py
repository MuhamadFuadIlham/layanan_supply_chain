from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.core.logger import logger
from app.ml.loader import MLArtifacts

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup logic
    logger.info("Initializing Antigravity Cloud - Loading Resources...")
    MLArtifacts.load_artifacts()
    
    # Store in app.state if needed (optional since we have Singleton)
    app.state.model = MLArtifacts.get_model()
    app.state.scaler = MLArtifacts.get_scaler()
    
    yield
    
    # Shutdown logic
    logger.info("Shutting down ML inference node...")
