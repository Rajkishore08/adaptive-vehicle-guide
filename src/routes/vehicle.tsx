import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Car, Wrench, ShieldCheck, FileText } from "lucide-react";
import { AppShell } from "@/components/autorag/AppShell";
import { PageHeader, SectionHeading } from "@/components/autorag/MetricCard";
import { vehicleService } from "@/lib/autorag/services";

export const Route = createFileRoute("/vehicle")({
  head: () => ({
    meta: [
      { title: "Vehicle Profile · AutoRAG" },
      { name: "description", content: "Hyundai Santro Xing 1.1L specifications and service history records." },
    ],
  }),
  component: VehiclePage,
});

function VehiclePage() {
  const vehicle = vehicleService.getVehicle();
  const history = vehicleService.getHistory();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Vehicle Profile & History"
          subtitle="Target vehicle context used for grounding adaptive RAG queries and maintenance checks."
          action={
            <Link
              to="/ask"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Ask About This Vehicle
            </Link>
          }
        />

        <div className="grid gap-6 md:grid-cols-3">
          <section className="panel p-5 md:col-span-1">
            <SectionHeading title="Specifications" />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Manufacturer</span>
                <span className="font-semibold text-foreground">{vehicle.manufacturer}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Model</span>
                <span className="font-semibold text-foreground">{vehicle.model}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Year</span>
                <span className="font-semibold text-foreground">{vehicle.year}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Engine</span>
                <span className="font-semibold text-foreground">{vehicle.engine}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-muted-foreground">Fuel Type</span>
                <span className="font-semibold text-foreground">{vehicle.fuel}</span>
              </div>
              <div className="flex items-center justify-between pb-1">
                <span className="text-muted-foreground">Odometer</span>
                <span className="font-semibold text-foreground">{vehicle.odometer}</span>
              </div>
            </div>
          </section>

          <section className="panel p-5 md:col-span-2">
            <SectionHeading
              title="Recent Maintenance History"
              subtitle="Logged service records cross-referenced by complex multi-hop queries."
            />
            <div className="space-y-3">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 rounded-md border border-border bg-surface p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-md border border-system/30 bg-system/10 text-system">
                      <Wrench className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{item.service}</p>
                      <p className="text-xs text-muted-foreground">Mileage: {item.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="size-3.5" aria-hidden />
                    <span>{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
