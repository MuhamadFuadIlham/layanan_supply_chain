# Using a mock or minimal supabase client for now to avoid breaking changes if keys are missing
from app.core.config import settings
from app.core.logger import logger

try:
    from supabase import create_client, Client
except ImportError:
    Client = None
    logger.warning("Supabase python client not installed, running without it.")

class SupabaseManager:
    _client: Client = None

    @classmethod
    def get_client(cls) -> Client:
        if cls._client is None and Client is not None:
            if settings.SUPABASE_URL and settings.SUPABASE_KEY:
                try:
                    cls._client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
                except Exception as e:
                    logger.error(f"Failed to initialize Supabase client: {e}")
            else:
                logger.warning("Supabase URL or Key not provided.")
        return cls._client
