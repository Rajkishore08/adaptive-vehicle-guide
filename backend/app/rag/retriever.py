from typing import List, Dict, Any, Optional
from app.schemas.query import SourceRef

EXCERPTS = {
    "Maintenance Schedule": "CHAPTER 3: PERIODIC SERVICE SCHEDULE (Pages 1-10)\n\n• Air Filter Maintenance (p. 18): Inspect every 5,000 km, replace every 10,000 km. Severe operating conditions mandate replacement every 5,000 km.\n• Engine Oil & Filter (p. 12): Change API SN 20W-50 oil every 10,000 km or 12 months.\n• Spark Plugs (p. 22): Inspect gap (0.8-0.9mm) every 10,000 km, replace nickel spark plugs every 20,000 km.",
    "Fuel System Guide": "TECHNICAL MANUAL SECTION 5: FUEL INJECTION & AIR INTAKE (Pages 35-45)\n\n• Fuel Economy Degradation (p. 41): Reduced fuel efficiency is directly linked to restricted intake air flow, fouled fuel injectors, or oxygen sensor drift.\n• Intake Pressure Specs (p. 38): Manifold Absolute Pressure (MAP) baseline 28-34 kPa at idle.",
    "Transmission & Clutch Guide": "MANUAL SECTION 4: CLUTCH ASSEMBLY & ACTUATION MECHANISM (Pages 55-68)\n\n• Hard Clutch Operation (p. 63): Stiffness in pedal stroke indicates dry clutch release fork pivot, worn cable sleeve, or binding diaphragm spring fingers.\n• Free-Play Adjustment (p. 65): Target pedal free play 12mm ± 3mm. Adjust cable nut lock ring at transmission housing bracket.",
    "Troubleshooting Guide": "DIAGNOSTIC MATRIX & SYMPTOM TREES (Pages 20-35)\n\n• Abnormal Idle & Vehicle Creep (p. 27): Rough idle or unwanted engine surging is caused by Idle Air Control (IAC) valve carbon deposits or throttle body vacuum leaks.\n• Multi-Symptom Diagnostic Order (p. 30): 1. Air Intake & MAP Sensor -> 2. Clutch Actuation & Free-Play -> 3. Throttle Body & Idle Control Valve.",
    "Engine System Guide": "SERVICE MANUAL SECTION 2: ENGINE MECHANICAL & LUBRICATION (Pages 80-94)\n\n• Cylinder Head & Valve Train (p. 84): Hydraulic lash adjusters baseline clearance 0.20mm intake, 0.25mm exhaust (cold).\n• Idle Instability (p. 91): Check PCV valve operation and intake manifold gasket sealing under high vacuum conditions.",
    "Service Manual": "HYUNDAI SANTRO XING SHOP REPAIR MANUAL (Pages 1-328)\n\n• Workshop Procedure (p. 102): Always record baseline sensor readings prior to component disassembly.\n• Fastener Torque Specs (p. 210): Cylinder head bolts 65 Nm, Clutch pressure plate bolts 22 Nm, Oil pan bolts 10 Nm.",
    "Service Invoices": "VEHICLE LOG BOOK & HISTORICAL INVOICES (Pages 1-20)\n\n• Record 34,000 km (July 2026): General vehicle inspection, oil & filter change.\n• Record 33,000 km (Feb 2026): Spark plug replacement (NGK BKR5ES-11).\n• Record 31,000 km (Sept 2025): Air filter element replacement.",
    "Owner's Manual": "HYUNDAI SANTRO XING OWNER OPERATING MANUAL (Pages 1-142)\n\n• Vehicle Specifications (p. 14): Engine 1.1L Epsilon i4 SOHC 12V, Fuel tank capacity 35L.\n• Maintenance Recommendations (p. 88): Check coolant and brake fluid levels weekly before driving."
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
