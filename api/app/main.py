from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import indices
import os

# Desabilita docs em produção
is_dev = os.getenv("ENV") == "development"
app = FastAPI(
    docs_url="/docs" if is_dev else None,
    redoc_url="/redoc" if is_dev else None
)

# Permite localhost apenas em desenvolvimento
allowed_origins = ["https://faroldoinvestimento.com.br"]
if is_dev:
    allowed_origins.extend(["http://localhost:8080", "http://127.0.0.1:8080"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(indices.router)