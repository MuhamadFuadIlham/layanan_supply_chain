import asyncio
from app.main import app
from fastapi.testclient import TestClient

def test_startup():
    with TestClient(app) as client:
        response = client.get("/api/health")
        print(f"Health response: {response.json()}")
        assert response.status_code == 200

if __name__ == "__main__":
    test_startup()
    print("Test completed successfully.")
