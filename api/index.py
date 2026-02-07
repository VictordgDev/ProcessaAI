# Vercel Serverless Function entrypoint (Python)
# Exposes FastAPI app at /api/*
from backend.app.main import app  # noqa: F401
