from pydantic import BaseModel, Field
from typing import List, Optional, Any, Literal

ComplexityType = Literal["SIMPLE", "MEDIUM", "COMPLEX"]
StrategyType = Literal["DIRECT_LLM", "SINGLE_STEP_RAG", "AGENTIC_MULTI_HOP_RAG"]

class ClassifyRequest(BaseModel):
    query: str = Field(..., max_length=2000)

class ClassifyResponse(BaseModel):
    complexity: ComplexityType
    confidence: float
    strategy: StrategyType
    reason: str
    signals: Optional[List[str]] = None

class SourceRef(BaseModel):
    document: str
    page: int
    section: str
    relevance: float
    excerpt: Optional[str] = None

class InvestigationStep(BaseModel):
    number: int
    title: str
    detail: str
    status: str = "completed"

class Recommendation(BaseModel):
    priority: int
    title: str
    reason: str

class QueryMetrics(BaseModel):
    latency_ms: int
    retrieval_count: int
    iterations: int

class QueryRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=2000)
    vehicle_id: Optional[str] = "veh-santro-2011"
    user_id: Optional[str] = "user-default"
    conversation_id: Optional[str] = None

class QueryResultResponse(BaseModel):
    id: str
    query: str
    complexity: ComplexityType
    confidence: float
    strategy: StrategyType
    reason: str
    answer: str
    recommendations: Optional[List[Recommendation]] = None
    sub_questions: Optional[List[str]] = None
    steps: List[InvestigationStep]
    sources: List[SourceRef]
    metrics: QueryMetrics
    safety_critical: bool
    created_at: int
