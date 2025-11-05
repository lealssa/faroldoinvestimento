from fastapi import APIRouter
from ..oci_client import get_latest_json

router = APIRouter(prefix="/api/v1", tags=["indices"])

@router.get("/indices")
async def get_indices():
    return get_latest_json()