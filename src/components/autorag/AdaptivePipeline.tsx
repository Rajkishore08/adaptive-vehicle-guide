import { useState } from "react";
import { Brain, CheckCircle2, Layers, MessageSquare, ArrowRight, Zap, Search, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPLEXITY_META } from "@/lib/autorag/data";
import type { Complexity } from "@/lib/autorag/types";

const BRANCHES: Complexity[] = ["SIMPLE", "MEDIUM", "COMPLEX"];

const branchStyle: Record<Complexity, { text: string; border: string; bg: string; dot: string; glow: string; badgeBg: string }> = {
  SIMPLE: {
    text: "text-emerald-400 font-semibold",
    border: "border-emerald-500/50",
    bg: "bg-emerald-950/30",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  MEDIUM: {
    text: "text-amber-400 font-semibold",
    border: "border-amber-500/50",
    bg: "bg-amber-950/30",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
  COMPLEX: {
    text: "text-rose-400 font-semibold",
    border: "border-rose-500/50",
    bg: "bg-rose-950/30",
    dot: "bg-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
    glow: "shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    badgeBg: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  },
};

const icons = {
  SIMPLE: Zap,
  MEDIUM: Search,
  COMPLEX: Network,
};

export function AdaptivePipeline({
  active,
  onSelect,
  showTitle = true,
}: {
  active?: Complexity | null;
  onSelect?: (c: Complexity) => void;
  showTitle?: boolean;
}) {
  const [selected, setSelected] = useState<Complexity | null>(null);
  const highlighted = active ?? selected;

  return (
    <section className="panel grid-backdrop relative overflow-hidden p-6 shadow-xl border-system/30 bg-surface/90">
      <div className="absolute -right-12 -top-12 size-48 rounded-full bg-system/5 blur-3xl pointer-events-none" />

      {showTitle && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded bg-system/20 text-system text-xs font-bold">1</span>
              <h2 className="text-xl font-bold tracking-tight text-foreground">Adaptive RAG Routing Architecture</h2>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Dynamic complexity classification dynamically routes queries to optimal retrieval strategies within 5ms.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-background/60 px-3 py-1.5 rounded-full border border-border">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive Visual Model</span>
          </div>
        </div>
      )}

      {/* 5-Second Hero Flow Diagram */}
      <div className="grid gap-4 lg:grid-cols-[200px_1fr_200px] lg:items-center">
        {/* Stage 1: Input & Classifier */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-background/80 p-3 shadow-sm backdrop-blur">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-system/15 text-system border border-system/30">
              <MessageSquare className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Step 1</span>
              <p className="text-sm font-semibold text-foreground truncate">User Query</p>
              <p className="text-[11px] text-muted-foreground truncate">Raw Question Input</p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="h-4 w-0.5 bg-system/40 border-r border-dashed border-system" />
          </div>

          <div className={cn(
            "flex items-center gap-3 rounded-lg border p-3 shadow-sm backdrop-blur transition-all duration-300",
            highlighted ? "border-system bg-system/15 shadow-[0_0_15px_rgba(56,189,248,0.2)]" : "border-border bg-background/80"
          )}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-system/20 text-system border border-system/40">
              <Brain className="size-5 animate-pulse" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-wider text-system uppercase">Step 2 · LLM Classifier</span>
              <p className="text-sm font-bold text-foreground truncate">Complexity Analyzer</p>
              <p className="text-[11px] text-muted-foreground truncate">Intent & Entity Scoring</p>
            </div>
          </div>
        </div>

        {/* Stage 2: 3-Way Branching */}
        <div className="space-y-3 py-2">
          {BRANCHES.map((c) => {
            const meta = COMPLEXITY_META[c];
            const s = branchStyle[c];
            const Icon = icons[c];
            const isActive = highlighted === c;

            return (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setSelected(c);
                  onSelect?.(c);
                }}
                className={cn(
                  "group relative w-full rounded-lg border p-3.5 text-left transition-all duration-300 backdrop-blur",
                  isActive
                    ? cn(s.border, s.bg, s.glow, "scale-[1.02] z-10")
                    : "border-border/80 bg-surface/60 hover:border-border hover:bg-surface-elevated/80",
                  highlighted && !isActive && "opacity-40"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("flex size-7 items-center justify-center rounded border text-xs font-bold", s.badgeBg)}>
                      <Icon className="size-3.5" />
                    </span>
                    <div>
                      <span className={cn("text-xs tracking-wider uppercase", s.text)}>
                        {c} QUERY
                      </span>
                      <h4 className="text-sm font-bold text-foreground leading-none mt-0.5">{meta.strategy}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block rounded border border-border/80 bg-background/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {meta.retrieval}
                    </span>
                    <ArrowRight className={cn("size-4 transition-transform group-hover:translate-x-1", isActive ? s.text : "text-muted-foreground")} />
                  </div>
                </div>

                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{meta.description}</p>
              </button>
            );
          })}
        </div>

        {/* Stage 3: Synthesis & Answer Output */}
        <div className="space-y-3">
          <div className={cn(
            "flex items-center gap-3 rounded-lg border p-3 shadow-sm backdrop-blur transition-all duration-300",
            highlighted ? "border-system bg-system/15 shadow-[0_0_15px_rgba(56,189,248,0.2)]" : "border-border bg-background/80"
          )}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-system/20 text-system border border-system/40">
              <Layers className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">Step 3</span>
              <p className="text-sm font-bold text-foreground truncate">Evidence Synthesis</p>
              <p className="text-[11px] text-muted-foreground truncate">Context Grounding Pass</p>
            </div>
          </div>

          <div className="hidden lg:flex justify-center">
            <div className="h-4 w-0.5 bg-system/40 border-r border-dashed border-system" />
          </div>

          <div className={cn(
            "flex items-center gap-3 rounded-lg border p-3 shadow-sm backdrop-blur transition-all duration-300",
            highlighted ? "border-emerald-500/50 bg-emerald-950/30" : "border-border bg-background/80"
          )}>
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <CheckCircle2 className="size-5" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">Step 4</span>
              <p className="text-sm font-bold text-foreground truncate">Final Response</p>
              <p className="text-[11px] text-muted-foreground truncate">Precision Grounded Answer</p>
            </div>
          </div>
        </div>
      </div>

      {highlighted && (
        <div className={cn("mt-5 rounded-lg border p-4 backdrop-blur animate-in fade-in slide-in-from-top-2 duration-300", branchStyle[highlighted].border, branchStyle[highlighted].bg)}>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className={cn("size-2.5 rounded-full", branchStyle[highlighted].dot)} />
              <span className={cn("text-xs font-bold uppercase tracking-wider", branchStyle[highlighted].text)}>
                Active Route: {COMPLEXITY_META[highlighted].strategy}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">Reasoning Strategy: <strong className="text-foreground">{COMPLEXITY_META[highlighted].reasoning}</strong></span>
          </div>
          <p className="mt-2 text-sm text-foreground leading-relaxed">
            {COMPLEXITY_META[highlighted].message} {COMPLEXITY_META[highlighted].description}
          </p>
        </div>
      )}
    </section>
  );
}
