import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, FileText, CheckCircle2, Layers } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { MetricCard, PageHeader, SectionHeading } from "@/components/autorag/MetricCard";
import { SourceDrawer } from "@/components/autorag/AnswerCard";
import { knowledgeBaseService } from "@/lib/autorag/services";
import type { KbDocument, SourceRef } from "@/lib/autorag/types";

export const Route = createFileRoute("/knowledge-base")({
  head: () => ({
    meta: [
      { title: "Knowledge Base · AutoRAG" },
      { name: "description", content: "Inspect indexed vector document chunks and vehicle documentation manual sources." },
    ],
  }),
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  const documents = knowledgeBaseService.listDocuments();
  const stats = knowledgeBaseService.stats();
  const [selectedSource, setSelectedSource] = useState<SourceRef | null>(null);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Vehicle Documentation Knowledge Base"
          subtitle="10 indexed Hyundai Santro Xing manuals, schedules and troubleshooting guides ready for semantic retrieval."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Indexed Manuals" value={`${stats.documents}`} caption="PDF files" />
          <MetricCard label="Total Vector Chunks" value={stats.chunks.toLocaleString()} caption="Embedded snippets" />
          <MetricCard label="Index Coverage" value={stats.indexed} caption="Vector database status" />
          <MetricCard label="Last Index Sync" value={stats.lastUpdated} caption="Freshness guarantee" />
        </div>

        <section className="panel p-5">
          <SectionHeading
            title="Indexed Documents"
            subtitle="Click any document to preview its sample vector embedding excerpt."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc: KbDocument) => (
              <button
                key={doc.id}
                type="button"
                onClick={() =>
                  setSelectedSource({
                    document: doc.name,
                    page: 1,
                    section: "General Information",
                    relevance: 0.95,
                  })
                }
                className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-system/50 hover:bg-surface-elevated hover:shadow-lg"
              >
                <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border/60 bg-background">
                  <img
                    src={doc.name.includes("Owner") ? "/doc_owners_manual.jpg" : "/doc_troubleshooting.jpg"}
                    alt={doc.name}
                    className="h-full w-full object-cover opacity-85 hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-background/90 px-2 py-0.5 font-mono text-[10px] font-bold text-system">
                    10 Pages / 45 Chunks
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-foreground">{doc.name}</h3>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>{doc.pages} pages</span>
                    <span>·</span>
                    <span>{doc.chunks} vector chunks</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-simple">
                    <CheckCircle2 className="size-3" aria-hidden />
                    {doc.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(null)} />
      </div>
    </AppShell>
  );
}
