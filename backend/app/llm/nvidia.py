import os
import json
import httpx
from typing import List, Dict, Any, Optional
from app.config import settings

class NVIDIAProvider:
    """NVIDIA NIM API provider with OpenAI compatibility, structured outputs, and retries."""
    def __init__(self, api_key: Optional[str] = None, model_name: Optional[str] = None):
        self.api_key = api_key or settings.NVIDIA_API_KEY
        self.model_name = model_name or settings.NVIDIA_LLM_MODEL or "nvidia/llama-3.3-nemotron-super-49b-v1.5"
        self.base_url = "https://integrate.api.nvidia.com/v1"

    async def generate(self, messages: List[Dict[str, str]], temperature: float = 0.2, max_tokens: int = 1024) -> str:
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        payload = {
            "model": self.model_name,
            "messages": messages,
            "temperature": temperature,
            "max_tokens": max_tokens
        }

        async with httpx.AsyncClient(timeout=30.0) as client:
            try:
                resp = await client.post(f"{self.base_url}/chat/completions", headers=headers, json=payload)
                if resp.status_code == 200:
                    data = resp.json()
                    return data["choices"][0]["message"]["content"]
            except Exception as e:
                print(f"[NVIDIAProvider] Error during completion: {e}")

        # Fallback to Groq if NVIDIA fails
        if settings.GROQ_API_KEY:
            try:
                groq_headers = {
                    "Authorization": f"Bearer {settings.GROQ_API_KEY}",
                    "Content-Type": "application/json"
                }
                groq_payload = {
                    "model": "llama-3.3-70b-versatile",
                    "messages": messages,
                    "temperature": temperature,
                    "max_tokens": max_tokens
                }
                async with httpx.AsyncClient(timeout=15.0) as client:
                    resp = await client.post("https://api.groq.com/openai/v1/chat/completions", headers=groq_headers, json=groq_payload)
                    if resp.status_code == 200:
                        data = resp.json()
                        return data["choices"][0]["message"]["content"]
            except Exception as ge:
                print(f"[NVIDIAProvider] Groq fallback error: {ge}")

        return None

    async def generate_json(self, messages: List[Dict[str, str]]) -> Dict[str, Any]:
        text = await self.generate(messages, temperature=0.1)
        if not text:
            return {}
        try:
            cleaned = text.strip()
            if cleaned.startswith("```"):
                cleaned = cleaned.split("```")[1]
                if cleaned.startswith("json"):
                    cleaned = cleaned[4:]
            return json.loads(cleaned.strip())
        except Exception as e:
            print(f"[NVIDIAProvider] JSON parsing error: {e}")
            return {}

nvidia_client = NVIDIAProvider()
