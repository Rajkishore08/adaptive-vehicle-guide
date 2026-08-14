from typing import List, Dict, Any, Optional
from app.llm.nvidia import nvidia_client

MEDIUM_MARKERS = ["schedule", "interval", "specification", "pressure", "when should", "how often"]
COMPLEX_MARKERS = ["my car", "my vehicle", "clutch", "mileage", "diagnose", "inspect first", "troubleshoot", "rough idle", "overheat"]

class ComplexityClassifier:
    """Adaptive-RAG LLM-based Complexity Classifier using NVIDIA NIM API."""
    async def classify(self, query: str, vehicle_context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        messages = [
            {
                "role": "system",
                "content": (
                    "You are the query complexity classifier for an Adaptive RAG vehicle service system.\n"
                    "Classify the user's query into exactly SIMPLE, MEDIUM, or COMPLEX.\n"
                    "- SIMPLE: Conceptual or general automotive knowledge (e.g. 'What is engine coolant?', 'What does a clutch do?').\n"
                    "- MEDIUM: Vehicle-specific specification, schedule, interval or single manual section lookup (e.g. 'What is the recommended service interval?', 'When should spark plugs be replaced?').\n"
                    "- COMPLEX: Vehicle troubleshooting, diagnostic symptoms, performance degradation, multi-symptom issues, or maintenance history cross-referencing (e.g. 'My mileage has dropped significantly. What should I inspect first?', 'My clutch feels hard', 'The engine idles roughly after starting', 'What service items may be overdue?').\n"
                    "Respond STRICTLY in JSON format with keys: 'complexity' (SIMPLE|MEDIUM|COMPLEX), 'confidence' (float 0.0-1.0), 'reason' (string), 'signals' (list of strings)."
                )
            },
            {"role": "user", "content": f"User Query: \"{query}\""}
        ]

        result = await nvidia_client.generate_json(messages)
        if result and "complexity" in result:
            complexity = str(result["complexity"]).upper()
            if complexity in ("SIMPLE", "MEDIUM", "COMPLEX"):
                strategy_map = {
                    "SIMPLE": "DIRECT_LLM",
                    "MEDIUM": "SINGLE_STEP_RAG",
                    "COMPLEX": "AGENTIC_MULTI_HOP_RAG"
                }
                return {
                    "complexity": complexity,
                    "confidence": float(result.get("confidence", 0.95)),
                    "strategy": strategy_map[complexity],
                    "reason": str(result.get("reason", "Analyzed query complexity.")),
                    "signals": result.get("signals", ["general_knowledge"])
                }

        # Rule-based fallback if LLM classification fails
        q = query.lower().strip()
        m_score = sum(1 for m in MEDIUM_MARKERS if m in q)
        c_score = sum(1 for m in COMPLEX_MARKERS if m in q)
        words = len(q.split())

        if c_score >= 2 or words > 22:
            return {
                "complexity": "COMPLEX",
                "confidence": 0.95,
                "strategy": "AGENTIC_MULTI_HOP_RAG",
                "reason": "Multiple symptoms require multi-hop evidence synthesis across documents.",
                "signals": ["multiple_symptoms", "multi_hop_requirement"]
            }
        elif m_score >= 1:
            return {
                "complexity": "MEDIUM",
                "confidence": 0.96,
                "strategy": "SINGLE_STEP_RAG",
                "reason": "Requires vehicle-specific maintenance schedule lookup.",
                "signals": ["vehicle_specific"]
            }

        return {
            "complexity": "SIMPLE",
            "confidence": 0.98,
            "strategy": "DIRECT_LLM",
            "reason": "General automotive knowledge is sufficient.",
            "signals": ["general_knowledge"]
        }

classifier = ComplexityClassifier()
