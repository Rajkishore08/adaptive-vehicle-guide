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
            <button
              type="button"
              onClick={() => handleSearch(DEMO_QUERIES.simple)}
              className="group relative rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-left transition-all duration-300 hover:border-emerald-500/80 hover:bg-emerald-950/40 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Zap className="size-3.5" /> Simple Query
                </span>
                <Play className="size-3.5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-2 text-xs font-medium text-foreground line-clamp-2 leading-relaxed">{DEMO_QUERIES.simple}</p>
              <span className="mt-2 inline-block text-[11px] font-mono text-muted-foreground">Route: Direct LLM (0 retrievals)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSearch(DEMO_QUERIES.medium)}
              className="group relative rounded-xl border border-amber-500/40 bg-amber-950/20 p-4 text-left transition-all duration-300 hover:border-amber-500/80 hover:bg-amber-950/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Search className="size-3.5" /> Medium Query
                </span>
                <Play className="size-3.5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-2 text-xs font-medium text-foreground line-clamp-2 leading-relaxed">{DEMO_QUERIES.medium}</p>
              <span className="mt-2 inline-block text-[11px] font-mono text-muted-foreground">Route: Single-Step RAG (1 pass)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSearch(DEMO_QUERIES.complex)}
              className="group relative rounded-xl border border-rose-500/50 bg-rose-950/30 p-4 text-left transition-all duration-300 hover:border-rose-500 hover:bg-rose-950/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.25)] scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-bold text-rose-300 uppercase tracking-wider">
                  <Network className="size-3.5" /> Complex Diagnostic (Featured)
                </span>
                <Play className="size-3.5 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="mt-2 text-xs font-semibold text-foreground line-clamp-2 leading-relaxed">{DEMO_QUERIES.complex}</p>
              <span className="mt-2 inline-block text-[11px] font-mono text-rose-300">Route: Agentic Multi-Hop RAG</span>
            </button>
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
            <SectionHeading title="Executing Adaptive Pipeline" subtitle="Staged execution of adaptive retrieval and reasoning steps..." />
            <InvestigationTimeline
              steps={[
                { number: 1, title: "Query Complexity Classification", detail: "Evaluating intent & symptom count with NVIDIA Llama 3.1", status: "completed" },
                { number: 2, title: "Strategy Selection", detail: "Routing query execution path dynamically", status: "completed" },
                { number: 3, title: "Vector Search & Document Retrieval", detail: "Fetching dense evidence chunks from technical manuals", status: "completed" },
                { number: 4, title: "Cross-System Evidence Synthesis", detail: "Matching specs against logged service history records", status: "completed" },
                { number: 5, title: "Final Report Generation", detail: "Generating grounded diagnostic report", status: "completed" },
              ]}
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
