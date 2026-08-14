import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles, Zap, Search, Network, Play } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { PageHeader, SectionHeading } from "@/components/autorag/MetricCard";
import { AdaptivePipeline } from "@/components/autorag/AdaptivePipeline";
import { AnswerCard } from "@/components/autorag/AnswerCard";
import { InvestigationTimeline } from "@/components/autorag/InvestigationTimeline";
import { classifierService, DEMO_QUERIES, runQuery } from "@/lib/autorag/services";
import { investigationStore } from "@/lib/autorag/store";
import type { QueryResult } from "@/lib/autorag/types";

export const Route = createFileRoute("/ask")({
  head: () => ({
    meta: [
      { title: "Ask AutoRAG · Adaptive Vehicle Intelligence" },
      { name: "description", content: "Interactive query engine with adaptive complexity classification and evidence grounding." },
    ],
  }),
  component: AskPage,
});

function AskPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);
  const [currentResult, setCurrentResult] = useState<QueryResult | null>(null);

  const previewClassification = query.trim() ? classifierService.classify(query) : null;

  async function handleSearch(qToRun?: string) {
    const targetQuery = (qToRun ?? query).trim();
    if (!targetQuery) return;

    setQuery(targetQuery);
    setLoading(true);
    setStageIndex(0);
    setCurrentResult(null);

    try {
      const res = await runQuery(targetQuery, (s) => setStageIndex(s));
      setCurrentResult(res);
      investigationStore.add(res);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Ask AutoRAG Query Engine"
          subtitle="Submit vehicle questions or test pre-configured prompts to observe real-time complexity classification and evidence routing."
        />

        {/* Preset Demo Queries Section */}
        <section className="panel p-6 border-system/30 bg-surface/90 shadow-lg">
          <SectionHeading
            title="Preset Demo Scenarios"
            subtitle="Select a demo scenario below to trigger real-time adaptive routing"
          />
          <div className="grid gap-4 sm:grid-cols-3 mt-3">
            {/* Simple Queries */}
            <div className="space-y-2 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Zap className="size-3.5" /> Simple Queries ({DEMO_QUERIES.simple.length})
                </span>
              </div>
              <select
                onChange={(e) => e.target.value && handleSearch(e.target.value)}
                className="w-full rounded-md border border-emerald-500/40 bg-background/90 px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-400"
                defaultValue=""
              >
                <option value="" disabled>Select Simple Question...</option>
                {DEMO_QUERIES.simple.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              <span className="inline-block text-[11px] font-mono text-emerald-300">Route: Direct LLM (0 retrievals)</span>
            </div>

            {/* Medium Queries */}
            <div className="space-y-2 rounded-xl border border-amber-500/40 bg-amber-950/20 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Search className="size-3.5" /> Medium Queries ({DEMO_QUERIES.medium.length})
                </span>
              </div>
              <select
                onChange={(e) => e.target.value && handleSearch(e.target.value)}
                className="w-full rounded-md border border-amber-500/40 bg-background/90 px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-amber-400"
                defaultValue=""
              >
                <option value="" disabled>Select Medium Question...</option>
                {DEMO_QUERIES.medium.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              <span className="inline-block text-[11px] font-mono text-amber-300">Route: Single-Step RAG (1 pass)</span>
            </div>

            {/* Complex Queries */}
            <div className="space-y-2 rounded-xl border border-rose-500/50 bg-rose-950/30 p-4">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-300 uppercase tracking-wider">
                  <Network className="size-3.5" /> Complex Diagnostic ({DEMO_QUERIES.complex.length})
                </span>
              </div>
              <select
                onChange={(e) => e.target.value && handleSearch(e.target.value)}
                className="w-full rounded-md border border-rose-500/50 bg-background/90 px-3 py-2 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-rose-400"
                defaultValue=""
              >
                <option value="" disabled>Select Complex Question...</option>
                {DEMO_QUERIES.complex.map((q) => (
                  <option key={q} value={q}>{q}</option>
                ))}
              </select>
              <span className="inline-block text-[11px] font-mono text-rose-300">Route: Agentic Multi-Hop RAG</span>
            </div>
          </div>
        </section>

        {/* Input Bar */}
        <section className="panel p-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="space-y-3"
          >
            <label htmlFor="vehicle-query-input" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Custom Vehicle Query Input
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="vehicle-query-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about vehicle maintenance, troubleshooting, specifications or symptoms..."
                className="flex-1 rounded-lg border border-border/80 bg-background/90 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-system focus:outline-none focus:ring-1 focus:ring-system shadow-inner"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 disabled:opacity-50"
              >
                <Send className="size-4" aria-hidden />
                {loading ? "Routing..." : "Execute Query"}
              </button>
            </div>
          </form>

          {previewClassification && !currentResult && !loading && (
            <div className="mt-4 rounded-lg border border-system/40 bg-system/10 p-3.5 text-xs backdrop-blur animate-in fade-in duration-300">
              <span className="font-bold text-system">Live Intent Classification Preview:</span>{" "}
              Classified as <strong className="text-foreground">{previewClassification.complexity}</strong> ({previewClassification.strategy}). {previewClassification.reason}
            </div>
          )}
        </section>

        <AdaptivePipeline active={currentResult?.complexity ?? previewClassification?.complexity ?? null} />

        {loading && (
          <section className="panel p-6 space-y-4 border-system/40 bg-surface/90 shadow-xl">
            <SectionHeading
              title={`Executing ${previewClassification?.complexity ?? "Adaptive"} Pipeline`}
              subtitle={`Live dynamic flow for ${previewClassification?.complexity ?? "evaluated"} query intent...`}
            />
            <InvestigationTimeline
              steps={
                (previewClassification?.complexity ?? "COMPLEX") === "SIMPLE"
                  ? [
                      { number: 1, title: "Query Complexity Classification", detail: "Evaluated as SIMPLE (general automotive knowledge)", status: "completed" },
                      { number: 2, title: "Strategy Selection", detail: "Routed to Direct LLM — Vector Search Bypassed (0ms overhead)", status: "completed" },
                      { number: 3, title: "Direct Answer Generation", detail: "Generating direct response from LLM memory", status: "completed" },
                    ]
                  : (previewClassification?.complexity ?? "COMPLEX") === "MEDIUM"
                    ? [
                        { number: 1, title: "Query Complexity Classification", detail: "Evaluated as MEDIUM (requires vehicle manual lookup)", status: "completed" },
                        { number: 2, title: "Strategy Selection", detail: "Routed to Single-Step RAG (1 targeted pass scheduled)", status: "completed" },
                        { number: 3, title: "Single-Pass Document Retrieval", detail: "Fetching vector chunk from Maintenance Schedule", status: "completed" },
                        { number: 4, title: "Grounded Answer Generation", detail: "Synthesizing answer grounded in retrieved document section", status: "completed" },
                      ]
                    : [
                        { number: 1, title: "Query Complexity Classification", detail: "Evaluated as COMPLEX (multi-symptom / multi-system diagnosis)", status: "completed" },
                        { number: 2, title: "Query Sub-Question Decomposition", detail: "Decomposing symptom query into focused sub-questions", status: "completed" },
                        { number: 3, title: "Multi-Pass Vector Retrieval", detail: "Searching evidence across multiple technical manuals & guides", status: "completed" },
                        { number: 4, title: "Cross-System Maintenance Synthesis", detail: "Cross-referencing symptoms against vehicle service history", status: "completed" },
                        { number: 5, title: "Staged Diagnostic Report Generation", detail: "Synthesizing prioritized inspection order and diagnostic report", status: "completed" },
                      ]
              }
              currentStage={stageIndex}
              isExecuting
            />
          </section>
        )}

        {currentResult && !loading && <AnswerCard result={currentResult} />}
      </div>
    </AppShell>
  );
}
