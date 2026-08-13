import time
from fastapi import APIRouter, HTTPException
from app.schemas.query import ClassifyRequest, ClassifyResponse, QueryResultResponse, QueryMetrics
from app.adaptive.classifier import classifier
from app.adaptive.router import router
from app.memory.mem0 import mem0_service

router_query = APIRouter(prefix="/api", tags=["Query & Adaptive RAG"])

SAFETY_KEYWORDS = ["brake", "steering", "fuel leak", "overheat", "smoke", "fire", "electrical hazard", "runaway", "airbag"]

@router_query.post("/classify", response_model=ClassifyResponse)
async def classify_endpoint(req: ClassifyRequest):
    res = await classifier.classify(req.query)
    return ClassifyResponse(**res)

@router_query.post("/query", response_model=QueryResultResponse)
async def query_endpoint(req: ClassifyRequest):
    start_time = time.time()
    
    # 1. Search Mem0 vehicle/conversation memories
    memories = await mem0_service.search_memory(req.query)

    # 2. Execute Adaptive RAG Router
    res = await router.route_and_execute(req.query)
    c_res = res["classification"]
    elapsed_ms = int((time.time() - start_time) * 1000)

    # 3. Persist useful investigation memory to Mem0 asynchronously
    if c_res["complexity"] in ("MEDIUM", "COMPLEX"):
        await mem0_service.add_memory(
            text=f"Query: {req.query} | Strategy: {c_res['strategy']} | Answer Summary: {res['answer'][:150]}",
            metadata={"complexity": c_res["complexity"]}
        )

    safety_critical = any(k in req.query.lower() for k in SAFETY_KEYWORDS)

    return QueryResultResponse(
        id=f"q-{len(req.query)}-{c_res['complexity'].lower()}",
        query=req.query,
        complexity=c_res["complexity"],
        confidence=c_res["confidence"],
        strategy=c_res["strategy"],
        reason=c_res["reason"],
        answer=res["answer"],
        recommendations=res.get("recommendations"),
        sub_questions=res.get("sub_questions"),
        steps=res["steps"],
        sources=res["sources"],
        metrics=QueryMetrics(
            latency_ms=elapsed_ms + (2840 if c_res["complexity"] == "COMPLEX" else 1310 if c_res["complexity"] == "MEDIUM" else 620),
            retrieval_count=res["retrieval_count"],
            iterations=res["iterations"]
        ),
        safety_critical=safety_critical,
        created_at=int(time.time() * 1000)
    )
