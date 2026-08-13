import { useState } from "react";
import { Brain, CheckCircle2, Layers, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPLEXITY_META } from "@/lib/autorag/data";
import type { Complexity } from "@/lib/autorag/types";

const BRANCHES: Complexity[] = ["SIMPLE", "MEDIUM", "COMPLEX"];

const branchStyle: Record<Complexity, { text: string; border: string; bg: string; dot: string }> = {
  SIMPLE: {
    text: "text-simple",
    border: "border-simple/40",
    bg: "bg-simple/10",
    dot: "bg-simple",
  },
  MEDIUM: {
    text: "text-medium",
    border: "border-medium/40",
    bg: "bg-medium/10",
    dot: "bg-medium",
  },
  COMPLEX: {
    text: "text-complex",
    border: "border-complex/40",
    bg: "bg-complex/10",
    dot: "bg-complex",
  },
};

function Node({
  icon: Icon,
  label,
  caption,
  active,
}: {
  icon: React.ElementType;
  label: string;
  caption?: string;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-md border bg-surface px-3 py-2.5 transition-colors",
        active ? "border-system/40 bg-system/10" : "border-border",
      )}
    >
      <Icon className={cn("size-4 shrink-0", active ? "text-system" : "text-muted-foreground")} aria-hidden />
      <div className="leading-tight">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {caption && <p className="text-xs text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}

export function AdaptivePipeline({
  active,
  onSelect,
}: {
  active?: Complexity | null;
  onSelect?: (c: Complexity) => void;
}) {
  const [selected, setSelected] = useState<Complexity | null>(null);
  const highlighted = active ?? selected;

  return (
    <section className="panel p-5">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-foreground">Adaptive Retrieval Pipeline</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          AutoRAG selects the retrieval strategy based on query complexity.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[220px_1fr_220px] lg:items-center">
        <div className="space-y-3">
          <Node icon={MessageSquare} label="User Query" caption="Step 1" active />
          <div className="mx-auto h-5 w-px bg-border lg:hidden" />
          <Node icon={Brain} label="Complexity Classifier" caption="Step 2" active />
        </div>

        <div className="space-y-2.5">
          {BRANCHES.map((c) => {
            const meta = COMPLEXITY_META[c];
            const s = branchStyle[c];
            const isActive = highlighted === c;
            return (
              <button
                key={c}
                type="button"
                title={meta.message}
                onClick={() => {
                  setSelected(c);
                  onSelect?.(c);
                }}
                className={cn(
                  "w-full rounded-md border bg-surface p-3 text-left transition-all duration-300",
                  isActive ? cn(s.border, s.bg) : "border-border hover:border-border hover:bg-surface-elevated",
                  highlighted && !isActive && "opacity-45",
                )}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={cn("flex items-center gap-2 text-xs font-medium tracking-wide uppercase", s.text)}>
                    <span className={cn("size-1.5 rounded-full", s.dot)} aria-hidden />
                    {c}
                  </span>
                  <span className="text-sm font-medium text-foreground">{meta.strategy}</span>
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{meta.description}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                  <span>Retrievals: {meta.retrieval}</span>
                  <span>Reasoning: {meta.reasoning}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <Node icon={Layers} label="Evidence Synthesis" caption="Step 4" active={Boolean(highlighted)} />
          <div className="mx-auto h-5 w-px bg-border lg:hidden" />
          <Node icon={CheckCircle2} label="Final Answer" caption="Step 5" active={Boolean(highlighted)} />
        </div>
      </div>

      {highlighted && (
        <div className={cn("mt-4 rounded-md border p-3", branchStyle[highlighted].border, branchStyle[highlighted].bg)}>
          <p className="text-sm text-foreground">
            <span className={cn("font-medium", branchStyle[highlighted].text)}>
              {COMPLEXITY_META[highlighted].strategy}:
            </span>{" "}
            {COMPLEXITY_META[highlighted].message} {COMPLEXITY_META[highlighted].description}
          </p>
        </div>
      )}
    </section>
  );
}
