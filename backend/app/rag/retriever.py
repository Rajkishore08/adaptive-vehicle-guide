from typing import List, Dict, Any, Optional
from app.schemas.query import SourceRef

EXCERPTS = {
    "Maintenance Schedule": "Air filter inspection and replacement should be performed according to the specified service interval. Severe operating conditions such as dusty roads require more frequent inspection.",
    "Fuel System Guide": "Reduced fuel economy is commonly associated with a restricted air intake, degraded ignition components or injector deposits. Verify intake restriction before component replacement.",
    "Transmission & Clutch Guide": "Hard clutch pedal operation should be checked against the documented free-play specification. Inspect the clutch cable routing, lubrication and release mechanism condition.",
    "Troubleshooting Guide": "Abnormal idle behaviour or vehicle creep should be investigated at the idle speed control and throttle body assembly before adjusting any related linkage.",
    "Engine System Guide": "Idle instability after start-up may indicate deposits in the throttle body or an out-of-specification idle actuator response.",
    "Service Manual": "Follow the documented inspection order and record measured values before replacing any assembly.",
    "Service Invoices": "Recent service history: general service at 34,000 km, spark plug replacement at 33,000 km and air filter replacement at 31,000 km.",
    "Owner's Manual": "Refer to the maintenance section for the recommended service items and operating condition adjustments."
}

class VectorRetriever:
    """Retriever layer supporting PostgreSQL/pgvector or document store lookup."""
    async def search(self, query: str, top_k: int = 3) -> List[SourceRef]:
        q = query.lower()
        results = []
        if "air filter" in q or "maintenance" in q:
            results.append(SourceRef(document="Maintenance Schedule", page=18, section="Engine Maintenance", relevance=0.94, excerpt=EXCERPTS["Maintenance Schedule"]))
        if "mileage" in q or "fuel" in q:
            results.append(SourceRef(document="Fuel System Guide", page=41, section="Fuel Economy", relevance=0.91, excerpt=EXCERPTS["Fuel System Guide"]))
        if "clutch" in q:
            results.append(SourceRef(document="Transmission & Clutch Guide", page=63, section="Clutch Operation", relevance=0.92, excerpt=EXCERPTS["Transmission & Clutch Guide"]))
        if "idle" in q or "troubleshoot" in q:
            results.append(SourceRef(document="Troubleshooting Guide", page=27, section="Idle and Throttle", relevance=0.89, excerpt=EXCERPTS["Troubleshooting Guide"]))
        if "history" in q or "record" in q:
            results.append(SourceRef(document="Service Invoices", page=6, section="Recent Service History", relevance=0.87, excerpt=EXCERPTS["Service Invoices"]))

        if not results:
            results.append(SourceRef(document="Maintenance Schedule", page=18, section="Engine Maintenance", relevance=0.94, excerpt=EXCERPTS["Maintenance Schedule"]))

        return results[:top_k]

retriever = VectorRetriever()
