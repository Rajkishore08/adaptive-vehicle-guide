import os
try:
    from pydantic_settings import BaseSettings, SettingsConfigDict
except ImportError:
    try:
        from pydantic.v1 import BaseSettings  # type: ignore
        SettingsConfigDict = dict  # type: ignore
    except ImportError:
        from pydantic import BaseModel as BaseSettings  # type: ignore
        SettingsConfigDict = dict  # type: ignore

from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "AutoRAG Adaptive Vehicle Guide Backend"
    VERSION: str = "2.0.0"
    API_PREFIX: str = "/api"

    # API Keys & Secrets
    NVIDIA_API_KEY: str = ""
    NVIDIA_LLM_MODEL: str = "nvidia/llama-3.3-nemotron-super-49b-v1.5"
    GROQ_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    PINECONE_API_KEY: str = ""
    MEM0_API_KEY: str = ""

    # Database & Storage
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/autorag"
    EMBEDDING_PROVIDER: str = "openai-compatible"
    EMBEDDING_MODEL: str = "text-embedding-3-small"
    
    # CORS Configuration
    CORS_ORIGINS: str = "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
