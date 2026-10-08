"""FarmVoice AI backend — FastAPI + MySQL only."""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routes import auth, health, users

settings = get_settings()

app = FastAPI(title="FarmVoice AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(auth.router)
app.include_router(users.router)


@app.get("/")
def root():
    return {"app": "FarmVoice AI API", "database": "mysql"}
