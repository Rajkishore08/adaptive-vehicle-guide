import { CircleCheck, Network, Search, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Complexity, Strategy } from "@/lib/autorag/types";
import { COMPLEXITY_META } from "@/lib/autorag/data";

const styles: Record<Complexity, string> = {
  SIMPLE: "text-emerald-400 border-emerald-500/40 bg-emerald-950/40 font-semibold shadow-[0_0_10px_rgba(16,185,129,0.1)]",
  MEDIUM: "text-amber-400 border-amber-500/40 bg-amber-950/40 font-semibold shadow-[0_0_10px_rgba(245,158,11,0.1)]",
  COMPLEX: "text-rose-400 border-rose-500/40 bg-rose-950/40 font-semibold shadow-[0_0_10px_rgba(244,63,94,0.1)]",
};

const icons = {
  SIMPLE: Zap,
  MEDIUM: Search,
  COMPLEX: Network,
};

export function ComplexityBadge({
  complexity,
  className,
  showIcon = true,
}: {
  complexity: Complexity;
  className?: string;
  showIcon?: boolean;
}) {
  const Icon = icons[complexity];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur",
        styles[complexity],
        className,
      )}
    >
      {showIcon && <Icon className="size-3.5" aria-hidden />}
      {COMPLEXITY_META[complexity].label}
    </span>
  );
}

const strategyLabels: Record<Strategy, string> = {
  DIRECT_LLM: "Direct LLM",
  SINGLE_STEP_RAG: "Single-Step RAG",
  AGENTIC_MULTI_HOP_RAG: "Agentic Multi-Hop RAG",
};

export function strategyLabel(strategy: Strategy) {
  return strategyLabels[strategy];
}

export function StrategyBadge({
  strategy,
  className,
}: {
  strategy: Strategy;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-system/40 bg-system/15 px-2.5 py-1 text-xs font-semibold text-system backdrop-blur shadow-[0_0_10px_rgba(56,189,248,0.1)]",
        className,
      )}
    >
      {strategyLabels[strategy]}
    </span>
  );
}
