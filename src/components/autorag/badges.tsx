import { CircleCheck, Network, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Complexity, Strategy } from "@/lib/autorag/types";
import { COMPLEXITY_META } from "@/lib/autorag/data";

const styles: Record<Complexity, string> = {
  SIMPLE: "text-simple border-simple/30 bg-simple/10",
  MEDIUM: "text-medium border-medium/30 bg-medium/10",
  COMPLEX: "text-complex border-complex/30 bg-complex/10",
};

const icons = {
  SIMPLE: CircleCheck,
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
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-medium tracking-wide uppercase",
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
        "inline-flex items-center gap-1.5 rounded-sm border border-system/30 bg-system/10 px-2 py-0.5 text-xs font-medium text-system",
        className,
      )}
    >
      {strategyLabels[strategy]}
    </span>
  );
}
