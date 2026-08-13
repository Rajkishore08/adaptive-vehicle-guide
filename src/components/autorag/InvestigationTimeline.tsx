import { CheckCircle2, Clock, Cpu, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InvestigationStep } from "@/lib/autorag/types";

export function InvestigationTimeline({
  steps,
  currentStage,
  isExecuting = false,
}: {
  steps: InvestigationStep[];
  currentStage?: number;
  isExecuting?: boolean;
}) {
  return (
    <div className="space-y-3">
      {steps.map((s, idx) => {
        const isCurrent = isExecuting && currentStage === idx;
        const isPast = !isExecuting || (currentStage !== undefined && currentStage > idx);

        return (
          <div
            key={s.number}
            className={cn(
              "flex gap-3 rounded-md border p-3.5 transition-all duration-300",
              isCurrent
                ? "border-system/50 bg-system/10 shadow-sm"
                : isPast
                  ? "border-border bg-surface"
                  : "border-border/50 bg-surface/50 opacity-50",
            )}
          >
            <div className="mt-0.5 shrink-0">
              {isPast ? (
                <CheckCircle2 className="size-4 text-simple" aria-hidden />
              ) : isCurrent ? (
                <Cpu className="size-4 animate-spin text-system" aria-hidden />
              ) : (
                <Clock className="size-4 text-muted-foreground" aria-hidden />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">
                  Step {s.number}: {s.title}
                </p>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {isCurrent ? "Executing..." : isPast ? "Completed" : "Queued"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
