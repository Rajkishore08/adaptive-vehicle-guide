import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Trash2, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { PageHeader, SectionHeading } from "@/components/autorag/MetricCard";
import { AnswerCard } from "@/components/autorag/AnswerCard";
import { InvestigationTimeline } from "@/components/autorag/InvestigationTimeline";
import { ComplexityBadge, StrategyBadge } from "@/components/autorag/badges";
import { investigationStore, useInvestigations } from "@/lib/autorag/store";

export const Route = createFileRoute("/investigation")({
  head: () => ({
    meta: [
      { title: "Investigation Trace · AutoRAG" },
      { name: "description", content: "Inspect historical query execution traces, sub-question decomposition and retrieval steps." },
    ],
  }),
  component: InvestigationPage,
});

function InvestigationPage() {
  const investigations = useInvestigations();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedResult = investigations.find((i) => i.id === selectedId) ?? investigations[0] ?? null;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Investigation Trace & Diagnostics"
          subtitle="Detailed breakdown of multi-hop query decomposition, retrieval steps, and reasoning chains."
          action={
            investigations.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  investigationStore.clear();
                  setSelectedId(null);
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-surface-elevated hover:text-foreground"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Clear History
              </button>
            ) : undefined
          }
        />

        {investigations.length === 0 ? (
          <section className="panel p-8 text-center">
            <Search className="mx-auto size-10 text-muted-foreground/50" aria-hidden />
            <h3 className="mt-3 text-lg font-bold text-foreground">No Investigations Executed Yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Run a query in the Ask AutoRAG section to generate execution traces and retrieval logs.
            </p>
            <div className="mt-5">
              <Link
                to="/ask"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Go to Ask AutoRAG <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-3 lg:col-span-1">
              <SectionHeading title="Recent Executions" subtitle={`${investigations.length} query traces stored`} />
              {investigations.map((res) => {
                const active = res.id === selectedResult?.id;
                return (
                  <button
                    key={res.id}
                    type="button"
                    onClick={() => setSelectedId(res.id)}
                    className={`w-full rounded-md border p-3.5 text-left transition-all ${
                      active
                        ? "border-system/50 bg-system/10 shadow-sm"
                        : "border-border bg-surface hover:bg-surface-elevated"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <ComplexityBadge complexity={res.complexity} />
                      <span className="text-xs text-muted-foreground">
                        {(res.metrics.latency_ms / 1000).toFixed(2)}s
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs font-medium text-foreground">{res.query}</p>
                  </button>
                );
              })}
            </div>

            <div className="space-y-6 lg:col-span-2">
              {selectedResult && (
                <>
                  <section className="panel p-5">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                      <div>
                        <span className="text-xs text-muted-foreground">Query Execution Trace</span>
                        <h2 className="text-base font-bold text-foreground">{selectedResult.query}</h2>
                      </div>
                      <div className="flex gap-2">
                        <ComplexityBadge complexity={selectedResult.complexity} />
                        <StrategyBadge strategy={selectedResult.strategy} />
                      </div>
                    </div>

                    <SectionHeading title="Execution Timeline" subtitle="Internal pipeline steps executed for this query" />
                    <InvestigationTimeline steps={selectedResult.steps} />
                  </section>

                  {selectedResult.sub_questions && selectedResult.sub_questions.length > 0 && (
                    <section className="panel p-5">
                      <SectionHeading
                        title="Query Decomposition"
                        subtitle="Sub-questions generated by Agentic Multi-Hop RAG"
                      />
                      <ul className="space-y-2 text-xs">
                        {selectedResult.sub_questions.map((sub, i) => (
                          <li key={i} className="flex gap-2.5 rounded-md border border-border bg-surface p-2.5">
                            <span className="font-bold text-system">Q{i + 1}.</span>
                            <span className="text-foreground">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}

                  <AnswerCard result={selectedResult} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
