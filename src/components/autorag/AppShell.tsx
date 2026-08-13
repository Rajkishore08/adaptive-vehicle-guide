import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Car,
  CircuitBoard,
  Gauge,
  Info,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DEMO_VEHICLE } from "@/lib/autorag/data";

const NAV = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Vehicle", to: "/vehicle", icon: Car },
  { label: "Ask AutoRAG", to: "/ask", icon: MessageSquare },
  { label: "Investigation", to: "/investigation", icon: Search },
  { label: "Knowledge Base", to: "/knowledge-base", icon: BookOpen },
  { label: "Evaluation", to: "/evaluation", icon: Gauge },
  { label: "About Adaptive RAG", to: "/about", icon: Info },
] as const;

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex size-9 items-center justify-center rounded-md border border-system/30 bg-system/10">
        <CircuitBoard className="size-5 text-system" aria-hidden />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-foreground">AutoRAG</span>
        <span className="block text-[11px] text-muted-foreground">Adaptive Vehicle Intelligence</span>
      </span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="flex flex-col gap-1" aria-label="Main">
      {NAV.map(({ label, to, icon: Icon }) => {
        const active = pathname === to;
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
              active
                ? "border border-system/25 bg-system/10 font-medium text-foreground"
                : "border border-transparent text-muted-foreground hover:bg-surface-elevated hover:text-foreground",
            )}
          >
            <Icon className={cn("size-4", active && "text-system")} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="space-y-2 border-t border-border pt-4 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">System Status</span>
        <span className="inline-flex items-center gap-1.5 text-simple">
          <span className="size-1.5 rounded-full bg-simple" aria-hidden />
          Online
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">Demo Mode</span>
        <span className="rounded-sm border border-system/30 bg-system/10 px-1.5 py-0.5 font-medium text-system">
          ENABLED
        </span>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-border bg-sidebar p-4 lg:flex">
        <div className="space-y-6">
          <Logo />
          <NavLinks />
        </div>
        <SidebarFooter />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-background/80"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col justify-between border-r border-border bg-sidebar p-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation"
                  className="rounded-md p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-5" />
                </button>
              </div>
              <NavLinks onNavigate={() => setOpen(false)} />
            </div>
            <SidebarFooter />
          </div>
        </div>
      )}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="rounded-md p-1.5 text-muted-foreground hover:text-foreground lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-5" />
              </button>
              <span className="hidden rounded-sm border border-system/30 bg-system/10 px-2 py-0.5 text-xs font-medium text-system sm:inline">
                Adaptive RAG
              </span>
              <span className="rounded-sm border border-border bg-surface px-2 py-0.5 text-xs font-medium text-muted-foreground">
                DEMO MODE
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/vehicle"
                className="hidden items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
              >
                <Car className="size-3.5" aria-hidden />
                {DEMO_VEHICLE.manufacturer} {DEMO_VEHICLE.model} · {DEMO_VEHICLE.year}
              </Link>
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-simple" aria-hidden />
                Demo System Online
              </span>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
