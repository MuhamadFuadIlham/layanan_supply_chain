from fastapi import FastAPI
from app.core.config import settings
from app.core.lifespan import lifespan
from app.core.middleware import setup_middleware
from app.core.exceptions import setup_exception_handlers
from app.api.routes import prediction, health, system

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
    lifespan=lifespan,
)

# Setup Middlewares (CORS, Timing)
setup_middleware(app)

# Setup Global Exception Handlers
setup_exception_handlers(app)

# Include Routers
app.include_router(prediction.router, prefix=settings.API_V1_STR)
app.include_router(health.router, prefix="/api")
app.include_router(system.router, prefix="/api")

@app.get("/", summary="Root Endpoint")
async def root():
    return {
        "message": "Welcome to The Supply Chain Oracle API (Enterprise MLOps Edition)",
        "docs_url": "/docs",
        "health_url": "/api/health"
    }
