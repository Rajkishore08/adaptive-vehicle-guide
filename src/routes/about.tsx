import { createFileRoute, Link } from "@tanstack/react-router";
import { Brain, CircuitBoard, Layers, Shield, Zap, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { PageHeader, SectionHeading } from "@/components/autorag/MetricCard";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Adaptive RAG · AutoRAG" },
      { name: "description", content: "Learn about the architecture and research principles behind Adaptive Retrieval-Augmented Generation." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="About Adaptive RAG Architecture"
          subtitle="Dynamic retrieval routing tailored for complex technical domains, manuals and vehicle diagnostic guides."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="panel p-5 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-md border border-simple/30 bg-simple/10 text-simple">
              <Zap className="size-5" aria-hidden />
            </div>
            <h3 className="text-lg font-bold text-foreground">1. Query Complexity Classification</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Instead of forcing every user query through expensive vector search, a lightweight intent classifier routes simple queries directly to the LLM, reducing latency by up to 60%.
            </p>
          </section>

          <section className="panel p-5 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-md border border-medium/30 bg-medium/10 text-medium">
              <Layers className="size-5" aria-hidden />
            </div>
            <h3 className="text-lg font-bold text-foreground">2. Single-Step Grounded RAG</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Queries requiring specific vehicle specifications or maintenance schedules execute a single-pass vector retrieval step to retrieve exact manual pages and citation excerpts.
            </p>
          </section>

          <section className="panel p-5 space-y-3">
            <div className="flex size-10 items-center justify-center rounded-md border border-complex/30 bg-complex/10 text-complex">
              <Brain className="size-5" aria-hidden />
            </div>
            <h3 className="text-lg font-bold text-foreground">3. Agentic Multi-Hop RAG</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Complex diagnostic symptoms (e.g. poor mileage + rough idle + hard clutch) trigger query decomposition into focused sub-questions, multi-vector search across manuals, and evidence synthesis.
            </p>
          </section>
        </div>

        <section className="panel p-6 space-y-4">
          <SectionHeading title="Research Concept & Domain Focus" />
          <p className="text-sm leading-relaxed text-foreground">
            AutoRAG demonstrates how adaptive query routing optimizes response quality and system performance in technical AI research applications. By analyzing query complexity before executing retrieval pipelines, the system eliminates unnecessary vector database lookups for common knowledge while guaranteeing rigorous multi-document grounding for complex diagnostic scenarios.
          </p>
          <div className="pt-2">
            <Link
              to="/ask"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Try AutoRAG Live <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
