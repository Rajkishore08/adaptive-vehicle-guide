import { useState } from "react";
import { MessageSquare, Brain, Search, Network, CheckCircle2, ArrowDown, ArrowRight, Layers, FileText, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import type { QueryResult } from "@/lib/autorag/types";

const glowStyles = {
  SIMPLE: {
    border: "border-emerald-500/60",
    bg: "bg-emerald-950/40",
    text: "text-emerald-400",
    glow: "shadow-[0_0_25px_rgba(16,185,129,0.25)]",
    badge: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  },
  MEDIUM: {
    border: "border-amber-500/60",
    bg: "bg-amber-950/40",
    text: "text-amber-400",
    glow: "shadow-[0_0_25px_rgba(245,158,11,0.25)]",
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  },
  COMPLEX: {
    border: "border-rose-500/60",
    bg: "bg-rose-950/40",
    text: "text-rose-300",
    glow: "shadow-[0_0_25px_rgba(244,63,94,0.3)]",
    badge: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  },
};

export function FlowNodeGraph({ result }: { result: QueryResult }) {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const style = glowStyles[result.complexity];

  return (
    <div className="panel grid-backdrop relative overflow-hidden p-6 border-system/40 bg-surface/95 shadow-2xl">
      <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded bg-system/20 text-system text-xs font-bold">FLOW</span>
            <h3 className="text-lg font-bold text-foreground">Interactive Execution Node Graph</h3>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time visual node tree of backend classifier routing, query decomposition, and vector retrieval.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={cn("px-2.5 py-1 rounded border font-bold uppercase", style.badge)}>
            {result.complexity} • {result.strategy}
          </span>
        </div>
      </div>

      {/* Node Graph Flow Viewport */}
      <div className="space-y-6">
        {/* Node 1: Entry Query */}
        <div className="flex justify-center">
          <div
            onClick={() => setActiveNode("query")}
            className={cn(
              "cursor-pointer w-full max-w-md rounded-xl border border-border bg-background/90 p-4 shadow-md transition-all hover:border-system/60",
              activeNode === "query" && "border-system bg-system/10 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-system/20 text-system">
                <MessageSquare className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Root Input Node</span>
                <p className="text-xs font-bold text-foreground truncate">{result.query}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-0.5 bg-gradient-to-b from-border to-system/60" />
        </div>

        {/* Node 2: Dynamic Classifier Glowing Node */}
        <div className="flex justify-center">
          <div
            onClick={() => setActiveNode("classifier")}
            className={cn(
              "cursor-pointer w-full max-w-lg rounded-xl border p-4 backdrop-blur transition-all duration-300",
              style.border,
              style.bg,
              style.glow,
              activeNode === "classifier" && "scale-[1.02]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg border", style.badge)}>
                  <Brain className="size-5 animate-pulse" />
                </div>
                <div>
                  <span className={cn("text-[10px] font-bold uppercase tracking-wider", style.text)}>
                    Step 1 · Intent Classifier Node
                  </span>
                  <h4 className="text-sm font-bold text-foreground">Classified as {result.complexity}</h4>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-foreground bg-background/60 px-2.5 py-1 rounded border border-border">
                {(result.confidence * 100).toFixed(0)}% confidence
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{result.reason}</p>
          </div>
        </div>

        {/* Branching Lines */}
        <div className="flex justify-center">
          <div className="h-6 w-0.5 bg-gradient-to-b from-system/60 to-border" />
        </div>

        {/* Node 3: Sub-Question Decomposition (Complex) or Direct Retrieval Node */}
        {result.sub_questions && result.sub_questions.length > 0 ? (
          <div className="space-y-4">
            <div className="text-center">
              <span className="inline-block rounded-full bg-rose-950/60 px-3 py-1 text-[11px] font-bold text-rose-300 border border-rose-500/40">
                Step 2 · Multi-Hop Sub-Question Decomposition ({result.sub_questions.length} Branches)
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {result.sub_questions.map((sub, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveNode(`sub-${idx}`)}
                  className={cn(
                    "cursor-pointer rounded-lg border border-rose-500/30 bg-rose-950/20 p-3.5 transition-all hover:border-rose-500/60 hover:bg-rose-950/40",
                    activeNode === `sub-${idx}` && "border-rose-400 bg-rose-950/50 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                  )}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="flex size-5 items-center justify-center rounded bg-rose-500/20 text-[10px] font-bold text-rose-300 font-mono">
                      Q{idx + 1}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">Decomposed Query</span>
                  </div>
                  <p className="text-xs font-medium text-foreground leading-snug">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="rounded-lg border border-border bg-background/80 px-4 py-2 text-xs font-mono text-muted-foreground">
              {result.complexity === "SIMPLE" ? "Retrieval Skipped (Direct LLM Path)" : "Single-Step Vector Pass (1 Retrieval)"}
            </div>
          </div>
        )}

        {/* Node 4: Document Vector Relevance Nodes */}
        {result.sources.length > 0 && (
          <div className="space-y-3">
            <div className="text-center">
              <span className="inline-block rounded-full bg-system/15 px-3 py-1 text-[11px] font-bold text-system border border-system/30">
                Step 3 · Vector Retrieval Chunks ({result.sources.length} Documents Matched)
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.sources.map((s, i) => (
                <div
                  key={`${s.document}-${i}`}
                  onClick={() => setActiveNode(`src-${i}`)}
                  className={cn(
                    "cursor-pointer rounded-lg border border-border/80 bg-background/80 p-3.5 transition-all hover:border-system/50 hover:bg-surface-elevated",
                    activeNode === `src-${i}` && "border-system bg-system/15 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                      <FileText className="size-3.5 text-system" /> {s.document}
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      {(s.relevance * 100).toFixed(0)}% match
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Page {s.page} • {s.section}</p>
                  <p className="mt-2 line-clamp-2 font-mono text-[11px] text-muted-foreground/90 bg-surface/60 p-2 rounded">
                    "{s.excerpt}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Vertical Connector */}
        <div className="flex justify-center">
          <div className="h-6 w-0.5 bg-gradient-to-b from-system/60 to-emerald-500/60" />
        </div>

        {/* Node 5: Final Grounded Output Node */}
        <div className="flex justify-center">
          <div
            onClick={() => setActiveNode("synthesis")}
            className={cn(
              "cursor-pointer w-full max-w-xl rounded-xl border border-emerald-500/50 bg-emerald-950/30 p-4 shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur transition-all",
              activeNode === "synthesis" && "border-emerald-400 bg-emerald-950/50"
            )}
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-emerald-500/40 bg-emerald-500/20 text-emerald-400">
                <CheckCircle2 className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Final Output Node</span>
                <h4 className="text-sm font-bold text-foreground truncate">Synthesized Grounded Answer</h4>
                <p className="text-[11px] text-muted-foreground">Execution completed in {(result.metrics.latency_ms / 1000).toFixed(2)}s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
