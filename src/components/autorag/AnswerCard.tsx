import { useState } from "react";
import { AlertTriangle, FileText, ShieldAlert } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ComplexityBadge, StrategyBadge, strategyLabel } from "./badges";
import { SectionHeading } from "./MetricCard";
import { SAFETY_NOTICE } from "@/lib/autorag/data";
import { excerptFor } from "@/lib/autorag/services";
import type { QueryResult, SourceRef } from "@/lib/autorag/types";

export function SafetyNotice({ critical = false }: { critical?: boolean }) {
  if (critical) {
    return (
      <div className="flex gap-3 rounded-md border border-complex/40 bg-complex/10 p-3">
        <ShieldAlert className="mt-0.5 size-4 shrink-0 text-complex" aria-hidden />
        <p className="text-sm text-foreground">
          <span className="font-medium text-complex">Safety-critical symptom detected.</span> Stop
          using the vehicle if the symptom affects braking, steering, fuel or overheating, and have
          it inspected by a qualified mechanic before driving further.
        </p>
      </div>
    );
  }
  return (
    <div className="flex gap-3 rounded-md border border-border bg-surface p-3">
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
      <p className="text-sm text-muted-foreground">{SAFETY_NOTICE}</p>
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
      <SheetContent className="w-full overflow-y-auto border-border bg-surface sm:max-w-md">
        {source && (
          <>
            <SheetHeader>
              <SheetTitle>{source.document}</SheetTitle>
              <SheetDescription>
                Page {source.page} · {source.section}
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 px-4 pb-6">
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Relevant excerpt
                </p>
                <p className="mt-2 rounded-md border border-border bg-surface-elevated p-3 text-sm text-foreground">
                  {source.excerpt ?? excerptFor(source.document)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Relevance score
                </p>
                <p className="mt-1 text-lg font-bold tabular-nums text-foreground">
                  {(source.relevance * 100).toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Why this source was used
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The retriever matched this section of {source.document} against the sub-question
                  for “{source.section}” and it scored above the evidence threshold.
                </p>
              </div>
            </div>
          </>
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
      className="w-full rounded-md border border-border bg-surface p-3 text-left transition-colors hover:border-system/40 hover:bg-surface-elevated"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <FileText className="size-4 text-system" aria-hidden />
          {source.document}
        </span>
        <span className="text-xs tabular-nums text-muted-foreground">
          {(source.relevance * 100).toFixed(0)}%
        </span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Page {source.page} · {source.section} · Indexed
      </p>
    </button>
  );
}

export function AnswerCard({ result }: { result: QueryResult }) {
  const [source, setSource] = useState<SourceRef | null>(null);

  const metrics = [
    { label: "Complexity", value: result.complexity },
    { label: "Confidence", value: `${(result.confidence * 100).toFixed(0)}%` },
    { label: "Strategy", value: strategyLabel(result.strategy) },
    { label: "Latency", value: `${(result.metrics.latency_ms / 1000).toFixed(2)}s` },
    { label: "Retrievals", value: String(result.metrics.retrieval_count) },
    { label: "Iterations", value: String(result.metrics.iterations) },
  ];

  return (
    <div className="space-y-5">
      <section className="panel p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <ComplexityBadge complexity={result.complexity} />
          <StrategyBadge strategy={result.strategy} />
          <span className="text-xs text-muted-foreground">{result.reason}</span>
        </div>
        <SectionHeading title="Answer Summary" />
        <p className="text-sm leading-relaxed text-foreground">{result.answer}</p>
      </section>

      {result.recommendations && (
        <section className="panel p-5">
          <SectionHeading
            title="Recommended Inspection Order"
            subtitle="Ranked by documentation evidence and maintenance history."
          />
          <ol className="space-y-2.5">
            {result.recommendations.map((r) => (
              <li key={r.priority} className="flex gap-3 rounded-md border border-border bg-surface p-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-sm border border-system/30 bg-system/10 text-xs font-bold text-system">
                  {r.priority}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.reason}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {result.sources.length > 0 ? (
        <section className="panel p-5">
          <SectionHeading title="Evidence & Sources" subtitle="Select a source to inspect the retrieved excerpt." />
          <div className="grid gap-3 sm:grid-cols-2">
            {result.sources.map((s) => (
              <EvidenceCard key={`${s.document}-${s.page}`} source={s} onClick={() => setSource(s)} />
            ))}
          </div>
        </section>
      ) : (
        <section className="panel p-5">
          <SectionHeading title="Evidence & Sources" />
          <p className="text-sm text-muted-foreground">
            No retrieval was performed — the classifier routed this query to Direct LLM.
          </p>
        </section>
      )}

      <section className="panel p-5">
        <SectionHeading title="System Metrics" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-md border border-border bg-surface p-3">
              <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{m.label}</p>
              <p className="mt-1 text-sm font-medium text-foreground">{m.value}</p>
            </div>
          ))}
        </div>
      </section>

      <SafetyNotice critical={result.safety_critical} />
      <SourceDrawer source={source} onClose={() => setSource(null)} />
    </div>
  );
}
