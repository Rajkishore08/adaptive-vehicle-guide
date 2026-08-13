import type {
  EvaluationRow,
  KbDocument,
  ServiceRecord,
  StrategyPerformance,
  Vehicle,
} from "./types";

export const DEMO_VEHICLE: Vehicle = {
  id: "veh-santro-2011",
  manufacturer: "Hyundai",
  model: "Santro Xing",
  year: "2011",
  fuel: "Petrol",
  engine: "1.1L",
  odometer: "34,000 km",
};

export const MAINTENANCE_HISTORY: ServiceRecord[] = [
  { date: "2026-07", service: "General Service", mileage: "34,000 km" },
  { date: "2026-02", service: "Spark Plug Replacement", mileage: "33,000 km" },
  { date: "2025-09", service: "Air Filter Replacement", mileage: "31,000 km" },
  { date: "2025-03", service: "Engine Oil Service", mileage: "28,500 km" },
];

export const DOCUMENTS: KbDocument[] = [
  { id: "doc-1", name: "Owner's Manual", type: "PDF", pages: 142, chunks: 624, status: "Indexed" },
  {
    id: "doc-2",
    name: "Maintenance Schedule",
    type: "PDF",
    pages: 48,
    chunks: 213,
    status: "Indexed",
  },
  { id: "doc-3", name: "Service Manual", type: "PDF", pages: 328, chunks: 1104, status: "Indexed" },
  {
    id: "doc-4",
    name: "Troubleshooting Guide",
    type: "PDF",
    pages: 186,
    chunks: 687,
    status: "Indexed",
  },
  {
    id: "doc-5",
    name: "Engine System Guide",
    type: "PDF",
    pages: 94,
    chunks: 318,
    status: "Indexed",
  },
  {
    id: "doc-6",
    name: "Transmission & Clutch Guide",
    type: "PDF",
    pages: 112,
    chunks: 391,
    status: "Indexed",
  },
  {
    id: "doc-7",
    name: "Fuel System Guide",
    type: "PDF",
    pages: 88,
    chunks: 302,
    status: "Indexed",
  },
  {
    id: "doc-8",
    name: "Electrical System Guide",
    type: "PDF",
    pages: 76,
    chunks: 251,
    status: "Indexed",
  },
  {
    id: "doc-9",
    name: "Brake & Suspension Guide",
    type: "PDF",
    pages: 103,
    chunks: 277,
    status: "Indexed",
  },
  { id: "doc-10", name: "Service Invoices", type: "PDF", pages: 20, chunks: 218, status: "Indexed" },
];

export const STRATEGY_PERFORMANCE: StrategyPerformance[] = [
  { strategy: "Direct LLM", queries: 7, accuracy: 92.3, latency: 0.68, retrievals: 0 },
  { strategy: "Single-Step RAG", queries: 7, accuracy: 94.1, latency: 1.37, retrievals: 1 },
  { strategy: "Agentic Multi-Hop RAG", queries: 7, accuracy: 89.7, latency: 2.84, retrievals: 3.4 },
];

export const CONFUSION_MATRIX = {
  labels: ["SIMPLE", "MEDIUM", "COMPLEX"] as const,
  values: [
    [7, 0, 0],
    [1, 6, 0],
    [0, 1, 6],
  ],
};

export const HEADLINE_METRICS = [
  { label: "Queries Evaluated", value: "21", caption: "Demo evaluation set" },
  { label: "Routing Accuracy", value: "94.7%", caption: "Sample evaluation" },
  { label: "Answer Accuracy", value: "91.8%", caption: "Sample evaluation" },
  { label: "Average Latency", value: "1.63s", caption: "Across demo queries" },
];

export const COMPARISON = {
  always_rag: { latency: 2.14, description: "Every query performs retrieval regardless of complexity." },
  adaptive_rag: { latency: 1.63, description: "Retrieval depth is selected according to query complexity." },
};

const simpleQueries = [
  "What is engine coolant?",
  "What does an air filter do?",
  "What is a spark plug?",
  "What does a clutch do?",
  "What is an alternator?",
  "What is engine oil?",
  "What does a battery do?",
];

const mediumQueries = [
  "What engine oil does the manufacturer recommend?",
  "What is the recommended tyre pressure?",
  "When should the air filter be replaced?",
  "When should spark plugs be replaced?",
  "What coolant specification is recommended?",
  "What is the recommended service interval?",
  "What is the recommended clutch inspection interval?",
];

const complexQueries = [
  "My mileage has dropped significantly. What should I inspect first?",
  "My clutch feels hard. Based on the service documentation, what are the possible causes?",
  "The engine idles roughly after starting. What systems should I investigate?",
  "My vehicle overheats only when the AC is running. What could cause this?",
  "My car has poor mileage and rough idle. Which maintenance items should I check together?",
  "My vehicle has poor mileage, a hard clutch and abnormal idle. Which issues could be related and what should I inspect first?",
  "Based on my recent maintenance history and the manufacturer's maintenance schedule, what service items may be overdue?",
];

const strategyLabel = {
  SIMPLE: "Direct LLM",
  MEDIUM: "Single-Step RAG",
  COMPLEX: "Agentic Multi-Hop RAG",
} as const;

// Deterministic misroutes matching the confusion matrix:
// one MEDIUM predicted SIMPLE, one COMPLEX predicted MEDIUM.
const MISROUTED: Record<string, "SIMPLE" | "MEDIUM"> = {
  "When should the air filter be replaced?": "SIMPLE",
  "My mileage has dropped significantly. What should I inspect first?": "MEDIUM",
};

function buildRows(
  queries: string[],
  expected: "SIMPLE" | "MEDIUM" | "COMPLEX",
  baseLatency: number,
): EvaluationRow[] {
  return queries.map((query, i) => {
    const predicted = MISROUTED[query] ?? expected;
    return {
      id: `${expected.toLowerCase()}-${i + 1}`,
      query,
      expected,
      predicted,
      strategy: strategyLabel[predicted],
      latency: Number((baseLatency + i * 0.07).toFixed(2)),
      correct: predicted === expected,
    };
  });
}

export const EVALUATION_ROWS: EvaluationRow[] = [
  ...buildRows(simpleQueries, "SIMPLE", 0.58),
  ...buildRows(mediumQueries, "MEDIUM", 1.18),
  ...buildRows(complexQueries, "COMPLEX", 2.52),
];

export const COMPLEXITY_META = {
  SIMPLE: {
    label: "Simple",
    strategy: "Direct LLM",
    retrieval: "None",
    message: "No retrieval required.",
    description: "General knowledge is sufficient.",
    reasoning: "Direct response",
  },
  MEDIUM: {
    label: "Medium",
    strategy: "Single-Step RAG",
    retrieval: "1 retrieval",
    message: "Vehicle-specific evidence required.",
    description: "One relevant document retrieval is required.",
    reasoning: "Retrieve → Answer",
  },
  COMPLEX: {
    label: "Complex",
    strategy: "Agentic Multi-Hop RAG",
    retrieval: "Multiple retrievals",
    message: "Multiple evidence sources and iterative reasoning required.",
    description: "Multiple sources and iterative reasoning are required.",
    reasoning: "Decompose → Retrieve → Evaluate → Retrieve → Synthesize",
  },
} as const;

export const SAFETY_NOTICE =
  "AutoRAG provides documentation-grounded troubleshooting guidance and does not replace professional vehicle inspection.";

export const SAFETY_KEYWORDS = [
  "brake",
  "steering",
  "fuel leak",
  "overheat",
  "smoke",
  "fire",
  "electrical hazard",
  "runaway",
  "airbag",
];
