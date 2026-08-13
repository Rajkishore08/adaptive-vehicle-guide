import { useState } from "react";
import { AlertTriangle, FileText, ShieldAlert, CheckCircle, Clock, Database, Layers, ArrowUpRight, ExternalLink, Bookmark } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ComplexityBadge, StrategyBadge, strategyLabel } from "./badges";
import { SectionHeading } from "./MetricCard";
import { SAFETY_NOTICE } from "@/lib/autorag/data";
import { excerptFor } from "@/lib/autorag/services";
import type { QueryResult, SourceRef } from "@/lib/autorag/types";

export function SafetyNotice({ critical = false }: { critical?: boolean }) {
  if (critical) {
    return (
      <div className="flex gap-3.5 rounded-lg border border-rose-500/50 bg-rose-950/30 p-4 shadow-[0_0_15px_rgba(244,63,94,0.15)] backdrop-blur">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-rose-400" aria-hidden />
        <div>
          <h4 className="text-sm font-bold text-rose-300">Safety-Critical Vehicle Hazard Warning</h4>
          <p className="mt-1 text-xs text-foreground/90 leading-relaxed">
            Stop operating the vehicle immediately if the reported symptoms affect braking, steering, fuel systems or engine cooling. Have your vehicle towed to an authorized service facility for professional technical inspection before driving.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-3 rounded-lg border border-border/80 bg-surface/80 p-3.5 backdrop-blur">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-400" aria-hidden />
      <p className="text-xs text-muted-foreground leading-relaxed">{SAFETY_NOTICE}</p>
    </div>
  );
}

export function SourceDrawer({
  source,
  onClose,
}: {
  source: SourceRef | null;
  onClose: () => void;
}) {
  return (
    <Sheet open={Boolean(source)} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto border-border/80 bg-surface/95 backdrop-blur sm:max-w-lg p-6">
        {source && (
          <div className="space-y-6">
            <SheetHeader className="border-b border-border/60 pb-4">
              <div className="flex items-center gap-2 text-system text-xs font-bold uppercase tracking-wider">
                <Bookmark className="size-4" /> Grounded Technical Manual Evidence
              </div>
              <SheetTitle className="text-xl font-bold text-foreground mt-1">{source.document}</SheetTitle>
              <SheetDescription className="text-xs text-muted-foreground">
                Official Manual Section · Page {source.page} · {source.section}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  <span>Documented Technical Excerpt</span>
                  <span className="text-emerald-400 font-mono">Relevance: {(source.relevance * 100).toFixed(1)}%</span>
                </div>
                <div className="relative rounded-lg border border-system/30 bg-background/90 p-4 font-mono text-xs leading-relaxed text-foreground shadow-inner">
                  <div className="absolute top-2 right-2 flex size-2 rounded-full bg-emerald-400" />
                  "{source.excerpt ?? excerptFor(source.document)}"
                </div>
              </div>

              <div className="rounded-lg border border-border/60 bg-surface-elevated/60 p-4 space-y-2 text-xs">
                <h5 className="font-bold text-foreground flex items-center gap-1.5">
                  <Database className="size-4 text-system" /> Vector Store Grounding & Match Details
                </h5>
                <p className="text-muted-foreground leading-relaxed">
                  Retrieved via dense semantic vector search against indexed Hyundai technical PDF manuals. Matched sub-question section <strong>"{source.section}"</strong> with high cosine similarity score.
                </p>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function EvidenceCard({
  source,
  onClick,
}: {
  source: SourceRef;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative w-full rounded-lg border border-border/80 bg-surface/80 p-4 text-left transition-all duration-300 hover:border-system/50 hover:bg-surface-elevated hover:shadow-[0_0_20px_rgba(56,189,248,0.1)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-md border border-system/40 bg-system/15 text-system group-hover:scale-110 transition-transform">
            <FileText className="size-4" aria-hidden />
          </span>
          <div>
            <h4 className="text-sm font-bold text-foreground group-hover:text-system transition-colors">{source.document}</h4>
            <p className="text-[11px] text-muted-foreground">Page {source.page} · {source.section}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-right font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
          {(source.relevance * 100).toFixed(0)}% <ArrowUpRight className="size-3" />
        </div>
      </div>
      <p className="mt-3 line-clamp-2 font-mono text-xs text-muted-foreground/90 bg-background/50 p-2 rounded border border-border/40">
        "{source.excerpt ?? excerptFor(source.document)}"
      </p>
    </button>
  );
}

export function AnswerCard({ result }: { result: QueryResult }) {
  const [source, setSource] = useState<SourceRef | null>(null);

  const metrics = [
    { label: "Query Complexity", value: result.complexity, highlight: true },
    { label: "Confidence Score", value: `${(result.confidence * 100).toFixed(0)}%` },
    { label: "Routing Strategy", value: strategyLabel(result.strategy) },
    { label: "Pipeline Latency", value: `${(result.metrics.latency_ms / 1000).toFixed(2)}s`, fontMono: true },
    { label: "Retrieval Count", value: String(result.metrics.retrieval_count), fontMono: true },
    { label: "Reasoning Iterations", value: String(result.metrics.iterations), fontMono: true },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <section className="panel p-5 bg-surface/90">
        <SectionHeading title="Performance & Retrieval Metrics" subtitle="Real-time execution stats captured across the pipeline" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border/80 bg-background/80 p-3.5 shadow-sm">
              <p className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">{m.label}</p>
              <p className={`mt-1.5 text-base font-bold text-foreground ${m.fontMono ? "font-mono text-system" : ""}`}>{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Answer Summary Card */}
      <section className="panel grid-backdrop relative overflow-hidden p-6 border-system/30 bg-surface/95 shadow-xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <ComplexityBadge complexity={result.complexity} />
            <StrategyBadge strategy={result.strategy} />
          </div>
          <span className="text-xs text-muted-foreground font-medium">{result.reason}</span>
        </div>
        <SectionHeading title="Synthesized Grounded Answer" />
        <p className="text-base leading-relaxed text-foreground/95 font-normal">{result.answer}</p>
      </section>

      {/* Staged Recommendations for Complex Queries */}
      {result.recommendations && (
        <section className="panel p-6 border-rose-500/30 bg-rose-950/10 shadow-lg">
          <SectionHeading
            title="Staged Technical Inspection Order"
            subtitle="Ranked troubleshooting order based on evidence cross-referencing."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {result.recommendations.map((r) => (
              <div key={r.priority} className="flex gap-3.5 rounded-lg border border-border/80 bg-surface/90 p-4 shadow-sm">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-rose-500/40 bg-rose-500/20 text-xs font-bold text-rose-300 font-mono">
                  #{r.priority}
                </span>
                <div>
                  <h5 className="text-sm font-bold text-foreground">{r.title}</h5>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{r.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Evidence Cards */}
      {result.sources.length > 0 ? (
        <section className="panel p-6">
          <SectionHeading title="Retrieved Document Evidence" subtitle="Official technical manuals retrieved via dense vector similarity." />
          <div className="grid gap-4 sm:grid-cols-2">
            {result.sources.map((s) => (
              <EvidenceCard key={`${s.document}-${s.page}`} source={s} onClick={() => setSource(s)} />
            ))}
          </div>
        </section>
      ) : (
        <section className="panel p-5 text-center">
          <SectionHeading title="Retrieved Document Evidence" />
          <p className="text-xs text-muted-foreground">
            No document retrieval performed. Classified as SIMPLE — answered directly from LLM memory.
          </p>
        </section>
      )}

      <SafetyNotice critical={result.safety_critical} />
      <SourceDrawer source={source} onClose={() => setSource(null)} />
    </div>
  );
}
