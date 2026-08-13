import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, XCircle, Gauge, ArrowRight, Clock, Zap, Shield, HelpCircle } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { MetricCard, PageHeader, SectionHeading } from "@/components/autorag/MetricCard";
import { ComplexityBadge } from "@/components/autorag/badges";
import { evaluationService } from "@/lib/autorag/services";

export const Route = createFileRoute("/evaluation")({
  head: () => ({
    meta: [
      { title: "Evaluation & Benchmarks · AutoRAG" },
      { name: "description", content: "Benchmark performance, routing confusion matrix, and latency comparison for Adaptive RAG." },
    ],
  }),
  component: EvaluationPage,
});

function EvaluationPage() {
  const summary = evaluationService.summary();
  const perf = evaluationService.strategyPerformance();
  const matrix = evaluationService.confusionMatrix();
  const rows = evaluationService.rows();
  const comp = evaluationService.comparison();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Evaluation & Routing Benchmarks"
          subtitle="Empirical benchmark performance across 21 evaluation queries comparing Adaptive RAG against static single-step retrieval."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Routing Classification Accuracy" value={`${summary.routingAccuracy}%`} caption="Classifier Precision Score" />
          <MetricCard label="Answer Accuracy" value={`${summary.answerAccuracy}%`} caption="Grounded Response Score" />
          <MetricCard label="Average Pipeline Latency" value={`${summary.averageLatency}s`} caption="Across 21 Benchmark Queries" />
          <MetricCard label="Test Benchmark Set" value={`${summary.queriesEvaluated}`} caption="Evaluation Queries Run" />
        </div>

        {/* High-Impact Comparison Banner */}
        <section className="panel grid-backdrop relative overflow-hidden p-6 border-system/30 bg-surface/90 shadow-xl">
          <SectionHeading
            title="Always-RAG vs. Adaptive-RAG Efficiency Comparison"
            subtitle="Demonstrates computational efficiency gains achieved by routing queries based on complexity."
          />

          <div className="grid gap-6 md:grid-cols-2 mt-4">
            <div className="rounded-xl border border-border/80 bg-background/80 p-5 space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Static "Always RAG"</span>
                <span className="font-mono text-sm font-bold text-rose-400">{comp.always_rag.latency}s avg</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{comp.always_rag.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground font-mono">
                <span>Retrievals per Query: <strong>1.0 fixed</strong></span>
                <span>Unnecessary Overhead: <strong className="text-rose-400">High</strong></span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5 space-y-3 shadow-[0_0_20px_rgba(16,185,129,0.1)] relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-emerald-500/30 pb-3">
                <span className="text-sm font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="size-4" /> Adaptive RAG (Dynamic Router)
                </span>
                <span className="font-mono text-sm font-bold text-emerald-400">{comp.adaptive_rag.latency}s avg (-24% Faster)</span>
              </div>
              <p className="text-xs text-foreground leading-relaxed">{comp.adaptive_rag.description}</p>
              <div className="pt-2 flex items-center justify-between text-xs text-emerald-300 font-mono">
                <span>Retrievals per Query: <strong>Dynamic (0 to 3)</strong></span>
                <span>Compute Saved: <strong className="text-emerald-400">24% Latency Reduction</strong></span>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Confusion Matrix */}
          <section className="panel p-6">
            <SectionHeading
              title="Complexity Classification Confusion Matrix"
              subtitle="Expected vs Predicted Query Complexity Routing"
            />
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-center text-xs">
                <thead>
                  <tr className="border-b border-border/80 text-muted-foreground uppercase font-bold tracking-wider">
                    <th className="p-3 text-left">Expected \ Predicted</th>
                    {matrix.labels.map((l) => (
                      <th key={l} className="p-3 text-foreground">
                        {l}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {matrix.values.map((row, i) => (
                    <tr key={matrix.labels[i]} className="border-b border-border/40">
                      <td className="p-3 text-left font-bold text-foreground">{matrix.labels[i]}</td>
                      {row.map((val, j) => {
                        const isMatch = i === j;
                        return (
                          <td
                            key={j}
                            className={`p-3 font-mono font-bold rounded-sm ${
                              isMatch
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                : val > 0
                                  ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                  : "text-muted-foreground/60"
                            }`}
                          >
                            {val}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Strategy Breakdown */}
          <section className="panel p-6">
            <SectionHeading
              title="Strategy Performance Breakdown"
              subtitle="Efficiency & Accuracy metrics grouped by Strategy"
            />
            <div className="space-y-3 mt-4">
              {perf.map((p) => (
                <div key={p.strategy} className="rounded-lg border border-border/80 bg-background/80 p-4 space-y-2">
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span className="text-foreground">{p.strategy}</span>
                    <span className="font-mono text-emerald-400">{p.accuracy}% Accuracy</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                    <span>Queries: {p.queries}</span>
                    <span>Avg Latency: {p.latency}s</span>
                    <span>Retrievals: {p.retrievals}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Detailed Benchmark Table */}
        <section className="panel p-6">
          <SectionHeading title="Evaluation Query Results Log (21 Benchmark Queries)" />
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border/80 text-muted-foreground uppercase font-bold tracking-wider">
                  <th className="pb-3">Query</th>
                  <th className="pb-3">Expected</th>
                  <th className="pb-3">Predicted</th>
                  <th className="pb-3">Strategy</th>
                  <th className="pb-3">Latency</th>
                  <th className="pb-3 text-right">Routing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-surface-elevated/60 transition-colors">
                    <td className="py-3 font-medium text-foreground max-w-xs truncate pr-4">{r.query}</td>
                    <td className="py-3 pr-2"><ComplexityBadge complexity={r.expected} showIcon={false} /></td>
                    <td className="py-3 pr-2"><ComplexityBadge complexity={r.predicted} showIcon={false} /></td>
                    <td className="py-3 text-muted-foreground pr-2 font-mono text-[11px]">{r.strategy}</td>
                    <td className="py-3 font-mono text-muted-foreground pr-2">{r.latency}s</td>
                    <td className="py-3 text-right">
                      {r.correct ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                          <CheckCircle2 className="size-3.5" aria-hidden /> Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-bold bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
                          <XCircle className="size-3.5" aria-hidden /> Misrouted
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
