import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { Languages, ScanLine, HeartPulse, MapPin, BookOpen, Volume2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hajj Guide AI — Translate & Explore" },
      { name: "description", content: "AI-powered translation and guidance for Hajj and Umrah pilgrims." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <MobileShell>
      <section className="relative h-44 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=70')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="relative z-10 flex h-full flex-col justify-end p-4 text-primary-foreground">
          <div className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-warning/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-warning-foreground">
            <HeartPulse className="h-3 w-3" /> Announcement
          </div>
          <h2 className="text-lg font-bold">Dhuhr Prayer in 15 minutes</h2>
          <p className="text-xs opacity-90">Find a safe location near Al-Masjid Al-Nabawi.</p>
        </div>
      </section>

      <div className="space-y-4 p-4">
        <div className="rounded-2xl bg-card p-4 shadow-card">
          <p className="text-sm text-muted-foreground">As-salamu alaykum,</p>
          <p className="text-lg font-semibold text-foreground">Abdullah Ahmed</p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
            <MapPin className="h-3.5 w-3.5" /> Al Masjid an Nabawi
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/translate"
            className="flex flex-col items-start gap-2 rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant active:scale-[0.98]"
          >
            <Languages className="h-6 w-6" />
            <span className="text-sm font-semibold">Translate</span>
            <span className="text-[11px] opacity-90">Text & voice</span>
          </Link>
          <Link
            to="/scan"
            className="flex flex-col items-start gap-2 rounded-2xl bg-card p-4 shadow-card active:scale-[0.98]"
          >
            <ScanLine className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold text-foreground">Scan Sign</span>
            <span className="text-[11px] text-muted-foreground">Camera or upload</span>
          </Link>
        </div>

        <Link
          to="/info"
          className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card active:scale-[0.99]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Pilgrim Guide</p>
            <p className="text-xs text-muted-foreground">Rituals, safety, logistics</p>
          </div>
        </Link>

        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Translations
            </h3>
          </div>
          <ul className="space-y-2">
            {[
              { en: "Where is the nearest exit?", ar: "أين أقرب مخرج؟" },
              { en: "Please direct me to the clinic", ar: "من فضلك أرشدني إلى العيادة" },
            ].map((r) => (
              <li
                key={r.en}
                className="flex items-center justify-between gap-3 rounded-xl bg-card p-3 shadow-card"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-foreground">{r.en}</p>
                  <p dir="rtl" className="truncate text-xs text-muted-foreground">
                    {r.ar}
                  </p>
                </div>
                <Volume2 className="h-4 w-4 text-primary" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MobileShell>
  );
}
