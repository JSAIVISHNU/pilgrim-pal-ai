import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Languages, ScanLine, Info, Menu, X, Settings, HelpCircle, Info as InfoIcon, LogOut, User, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";

export function MobileShell({ children, title = "Hajj Guide AI" }: { children: ReactNode; title?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "User Profile", href: "/profile", icon: User },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help & Support", href: "/help", icon: HelpCircle },
    { label: "About", href: "/about", icon: InfoIcon },
  ];

  // User data - replace with actual user data from context/state
  const user = {
    name: "Abdullah Ahmed",
    initials: "AA",
    email: "abdullah@example.com",
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-background">
      <header className="safe-top sticky top-0 z-30 flex items-center justify-between bg-gradient-primary px-4 py-3 text-primary-foreground shadow-elegant">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="rounded-md p-1.5 hover:bg-white/10 transition-colors" 
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
        
        {/* User Avatar Profile Button */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 hover:bg-white/30 transition-colors active:scale-[0.95]"
            aria-label="Profile menu"
          >
            <div className="h-6 w-6 rounded-full bg-white/40 flex items-center justify-center text-xs font-semibold text-primary-foreground">
              {user.initials}
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-card shadow-lg border border-border z-50 overflow-hidden">
              {/* User Info Header */}
              <div className="border-b border-border p-4 bg-accent/5">
                <p className="text-sm font-semibold text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>

              {/* Profile Menu Items */}
              <ul className="py-2">
                <li>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Navigate to profile
                      window.location.href = "/profile";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors active:bg-accent/80"
                  >
                    <User className="h-4 w-4" />
                    <span>View Profile</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      // Navigate to settings
                      window.location.href = "/settings";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent transition-colors active:bg-accent/80"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </button>
                </li>
              </ul>

              {/* Logout Button */}
              <div className="border-t border-border p-2">
                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    // Logout and redirect to login
                    window.location.href = "/login";
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors rounded-md active:scale-[0.98]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Navigation Drawer Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Navigation Drawer */}
      <nav
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-card shadow-lg transition-transform duration-300 ease-in-out safe-top ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer Header */}
          <div className="border-b border-border p-4 mt-14">
            <p className="text-sm text-muted-foreground">As-salamu alaykum,</p>
            <p className="text-lg font-semibold text-foreground">Abdullah Ahmed</p>
          </div>

          {/* Menu Items */}
          <ul className="flex-1 space-y-1 overflow-y-auto p-3">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    to={item.href as any}
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors active:bg-accent/80"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Logout Button */}
          <div className="border-t border-border p-3">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                // TODO: Implement logout logic
              }}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-destructive px-4 py-3 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 transition-colors active:scale-[0.98]"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

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
