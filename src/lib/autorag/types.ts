export type Complexity = "SIMPLE" | "MEDIUM" | "COMPLEX";
export type Strategy = "DIRECT_LLM" | "SINGLE_STEP_RAG" | "AGENTIC_MULTI_HOP_RAG";

export interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  year: string;
  fuel: string;
  engine: string;
  odometer: string;
}

export interface ServiceRecord {
  date: string;
  service: string;
  mileage: string;
}

export interface KbDocument {
  id: string;
  name: string;
  type: string;
  pages: number;
  chunks: number;
  status: "Indexed" | "Indexing";
  excerpt?: string;
}

export interface SourceRef {
  document: string;
  page: number;
  section: string;
  relevance: number;
  excerpt?: string;
}

export interface RetrievalStep {
  step: number;
  query: string;
  documents: string[];
}

export interface InvestigationStep {
  number: number;
  title: string;
  detail: string;
  status: "completed";
}

export interface Recommendation {
  priority: number;
  title: string;
  reason: string;
}

export interface QueryMetrics {
  latency_ms: number;
  retrieval_count: number;
  iterations: number;
}

export interface QueryResult {
  id: string;
  query: string;
  complexity: Complexity;
  confidence: number;
  strategy: Strategy;
  reason: string;
  answer: string;
  recommendations?: Recommendation[];
  sub_questions?: string[];
  retrieval_steps?: RetrievalStep[];
  steps: InvestigationStep[];
  sources: SourceRef[];
  metrics: QueryMetrics;
  safety_critical: boolean;
  created_at: number;
}

export interface StrategyPerformance {
  strategy: string;
  queries: number;
  accuracy: number;
  latency: number;
  retrievals: number;
}

export interface EvaluationRow {
  id: string;
  query: string;
  expected: Complexity;
  predicted: Complexity;
  strategy: string;
  latency: number;
  correct: boolean;
}
