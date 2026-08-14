import { useState, useEffect, useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload, FileText, CheckCircle2, Loader2, Sparkles, AlertCircle, Eye } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { MetricCard, PageHeader, SectionHeading } from "@/components/autorag/MetricCard";
import { SourceDrawer } from "@/components/autorag/AnswerCard";
import { knowledgeBaseService, excerptFor } from "@/lib/autorag/services";
import type { KbDocument, SourceRef } from "@/lib/autorag/types";

export const Route = createFileRoute("/knowledge-base")({
  head: () => ({
    meta: [
      { title: "Knowledge Base · AutoRAG" },
      { name: "description", content: "Inspect indexed vector document chunks and upload new PDF vehicle documentation manuals." },
    ],
  }),
  component: KnowledgeBasePage,
});

function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<KbDocument[]>([]);
  const [selectedSource, setSelectedSource] = useState<SourceRef | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [latestParsedDoc, setLatestParsedDoc] = useState<KbDocument | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadDocs = async () => {
    const docs = await knowledgeBaseService.listDocuments();
    setDocuments([...docs]);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const totalChunks = documents.reduce((sum, d) => sum + d.chunks, 0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Only PDF (.pdf) documents are accepted into the Knowledge Base.");
      return;
    }

    setIsUploading(true);
    setUploadStatus(`Parsing pages from '${file.name}' and embedding into Vector Retriever...`);
    setUploadError(null);

    try {
      const res = await knowledgeBaseService.uploadDocument(file);
      setUploadStatus(res.message);
      if (res.document) {
        setLatestParsedDoc(res.document);
      }
      await loadDocs();
    } catch (err: any) {
      setUploadError(err.message || "Failed to process PDF manual.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Vehicle Documentation Knowledge Base"
          subtitle="Indexed Hyundai Santro Xing manuals, service schedules, and user-uploaded PDF technical documentation."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Indexed Manuals" value={`${documents.length}`} caption="PDF files in vector store" />
          <MetricCard label="Total Vector Chunks" value={totalChunks.toLocaleString()} caption="Embedded snippets" />
          <MetricCard label="Index Coverage" value="100%" caption="Vector database status" />
          <MetricCard label="Retriever Engine" value="pgvector / dense" caption="1024-dim cosine search" />
        </div>

        {/* PDF Upload Card Panel */}
        <section className="panel p-6 border-system/40 bg-surface/95 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-system animate-pulse" />
                <h3 className="text-lg font-bold text-foreground">Upload New PDF Manual to Knowledge Base</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Upload custom PDF repair guides or service invoices. Information is automatically extracted, chunked, and indexed into the Vector Retriever.
              </p>
            </div>
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-system px-5 py-2.5 text-xs font-bold text-system-foreground shadow-lg transition-all hover:bg-system/90 active:scale-95 disabled:opacity-50"
            >
              {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
              {isUploading ? "Processing PDF..." : "Select & Upload PDF"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {uploadStatus && (
            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-emerald-500/40 bg-emerald-950/30 p-3 text-xs font-medium text-emerald-300">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-400" />
              <span>{uploadStatus}</span>
            </div>
          )}

          {uploadError && (
            <div className="mt-3 flex items-center gap-2.5 rounded-lg border border-rose-500/40 bg-rose-950/30 p-3 text-xs font-medium text-rose-300">
              <AlertCircle className="size-4 shrink-0 text-rose-400" />
              <span>{uploadError}</span>
            </div>
          )}

          {/* Newly Parsed Document Content Preview Box */}
          {latestParsedDoc && (
            <div className="mt-4 rounded-xl border border-system/40 bg-background/90 p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-system" />
                  <span className="text-xs font-bold text-foreground">Extracted Text Content: {latestParsedDoc.name}</span>
                </div>
                <span className="font-mono text-[10px] text-system bg-system/10 px-2 py-0.5 rounded font-bold">
                  {latestParsedDoc.pages} Pages • {latestParsedDoc.chunks} Chunks
                </span>
              </div>
              <pre className="max-h-48 overflow-y-auto whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-muted-foreground p-3 bg-surface/80 rounded-lg border border-border/50">
                {latestParsedDoc.excerpt || excerptFor(latestParsedDoc.name)}
              </pre>
            </div>
          )}
        </section>

        {/* Indexed Manuals Grid */}
        <section className="panel p-5">
          <SectionHeading
            title="Indexed Knowledge Base Documents"
            subtitle="Click any manual to inspect page contents and sample vector embedding excerpts."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc: KbDocument) => {
              const docExcerpt = doc.excerpt || excerptFor(doc.name);
              return (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() =>
                    setSelectedSource({
                      document: doc.name,
                      page: 1,
                      section: "Knowledge Base Technical Section",
                      relevance: 0.96,
                      excerpt: docExcerpt,
                    })
                  }
                  className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-system/50 hover:bg-surface-elevated hover:shadow-lg"
                >
                  <div className="relative h-32 w-full overflow-hidden rounded-lg border border-border/60 bg-background flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950">
                    <div className="text-center p-3">
                      <FileText className="size-8 text-system mx-auto mb-1 opacity-80" />
                      <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">{doc.type} MANUAL</span>
                    </div>
                    <span className="absolute bottom-2 right-2 rounded bg-background/90 px-2 py-0.5 font-mono text-[10px] font-bold text-system border border-border/50">
                      {doc.pages} Pages / {doc.chunks} Chunks
                    </span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-foreground truncate">{doc.name}</h3>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>{doc.pages} pages</span>
                      <span>·</span>
                      <span>{doc.chunks} vector chunks</span>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-simple">
                        <CheckCircle2 className="size-3" aria-hidden />
                        {doc.status}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] text-system font-bold">
                        <Eye className="size-3" /> View Excerpt
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <SourceDrawer source={selectedSource} onClose={() => setSelectedSource(null)} />
      </div>
    </AppShell>
  );
}
