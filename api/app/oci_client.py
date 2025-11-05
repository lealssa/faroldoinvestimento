import oci
import json
from pathlib import Path
from datetime import datetime, timedelta

_cache = {"data": None, "expires_at": None}

def get_oci_client():
    config_path = Path("oci/config")
    config = oci.config.from_file(str(config_path))
    return oci.object_storage.ObjectStorageClient(config)

def get_latest_json():
    now = datetime.now()
    
    if _cache["data"] and _cache["expires_at"] and now < _cache["expires_at"]:
        return _cache["data"]
    
    client = get_oci_client()
    namespace = client.get_namespace().data
    
    response = client.get_object(
        namespace_name=namespace,
        bucket_name="indices",
        object_name="latest.json"
    )
    
    data = json.loads(response.data.content.decode('utf-8'))
    _cache["data"] = data
    _cache["expires_at"] = now + timedelta(hours=2)
    
    return data