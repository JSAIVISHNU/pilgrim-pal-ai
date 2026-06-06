import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import {
  Search,
  ShieldAlert,
  BookOpen,
  Siren,
  Bus,
  Sun,
  Luggage,
  Wifi,
  Phone,
} from "lucide-react";

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "Info & Announcements — Hajj Guide AI" },
      { name: "description", content: "Official announcements, safety guides, and pilgrim logistics." },
    ],
  }),
  component: InfoPage,
});

function InfoPage() {
  return (
    <MobileShell title="Info & Announcements">
      <div className="space-y-4 p-4">
        <h2 className="text-lg font-bold text-foreground">Official Announcements</h2>

        <label className="flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 shadow-card">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search guides or instructions…"
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
          />
        </label>

        <div className="overflow-hidden rounded-2xl bg-card shadow-card">
          <div className="h-28 bg-gradient-hero relative">
            <span className="absolute left-3 top-3 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
              Urgent
            </span>
          </div>
          <div className="p-4">
            <p className="text-base font-semibold">Essential Health & Safety 2026</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Protect yourself and fellow pilgrims. Official guidelines for heat mitigation, hydration, and crowd safety.
            </p>
          </div>
        </div>

        <InfoCard
          icon={<BookOpen className="h-5 w-5" />}
          tag="Rituals"
          tagColor="text-primary"
          title="Step-by-Step Umrah"
          body="A verified chronological guide through Tawaf, Sa'i, and Halq with recommended supplications."
          cta="Read Guide →"
        />

        <InfoCard
          icon={<Siren className="h-5 w-5" />}
          tag="Emergency"
          tagColor="text-destructive"
          title="Emergency Contacts"
          body="Quick-dial links for Medical Services, Civil Defense, and Lost & Found centers across the Holy Sites."
          cta="Open Contacts ↗"
        />

        <InfoCard
          icon={<Bus className="h-5 w-5" />}
          tag="Logistics"
          tagColor="text-primary"
          title="Shuttle Schedule"
          body="Live updates for the Al-Haramain train and bus frequency between residential areas and the Grand Mosque."
        />

        <InfoCard
          icon={<Sun className="h-5 w-5" />}
          tag="Weather Advisory"
          tagColor="text-warning"
          title="Extreme Heat Expected"
          body="Peak temperatures above 45°C. Avoid outdoor movement between 11 AM and 4 PM."
        />

        <InfoCard
          icon={<Luggage className="h-5 w-5" />}
          tag="Baggage"
          tagColor="text-primary"
          title="Baggage Limits"
          body="Updated dimensions for cabin luggage and prohibitions for items inside the Haram boundary."
        />

        <div className="pt-2">
          <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
            <ShieldAlert className="h-4 w-4 text-primary" /> Quick Reference
          </h3>
          <div className="space-y-2">
            <QuickRow icon={<Wifi className="h-4 w-4" />} title="Free Public Wi-Fi Access" hint="Connect to 'Hajj-Free-WiFi' at main stations." />
            <QuickRow icon={<Phone className="h-4 w-4" />} title="Emergency Hotline 911" hint="Available 24/7 in multiple languages." />
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

function InfoCard({
  icon,
  tag,
  tagColor,
  title,
  body,
  cta,
}: {
  icon: React.ReactNode;
  tag: string;
  tagColor: string;
  title: string;
  body: string;
  cta?: string;
}) {
  return (
    <article className="rounded-2xl bg-card p-4 shadow-card">
      <div className={`mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${tagColor}`}>
        {icon}
        {tag}
      </div>
      <h4 className="text-base font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-xs text-muted-foreground">{body}</p>
      {cta && <p className="mt-2 text-xs font-semibold text-primary">{cta}</p>}
    </article>
  );
}

function QuickRow({ icon, title, hint }: { icon: React.ReactNode; title: string; hint: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-card p-3 shadow-card">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
    </div>
  );
}
