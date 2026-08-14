/**
 * Mock Adaptive RAG services.
 *
 * Every function here is deterministic and self-contained so it can later be
 * replaced by a REST call to the Python FastAPI backend:
 *
 *   classifierService.classify   -> POST /api/classify
 *   ragService.ask               -> POST /api/query
 *   agenticRagService.ask        -> POST /api/query
 *   vehicleService.*             -> GET/POST /api/vehicles
 *   knowledgeBaseService.*       -> GET/POST /api/documents
 *   evaluationService.*          -> GET/POST /api/evaluation
 */
import {
  COMPARISON,
  CONFUSION_MATRIX,
  DEMO_VEHICLE,
  DOCUMENTS,
  EVALUATION_ROWS,
  MAINTENANCE_HISTORY,
  SAFETY_KEYWORDS,
  STRATEGY_PERFORMANCE,
} from "./data";
import type {
  Complexity,
  InvestigationStep,
  KbDocument,
  QueryResult,
  ServiceRecord,
  SourceRef,
  Strategy,
  Vehicle,
} from "./types";

export const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const STRATEGY_BY_COMPLEXITY: Record<Complexity, Strategy> = {
  SIMPLE: "DIRECT_LLM",
  MEDIUM: "SINGLE_STEP_RAG",
  COMPLEX: "AGENTIC_MULTI_HOP_RAG",
};

const MEDIUM_MARKERS = [
  "manufacturer",
  "recommend",
  "schedule",
  "interval",
  "specification",
  "spec",
  "pressure",
  "when should",
  "how often",
  "capacity",
  "torque",
];

const COMPLEX_MARKERS = [
  "my car",
  "my vehicle",
  "my clutch",
  "my mileage",
  "why",
  "diagnose",
  "inspect first",
  "what should i check",
  "troubleshoot",
  "rough idle",
  "and",
  "history",
  "overheat",
  "problem",
  "issue",
  "symptom",
];

export interface Classification {
  complexity: Complexity;
  confidence: number;
  strategy: Strategy;
  reason: string;
}

function score(text: string, markers: string[]) {
  return markers.reduce((n, m) => (text.includes(m) ? n + 1 : n), 0);
}

export const classifierService = {
  /** POST /api/classify with local fallback */
  classify(query: string): Classification {
    const q = query.toLowerCase().trim();
    const mediumScore = score(q, MEDIUM_MARKERS);
    const complexScore = score(q, COMPLEX_MARKERS);
    const words = q.split(/\s+/).filter(Boolean).length;

    let complexity: Complexity = "SIMPLE";
    let confidence = 0.98;
    let reason =
      "General automotive knowledge is sufficient; vehicle-specific documentation is unnecessary.";

    if (complexScore >= 2 || words > 24) {
      complexity = "COMPLEX";
      confidence = 0.95;
      reason =
        "Multiple symptoms require evidence from different vehicle systems and maintenance history.";
    } else if (mediumScore >= 1) {
      complexity = "MEDIUM";
      confidence = 0.96;
      reason = "The answer depends on vehicle-specific maintenance documentation.";
    }

    return { complexity, confidence, strategy: STRATEGY_BY_COMPLEXITY[complexity], reason };
  },
  async classifyRemote(query: string): Promise<Classification> {
    try {
      const res = await fetch("http://localhost:8001/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using local classifier fallback", e);
    }
    return this.classify(query);
  },
};

/** POST /api/query — single entry point used by the UI with backend integration */
export async function runQuery(
  query: string,
  onStage?: (stageIndex: number) => void,
): Promise<QueryResult> {
  const classification = classifierService.classify(query);
  const stages = 5;

  for (let i = 0; i < stages; i++) {
    onStage?.(i);
    await delay(classification.complexity === "COMPLEX" ? 380 : 180);
  }

  try {
    const response = await fetch("http://localhost:8001/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (err) {
    console.warn("Backend API unavailable, falling back to local deterministic response", err);
  }

  const result =
    classification.complexity === "SIMPLE"
      ? ragService.direct(query, classification)
      : classification.complexity === "MEDIUM"
        ? ragService.singleStep(query, classification)
        : agenticRagService.ask(query, classification);

  return { ...result, created_at: Date.now() };
}

const EXCERPTS: Record<string, string> = {
  "Maintenance Schedule":
    "CHAPTER 3: PERIODIC SERVICE SCHEDULE (Pages 1-10)\n\n• Air Filter Maintenance (p. 18): Inspect every 5,000 km, replace every 10,000 km. Severe operating conditions such as unpaved or dusty roads mandate replacement every 5,000 km.\n• Engine Oil & Filter (p. 12): Change API SN 20W-50 oil every 10,000 km or 12 months.\n• Spark Plugs (p. 22): Inspect gap (0.8-0.9mm) every 10,000 km, replace nickel spark plugs every 20,000 km.\n• Clutch Free-Play (p. 34): Inspect pedal free-play (10-15 mm) every 10,000 km.",
  "Fuel System Guide":
    "TECHNICAL MANUAL SECTION 5: FUEL INJECTION & AIR INTAKE (Pages 35-45)\n\n• Fuel Economy Degradation (p. 41): Reduced fuel efficiency is directly linked to restricted intake air flow, fouled fuel injectors, or oxygen sensor drift.\n• Intake Pressure Specs (p. 38): Manifold Absolute Pressure (MAP) baseline 28-34 kPa at idle.\n• Injector Pulse Width (p. 42): Standard idle pulse width 2.1ms to 2.5ms under full engine operating temperature.",
  "Transmission & Clutch Guide":
    "MANUAL SECTION 4: CLUTCH ASSEMBLY & ACTUATION MECHANISM (Pages 55-68)\n\n• Hard Clutch Operation (p. 63): Stiffness in pedal stroke indicates dry clutch release fork pivot, worn cable sleeve, or binding diaphragm spring fingers.\n• Free-Play Adjustment (p. 65): Target pedal free play 12mm ± 3mm. Adjust cable nut lock ring at transmission housing bracket.\n• Release Bearing Noise (p. 67): Grinding noise when depressing pedal indicates throw-out bearing wear.",
  "Troubleshooting Guide":
    "DIAGNOSTIC MATRIX & SYMPTOM TREES (Pages 20-35)\n\n• Abnormal Idle & Vehicle Creep (p. 27): Rough idle or unwanted engine surging is caused by Idle Air Control (IAC) valve carbon deposits or throttle body vacuum leaks.\n• Multi-Symptom Diagnostic Order (p. 30): 1. Air Intake & MAP Sensor -> 2. Clutch Actuation & Free-Play -> 3. Throttle Body & Idle Control Valve.",
  "Engine System Guide":
    "SERVICE MANUAL SECTION 2: ENGINE MECHANICAL & LUBRICATION (Pages 80-94)\n\n• Cylinder Head & Valve Train (p. 84): Hydraulic lash adjusters baseline clearance 0.20mm intake, 0.25mm exhaust (cold).\n• Idle Instability (p. 91): Check PCV valve operation and intake manifold gasket sealing under high vacuum conditions.",
  "Service Manual":
    "HYUNDAI SANTRO XING SHOP REPAIR MANUAL (Pages 1-328)\n\n• Workshop Procedure (p. 102): Always record baseline sensor readings prior to component disassembly.\n• Fastener Torque Specs (p. 210): Cylinder head bolts 65 Nm, Clutch pressure plate bolts 22 Nm, Oil pan bolts 10 Nm.",
  "Service Invoices":
    "VEHICLE LOG BOOK & HISTORICAL INVOICES (Pages 1-20)\n\n• Record 34,000 km (July 2026): General vehicle inspection, oil & filter change.\n• Record 33,000 km (Feb 2026): Spark plug replacement (NGK BKR5ES-11).\n• Record 31,000 km (Sept 2025): Air filter element replacement.\n• Record 28,500 km (March 2025): Engine oil flush and brake pad inspection.",
  "Owner's Manual":
    "HYUNDAI SANTRO XING OWNER OPERATING MANUAL (Pages 1-142)\n\n• Vehicle Specifications (p. 14): Engine 1.1L Epsilon i4 SOHC 12V, Fuel tank capacity 35L.\n• Maintenance Recommendations (p. 88): Check coolant and brake fluid levels weekly before driving.",
};

export function excerptFor(document: string) {
  return EXCERPTS[document] ?? "Refer to the referenced section of the vehicle documentation.";
}

function isSafetyCritical(query: string) {
  const q = query.toLowerCase();
  return SAFETY_KEYWORDS.some((k) => q.includes(k));
}

function baseResult(query: string, c: Classification): QueryResult {
  return {
    id: `q-${query.length}-${c.complexity.toLowerCase()}`,
    query,
    complexity: c.complexity,
    confidence: c.confidence,
    strategy: c.strategy,
    reason: c.reason,
    answer: "",
    steps: [],
    sources: [],
    metrics: { latency_ms: 0, retrieval_count: 0, iterations: 0 },
    safety_critical: isSafetyCritical(query),
    created_at: 0,
  };
}

const step = (number: number, title: string, detail: string): InvestigationStep => ({
  number,
  title,
  detail,
  status: "completed",
});

export const ragService = {
  /** Future: POST /api/query (SIMPLE + MEDIUM routes) */
  direct(query: string, c: Classification): QueryResult {
    return {
      ...baseResult(query, c),
      answer:
        "An engine air filter removes dust and debris from the air entering the engine so the engine receives cleaner air for combustion. Based on general automotive knowledge, no vehicle-specific documentation was required to answer this question.",
      steps: [
        step(1, "Query Complexity Classification", "Classified as SIMPLE with 98% confidence."),
        step(2, "Strategy Selection", "Routed to Direct LLM — retrieval skipped."),
        step(3, "Answer Generation", "Answer generated from general automotive knowledge."),
      ],
      metrics: { latency_ms: 620, retrieval_count: 0, iterations: 0 },
    };
  },

  singleStep(query: string, c: Classification): QueryResult {
    const sources: SourceRef[] = [
      {
        document: "Maintenance Schedule",
        page: 18,
        section: "Engine Maintenance",
        relevance: 0.94,
        excerpt: excerptFor("Maintenance Schedule"),
      },
    ];
    return {
      ...baseResult(query, c),
      answer:
        "According to the vehicle maintenance documentation for the Hyundai Santro Xing 1.1L, the air filter should be inspected and replaced according to the specified service interval, with more frequent inspection under dusty operating conditions.",
      sources,
      retrieval_steps: [
        { step: 1, query: "maintenance schedule service interval", documents: ["Maintenance Schedule"] },
      ],
      steps: [
        step(1, "Query Complexity Classification", "Classified as MEDIUM with 96% confidence."),
        step(2, "Strategy Selection", "Routed to Single-Step RAG — one retrieval scheduled."),
        step(3, "Documentation Retrieval", "Retrieved evidence from Maintenance Schedule (p. 18)."),
        step(4, "Answer Generation", "Answer grounded in the retrieved documentation section."),
      ],
      metrics: { latency_ms: 1310, retrieval_count: 1, iterations: 0 },
    };
  },
};

export const agenticRagService = {
  /** Future: POST /api/query (COMPLEX route) */
  ask(query: string, c: Classification): QueryResult {
    const sources: SourceRef[] = [
      { document: "Maintenance Schedule", page: 18, section: "Engine Maintenance", relevance: 0.94 },
      { document: "Fuel System Guide", page: 41, section: "Fuel Economy", relevance: 0.91 },
      { document: "Transmission & Clutch Guide", page: 63, section: "Clutch Operation", relevance: 0.92 },
      { document: "Troubleshooting Guide", page: 27, section: "Idle and Throttle", relevance: 0.89 },
      { document: "Service Invoices", page: 6, section: "Recent Service History", relevance: 0.87 },
    ].map((s) => ({ ...s, excerpt: excerptFor(s.document) }));

    return {
      ...baseResult(query, c),
      answer:
        "The reported symptoms should be investigated as separate but potentially related systems rather than assuming a single definitive fault. Documentation for the fuel/intake system, the clutch assembly and the idle/throttle system each describe independent causes that match part of the description, so a staged inspection order is recommended.",
      sub_questions: [
        "What documented issues can contribute to poor fuel mileage?",
        "What documented causes can result in hard clutch operation?",
        "What can cause abnormal vehicle movement or idle/throttle behavior?",
      ],
      retrieval_steps: [
        { step: 1, query: "poor fuel mileage causes", documents: ["Maintenance Schedule", "Fuel System Guide"] },
        { step: 2, query: "hard clutch operation causes", documents: ["Transmission & Clutch Guide", "Service Manual"] },
        { step: 3, query: "abnormal idle and throttle behavior", documents: ["Troubleshooting Guide", "Engine System Guide"] },
      ],
      recommendations: [
        {
          priority: 1,
          title: "Inspect air/fuel maintenance items",
          reason: "Poor mileage can be associated with maintenance-related fuel and intake issues.",
        },
        {
          priority: 2,
          title: "Inspect idle and throttle system",
          reason:
            "Unexpected vehicle movement or abnormal idle behavior warrants inspection of the relevant idle/throttle components.",
        },
        {
          priority: 3,
          title: "Inspect clutch adjustment and cable/assembly condition",
          reason: "Hard clutch operation should be checked against the documented clutch inspection procedure.",
        },
        {
          priority: 4,
          title: "Review recent maintenance history",
          reason: "Recent service records may indicate which components were inspected or replaced.",
        },
      ],
      sources,
      steps: [
        step(1, "Query Complexity Classification", "Classified as COMPLEX with 95% confidence."),
        step(2, "Query Decomposition", "Generated 3 focused sub-questions."),
        step(3, "Fuel-System Retrieval", "Retrieved evidence from Maintenance Schedule and Fuel System Guide."),
        step(4, "Clutch-System Retrieval", "Retrieved evidence from Transmission & Clutch Guide and Service Manual."),
        step(5, "Idle/Throttle Retrieval", "Retrieved evidence from Troubleshooting Guide and Engine System Guide."),
        step(6, "Maintenance History Check", "Cross-referenced recent service records."),
        step(7, "Evidence Synthesis", "Combined evidence across multiple documents."),
      ],
      metrics: { latency_ms: 2840, retrieval_count: 3, iterations: 2 },
    };
  },
};

export const vehicleService = {
  /** GET /api/vehicles */
  getVehicle(): Vehicle {
    return DEMO_VEHICLE;
  },
  getHistory(): ServiceRecord[] {
    return MAINTENANCE_HISTORY;
  },
};

export const knowledgeBaseService = {
  /** GET /api/documents */
  listDocuments(): KbDocument[] {
    return DOCUMENTS;
  },
  stats() {
    return {
      documents: DOCUMENTS.length,
      chunks: DOCUMENTS.reduce((n, d) => n + d.chunks, 0),
      indexed: "100%",
      lastUpdated: "Today",
    };
  },
};

export const evaluationService = {
  /** GET /api/evaluation/results with local fallback */
  summary() {
    return {
      routingAccuracy: 94.7,
      answerAccuracy: 91.8,
      averageLatency: 1.63,
      queriesEvaluated: 21,
    };
  },
  async fetchLiveEvaluation() {
    try {
      const res = await fetch("http://localhost:8001/api/evaluation/results");
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend evaluation API unavailable, using benchmark dataset", e);
    }
    return {
      summary: this.summary(),
      rows: EVALUATION_ROWS
    };
  },
  strategyPerformance: () => STRATEGY_PERFORMANCE,
  confusionMatrix: () => CONFUSION_MATRIX,
  rows: () => EVALUATION_ROWS,
  comparison: () => COMPARISON,
};

export const DEMO_QUERIES = {
  simple: [
    "What does an engine air filter do?",
    "What is engine coolant?",
    "What is a spark plug?",
    "What does a clutch do?",
    "What is an alternator?",
    "What is engine oil?",
    "What does a battery do?"
  ],
  medium: [
    "When should the air filter be replaced according to the manufacturer's maintenance schedule?",
    "What engine oil does the manufacturer recommend?",
    "What is the recommended tyre pressure?",
    "When should spark plugs be replaced?",
    "What coolant specification is recommended?",
    "What is the recommended service interval?",
    "What is the recommended clutch inspection interval?"
  ],
  complex: [
    "My car has poor mileage, hard clutch operation and sometimes moves forward without pressing the accelerator. Based on my maintenance history and the manufacturer's troubleshooting documentation, what should I inspect first?",
    "My mileage has dropped significantly. What should I inspect first?",
    "My clutch feels hard. Based on the service documentation, what are the possible causes?",
    "The engine idles roughly after starting. What systems should I investigate?",
    "My vehicle overheats only when the AC is running. What could cause this?",
    "My car has poor mileage and rough idle. Which maintenance items should I check together?",
    "Based on my recent maintenance history and the manufacturer's maintenance schedule, what service items may be overdue?"
  ]
} as const;
