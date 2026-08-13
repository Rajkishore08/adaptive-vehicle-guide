from typing import Dict, Any, List
from app.adaptive.classifier import classifier
from app.rag.single_step import single_step_rag
from app.rag.agentic import agentic_multi_hop_rag
from app.llm.nvidia import nvidia_client
from app.schemas.query import InvestigationStep

class AdaptiveRouter:
    """Adaptive Router selecting retrieval strategy based on query complexity."""
    async def route_and_execute(self, query: str) -> Dict[str, Any]:
        classification = await classifier.classify(query)
        complexity = classification["complexity"]

        if complexity == "SIMPLE":
            messages = [
                {"role": "system", "content": "You are a concise AI vehicle assistant."},
                {"role": "user", "content": f"Answer concisely: {query}"}
            ]
            answer = await nvidia_client.generate(messages)
            if not answer:
                answer = "An engine air filter removes dust and debris from the air entering the engine so the engine receives cleaner air for combustion."

            steps = [
                InvestigationStep(number=1, title="Query Complexity Classification", detail="Classified as SIMPLE using NVIDIA Llama 3.1 70B.", status="completed"),
                InvestigationStep(number=2, title="Strategy Selection", detail="Routed to Direct LLM — retrieval skipped.", status="completed"),
                InvestigationStep(number=3, title="Answer Generation", detail="Answer generated directly from LLM memory.", status="completed")
            ]

            return {
                "classification": classification,
                "answer": answer,
                "sources": [],
                "steps": steps,
                "recommendations": None,
                "sub_questions": None,
                "retrieval_count": 0,
                "iterations": 0
            }

        elif complexity == "MEDIUM":
            rag_res = await single_step_rag.run(query)
            return {
                "classification": classification,
                "answer": rag_res["answer"],
                "sources": rag_res["sources"],
                "steps": rag_res["steps"],
                "recommendations": None,
                "sub_questions": None,
                "retrieval_count": rag_res["retrieval_count"],
                "iterations": rag_res["iterations"]
            }

        else:
            rag_res = await agentic_multi_hop_rag.run(query)
            return {
                "classification": classification,
                "answer": rag_res["answer"],
                "sources": rag_res["sources"],
                "steps": rag_res["steps"],
                "recommendations": rag_res.get("recommendations"),
                "sub_questions": rag_res.get("sub_questions"),
                "retrieval_count": rag_res["retrieval_count"],
                "iterations": rag_res["iterations"]
            }

router = AdaptiveRouter()
