@echo off
echo ====================================================
echo Starting The Supply Chain Oracle (MLOps Enterprise)
echo ====================================================

echo [1] Starting FastAPI Backend on port 8000...
start cmd /k ".venv\Scripts\python.exe -m uvicorn app:app --reload --port 8000"

echo [2] Starting React Frontend...
start cmd /k "npm run dev"

echo.
echo Both servers are starting in separate windows.
echo Frontend should be available at http://localhost:5173
echo Backend API docs available at http://localhost:8000/docs
echo ====================================================
