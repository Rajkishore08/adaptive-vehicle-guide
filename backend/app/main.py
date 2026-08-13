"""
AutoRAG FastAPI Application Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.api.routes_query import router_query
from app.api.routes_vehicles import router_vehicles
from app.api.routes_documents import router_docs
from app.api.routes_evaluation import router_eval

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Adaptive RAG backend using NVIDIA NIM, PostgreSQL vector retrieval, and Mem0 platform memory.",
    version=settings.VERSION
)

# Configure CORS
origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(router_query)
app.include_router(router_vehicles)
app.include_router(router_docs)
app.include_router(router_eval)

@app.get("/")
def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "llm_model": settings.NVIDIA_LLM_MODEL,
        "paper": "Adaptive-RAG (NAACL 2024)"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8001, reload=True)
