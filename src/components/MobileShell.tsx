import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Languages, ScanLine, Info, Menu } from "lucide-react";
import type { ReactNode } from "react";

export function MobileShell({ children, title = "Hajj Guide AI" }: { children: ReactNode; title?: string }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <header className="safe-top sticky top-0 z-30 flex items-center justify-between bg-gradient-primary px-4 py-3 text-primary-foreground shadow-elegant">
        <button className="rounded-md p-1.5 hover:bg-white/10" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
        <div className="h-7 w-7 rounded-full bg-white/20 text-center text-xs leading-7">🕋</div>
      </header>

      <main className="flex-1 overflow-y-auto pb-24">{children}</main>

      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items: Array<{ to: "/" | "/translate" | "/scan" | "/info"; label: string; icon: typeof Home; primary?: boolean }> = [
    { to: "/", label: "Home", icon: Home },
    { to: "/translate", label: "Translate", icon: Languages },
    { to: "/scan", label: "Scan", icon: ScanLine, primary: true },
    { to: "/info", label: "Info", icon: Info },
  ];

  return (
    <nav className="safe-bottom fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur">
      <ul className="grid grid-cols-4">
        {items.map(({ to, label, icon: Icon, primary }) => {
          const active = path === to;
          return (
            <li key={to} className="flex justify-center">
              <Link
                to={to}
                className={[
                  "flex flex-col items-center gap-0.5 px-2 py-2 text-[11px] font-medium transition-colors",
                  active ? "text-primary" : "text-muted-foreground",
                ].join(" ")}
              >
                <span
                  className={[
                    "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                    primary
                      ? "bg-gradient-primary text-primary-foreground shadow-elegant -mt-6 h-12 w-12 border-4 border-background"
                      : active
                        ? "bg-accent"
                        : "",
                  ].join(" ")}
                >
                  <Icon className={primary ? "h-6 w-6" : "h-5 w-5"} />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
