import pickle
import os
from app.core.logger import logger
from app.core.config import settings

class MLArtifacts:
    _model = None
    _scaler = None

    @classmethod
    def load_artifacts(cls):
        logger.info("Initializing ML Artifacts (Singleton)...")
        try:
            if not os.path.exists(settings.SCALER_PATH):
                logger.critical(f"Scaler missing: {settings.SCALER_PATH}")
            else:
                with open(settings.SCALER_PATH, "rb") as f:
                    cls._scaler = pickle.load(f)
                logger.info("Scaler loaded successfully.")

            if not os.path.exists(settings.MODEL_PATH):
                logger.critical(f"Model missing: {settings.MODEL_PATH}")
            else:
                with open(settings.MODEL_PATH, "rb") as f:
                    cls._model = pickle.load(f)
                logger.info("XGBoost Regressor model loaded successfully.")
        except Exception as e:
            logger.critical(f"Failed to load artifacts: {str(e)}")

    @classmethod
    def get_model(cls):
        return cls._model

    @classmethod
    def get_scaler(cls):
        return cls._scaler
