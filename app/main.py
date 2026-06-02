from fastapi import FastAPI

from app.api.routes import router

app = FastAPI(
    title="Personal Hub API",
    description="Backend service for CV, portfolio, travel, postcard, and AI modules.",
    version="0.1.0",
)

app.include_router(router)


@app.get("/", tags=["health"])
def read_root() -> dict[str, str]:
    return {"message": "Personal Hub API is running."}

