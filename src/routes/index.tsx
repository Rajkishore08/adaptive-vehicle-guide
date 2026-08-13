import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Car, CircuitBoard, Gauge, MessageSquare, Search, Zap, Network, ShieldCheck, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { MetricCard, PageHeader } from "@/components/autorag/MetricCard";
import { AdaptivePipeline } from "@/components/autorag/AdaptivePipeline";
import { DEMO_VEHICLE, HEADLINE_METRICS } from "@/lib/autorag/data";
import { knowledgeBaseService } from "@/lib/autorag/services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · AutoRAG Adaptive Vehicle Intelligence" },
      {
        name: "description",
        content: "Overview of AutoRAG adaptive query routing for vehicle documentation and diagnostics.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const kbStats = knowledgeBaseService.stats();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Adaptive Vehicle Intelligence Dashboard"
          subtitle="Dynamic query classification and evidence-grounded routing across Hyundai Santro Xing documentation."
          action={
            <Link
              to="/ask"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-[1.02]"
            >
              <MessageSquare className="size-4" aria-hidden />
              Launch AutoRAG Query Engine
            </Link>
          }
        />

        {/* 5-Second Concept Banner */}
        <section className="panel grid-backdrop relative overflow-hidden p-6 border-system/40 bg-surface/95 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-system/40 bg-system/15 px-3 py-1 text-xs font-bold text-system uppercase tracking-wider">
                <Zap className="size-3.5 animate-pulse" /> NAACL 2024 Adaptive-RAG Research Architecture
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Adaptive Query Routing in 5 Seconds</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Queries are dynamically evaluated by an LLM classifier to select optimal retrieval strategies: <strong>SIMPLE</strong> queries skip vector search entirely (0ms overhead), <strong>MEDIUM</strong> queries perform 1 retrieval pass, and <strong>COMPLEX</strong> symptoms execute agentic multi-hop retrieval.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <Link
                to="/ask"
                className="flex flex-col justify-between rounded-xl border border-rose-500/50 bg-rose-950/30 p-4 text-left transition-all hover:scale-[1.03] hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]"
              >
                <span className="text-[10px] font-bold text-rose-400 uppercase">Try Demo Query</span>
                <span className="text-sm font-bold text-foreground mt-1">Multi-Symptom Diagnostic</span>
                <span className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1 text-rose-300">
                  Agentic Multi-Hop Route <ArrowRight className="size-3" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Headline Metrics Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HEADLINE_METRICS.map((m) => (
            <MetricCard key={m.label} label={m.label} value={m.value} caption={m.caption} />
          ))}
        </div>

        {/* 3-Way Pipeline Visualization */}
        <AdaptivePipeline onSelect={() => navigate({ to: "/ask" })} />

        {/* Vehicle & KB Quick Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <section className="panel p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-system/30 bg-system/10 text-system">
                  <Car className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-foreground">Target Vehicle Context</h3>
                  <p className="text-xs text-muted-foreground">Active Knowledge Base Grounding</p>
                </div>
              </div>
              <Link
                to="/vehicle"
                className="flex items-center gap-1 text-xs font-semibold text-system hover:underline"
              >
                View Specs <ArrowRight className="size-3" aria-hidden />
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-border/80 bg-background/80 p-4 text-xs font-mono">
              <div>
                <span className="text-muted-foreground">Vehicle:</span>{" "}
                <strong className="text-foreground">{DEMO_VEHICLE.manufacturer} {DEMO_VEHICLE.model}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Year:</span>{" "}
                <strong className="text-foreground">{DEMO_VEHICLE.year}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Engine:</span>{" "}
                <strong className="text-foreground">{DEMO_VEHICLE.engine} ({DEMO_VEHICLE.fuel})</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Odometer:</span>{" "}
                <strong className="text-foreground">{DEMO_VEHICLE.odometer}</strong>
              </div>
            </div>
          </section>

          <section className="panel p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-system/30 bg-system/10 text-system">
                  <BookOpen className="size-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-foreground">Vector Knowledge Store</h3>
                  <p className="text-xs text-muted-foreground">Dense Index Status</p>
                </div>
              </div>
              <Link
                to="/knowledge-base"
                className="flex items-center gap-1 text-xs font-semibold text-system hover:underline"
              >
                Inspect Index <ArrowRight className="size-3" aria-hidden />
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 rounded-lg border border-border/80 bg-background/80 p-4 text-xs font-mono">
              <div>
                <span className="text-muted-foreground">Manuals:</span>{" "}
                <strong className="text-foreground">{kbStats.documents} PDFs</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Vector Chunks:</span>{" "}
                <strong className="text-foreground">{kbStats.chunks.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Coverage:</span>{" "}
                <strong className="text-foreground">{kbStats.indexed}</strong>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>{" "}
                <strong className="text-emerald-400">Ready</strong>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
