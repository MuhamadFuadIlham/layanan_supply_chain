import logging
import os
import pickle
from contextlib import asynccontextmanager
from typing import Any, Dict

import numpy as np
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("supply-chain-oracle-mlops")

# Global variables for loaded artifacts
model: Any = None
scaler: Any = None

MODEL_PATH = "xgb_logistics_model.pkl"
SCALER_PATH = "scaler_efisiensi.pkl"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Context manager handling startup and shutdown events (lifespan pattern)."""
    global model, scaler
    logger.info("Initializing Antigravity Cloud cold-start process...")

    # Load Scaler
    try:
        if not os.path.exists(SCALER_PATH):
            logger.critical(f"[FATAL] Scaler file not found at path: {SCALER_PATH}")
            raise FileNotFoundError(f"Scaler file missing: {SCALER_PATH}")

        logger.info(f"Loading efficiency scaler from '{SCALER_PATH}'...")
        with open(SCALER_PATH, "rb") as f:
            scaler = pickle.load(f)
        logger.info("Scaler loaded successfully.")
    except Exception as e:
        logger.critical(f"[FATAL] Failed to load scaler: {str(e)}")
        # Keeping container alive but logging critical failure
        scaler = None

    # Load XGBoost Model
    try:
        if not os.path.exists(MODEL_PATH):
            logger.critical(f"[FATAL] Model file not found at path: {MODEL_PATH}")
            raise FileNotFoundError(f"Model file missing: {MODEL_PATH}")

        logger.info(f"Loading XGBoost model from '{MODEL_PATH}'...")
        with open(MODEL_PATH, "rb") as f:
            model = pickle.load(f)
        logger.info("XGBoost Regressor model loaded successfully.")
    except Exception as e:
        logger.critical(f"[FATAL] Failed to load model: {str(e)}")
        # Keeping container alive but logging critical failure
        model = None

    yield

    # Cleanup operations (if any)
    logger.info("Shutting down Antigravity Cloud instance...")


app = FastAPI(
    title="The Supply Chain Oracle API",
    description="Backend API for AI-Powered Lead Time & ROP Forecasting",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionRequest(BaseModel):
    Harga_jual: float = Field(..., description="Selling price of the SKU")
    Jumlah_produk_terjual: float = Field(..., description="Annual units sold")
    Kuantitas_pesanan: float = Field(..., description="Order quantity")
    Volume_produksi_pabrik: float = Field(..., description="Factory production volume")
    Waktu_produksi_pabrik: float = Field(..., description="Factory production time in days")
    Biaya_produksi_pabrik: float = Field(..., description="Factory production cost")
    Total_biaya_operasional: float = Field(..., description="Total operating cost")
    Tingkat_cacat_produk: float = Field(..., description="Product defect rate percentage")
    Inspeksi_Encoded: float = Field(..., description="Quality inspection status encoded (e.g., 0, 1, 2)")
    Segmen_Efisiensi_0: int = Field(..., description="Efficiency cluster segment binary flag (0 or 1)")
    Segmen_Efisiensi_1: int = Field(..., description="Efficiency cluster segment binary flag (0 or 1)")
    Segmen_Efisiensi_2: int = Field(..., description="Efficiency cluster segment binary flag (0 or 1)")

    class Config:
        json_schema_extra = {
            "example": {
                "Harga_jual": 50000.0,
                "Jumlah_produk_terjual": 3650.0,
                "Kuantitas_pesanan": 250.0,
                "Volume_produksi_pabrik": 1000.0,
                "Waktu_produksi_pabrik": 5.0,
                "Biaya_produksi_pabrik": 12000000.0,
                "Total_biaya_operasional": 15000000.0,
                "Tingkat_cacat_produk": 1.5,
                "Inspeksi_Encoded": 1.0,
                "Segmen_Efisiensi_0": 0,
                "Segmen_Efisiensi_1": 1,
                "Segmen_Efisiensi_2": 0,
            }
        }


class PredictionResponse(BaseModel):
    predicted_lead_time_days: float
    calculated_rop_units: int
    ai_agent_recommendation: str


@app.get("/health", tags=["System"])
def health_check() -> Dict[str, str]:
    """In-depth status monitoring check endpoint."""
    model_status = "READY" if model is not None else "ERROR"
    scaler_status = "READY" if scaler is not None else "ERROR"
    return {
        "status": "online" if (model and scaler) else "degraded",
        "model_status": model_status,
        "scaler_status": scaler_status,
    }


@app.post("/api/v1/predict-rop", response_model=PredictionResponse, tags=["Prediction"])
async def predict_rop(payload: PredictionRequest):
    """Endpoint predictions for lead time & ROP calculation."""
    if model is None or scaler is None:
        logger.error("[ERROR] API called but models/scalers are not loaded correctly.")
        raise HTTPException(
            status_code=503,
            detail="Prediction models or scalers are currently unavailable on this instance.",
        )

    try:
        # 1. Arrange features in correct scaling format
        features = [
            payload.Harga_jual,
            payload.Jumlah_produk_terjual,
            payload.Kuantitas_pesanan,
            payload.Volume_produksi_pabrik,
            payload.Waktu_produksi_pabrik,
            payload.Biaya_produksi_pabrik,
            payload.Total_biaya_operasional,
            payload.Tingkat_cacat_produk,
            payload.Inspeksi_Encoded,
            payload.Segmen_Efisiensi_0,
            payload.Segmen_Efisiensi_1,
            payload.Segmen_Efisiensi_2,
        ]

        logger.info(f"Received prediction request for SKU price {payload.Harga_jual}")

        # Convert to numpy array with shape (1, n_features)
        features_arr = np.array([features], dtype=np.float32)

        # 2. Transform features using scaler
        scaled_features = scaler.transform(features_arr)

        # 3. Model Prediction
        prediction_val = model.predict(scaled_features)

        # Extract scalar value from prediction array
        predicted_lead_time = float(prediction_val[0])
        # Ensure predicted lead time is positive and realistic
        predicted_lead_time = max(0.5, predicted_lead_time)

        # 4. ROP Decision Engine Logic
        # Formula: ROP = ((Jumlah_produk_terjual / 365) * Prediksi_Total_Waktu_Tunggu) + 5
        daily_demand = payload.Jumlah_produk_terjual / 365.0
        calculated_rop = (daily_demand * predicted_lead_time) + 5.0
        calculated_rop_units = int(np.ceil(calculated_rop))

        # 5. Formulate Warehouse recommendation text
        if calculated_rop_units <= 0:
            calculated_rop_units = 1

        recommendation = (
            f"Berdasarkan prediksi lead time AI sebesar {predicted_lead_time:.2f} hari "
            f"dan safety stock buffer 5 unit, segera lakukan pemesanan ulang "
            f"saat stok fisik tersisa {calculated_rop_units} unit."
        )

        logger.info(
            f"Prediction calculated successfully. Lead time: {predicted_lead_time:.2f} days, ROP: {calculated_rop_units} units."
        )

        return PredictionResponse(
            predicted_lead_time_days=round(predicted_lead_time, 2),
            calculated_rop_units=calculated_rop_units,
            ai_agent_recommendation=recommendation,
        )

    except Exception as e:
        logger.error(f"[ERROR] Exception during model inference: {str(e)}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Inference computation error: {str(e)}",
        )
