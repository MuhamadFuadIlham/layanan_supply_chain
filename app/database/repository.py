from typing import Dict, Any
from app.database.supabase import SupabaseManager
from app.core.logger import logger
import time

def insert_prediction_history(payload: Dict[str, Any], result: Dict[str, Any], retries: int = 3):
    """
    Fire-and-forget function to store prediction history in Supabase.
    Called as a BackgroundTask so it doesn't block the API response.
    """
    for attempt in range(1, retries + 1):
        try:
            client = SupabaseManager.get_client()
            if client:
                data = {
                    "request_payload": payload,
                    "prediction_result": result
                }
                # client.table("predictions_history").insert(data).execute()
                logger.info(f"Prediction history asynchronously saved to Supabase (Mocked) on attempt {attempt}")
                return
            else:
                logger.warning("Supabase client is not available. Skipping DB insert.")
                return
        except Exception as e:
            logger.warning(f"Failed to insert prediction history to DB on attempt {attempt}: {e}")
            if attempt < retries:
                time.sleep(1) # simple backoff
            else:
                logger.error(f"Failed to insert prediction history to DB after {retries} attempts.")
