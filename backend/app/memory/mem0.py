import httpx
from typing import List, Dict, Any, Optional
from app.config import settings

class Mem0Service:
    """Async Mem0 platform client wrapper with failure tolerance."""
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or settings.MEM0_API_KEY
        self.base_url = "https://api.mem0.ai/v1"

    async def search_memory(self, query: str, user_id: str = "user-default") -> List[Dict[str, Any]]:
        if not self.api_key:
            return []
        headers = {"Authorization": f"Token {self.api_key}", "Content-Type": "application/json"}
        payload = {"query": query, "user_id": user_id}
        try:
            async with httpx.AsyncClient(timeout=1.5) as client:
                resp = await client.post(f"{self.base_url}/memories/search/", headers=headers, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    if isinstance(data, list):
                        return data
                    elif isinstance(data, dict):
                        return data.get("results", data.get("memories", []))
        except Exception as e:
            print(f"[Mem0Service] Search exception: {e}")
        return []

    async def add_memory(self, text: str, user_id: str = "user-default", metadata: Optional[Dict[str, Any]] = None) -> bool:
        if not self.api_key:
            return False
        headers = {"Authorization": f"Token {self.api_key}", "Content-Type": "application/json"}
        payload = {"messages": [{"role": "user", "content": text}], "user_id": user_id, "metadata": metadata or {}}
        try:
            async with httpx.AsyncClient(timeout=5.0) as client:
                resp = await client.post(f"{self.base_url}/memories/", headers=headers, json=payload)
                return resp.status_code in (200, 201)
        except Exception as e:
            print(f"[Mem0Service] Add memory exception: {e}")
            return False

mem0_service = Mem0Service()
