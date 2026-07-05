from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "The Supply Chain Oracle API"
    DESCRIPTION: str = "Enterprise MLOps Backend for AI-Powered Lead Time & ROP Forecasting"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    
    # ML Models
    MODEL_PATH: str = "app/models/xgb_logistics_model.pkl"
    SCALER_PATH: str = "app/models/scaler_efisiensi.pkl"
    
    # Supabase (Optional)
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
