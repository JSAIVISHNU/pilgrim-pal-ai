import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { M as MobileShell } from "./MobileShell-Dspc-g_Y.js";
import { HeartPulse, MapPin, Languages, ScanLine, BookOpen, Volume2 } from "lucide-react";
function Home() {
  return /* @__PURE__ */ jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative h-44 overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-cover bg-center", style: {
        backgroundImage: "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=900&q=70')"
      } }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-hero" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex h-full flex-col justify-end p-4 text-primary-foreground", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-2 inline-flex w-fit items-center gap-1.5 rounded-full bg-warning/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-warning-foreground", children: [
          /* @__PURE__ */ jsx(HeartPulse, { className: "h-3 w-3" }),
          " Announcement"
        ] }),
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Dhuhr Prayer in 15 minutes" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs opacity-90", children: "Find a safe location near Al-Masjid Al-Nabawi." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-4 shadow-card", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "As-salamu alaykum," }),
        /* @__PURE__ */ jsx("p", { className: "text-lg font-semibold text-foreground", children: "Abdullah Ahmed" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground", children: [
          /* @__PURE__ */ jsx(MapPin, { className: "h-3.5 w-3.5" }),
          " Al Masjid an Nabawi"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/translate", className: "flex flex-col items-start gap-2 rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx(Languages, { className: "h-6 w-6" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold", children: "Translate" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] opacity-90", children: "Text & voice" })
        ] }),
        /* @__PURE__ */ jsxs(Link, { to: "/scan", className: "flex flex-col items-start gap-2 rounded-2xl bg-card p-4 shadow-card active:scale-[0.98]", children: [
          /* @__PURE__ */ jsx(ScanLine, { className: "h-6 w-6 text-primary" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-foreground", children: "Scan Sign" }),
          /* @__PURE__ */ jsx("span", { className: "text-[11px] text-muted-foreground", children: "Camera or upload" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/info", className: "flex items-center gap-3 rounded-2xl bg-card p-4 shadow-card active:scale-[0.99]", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary", children: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: "Pilgrim Guide" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Rituals, safety, logistics" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2 flex items-center justify-between px-1", children: /* @__PURE__ */ jsx("h3", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Recent Translations" }) }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: [{
          en: "Where is the nearest exit?",
          ar: "أين أقرب مخرج؟"
        }, {
          en: "Please direct me to the clinic",
          ar: "من فضلك أرشدني إلى العيادة"
        }].map((r) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between gap-3 rounded-xl bg-card p-3 shadow-card", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "truncate text-sm text-foreground", children: r.en }),
            /* @__PURE__ */ jsx("p", { dir: "rtl", className: "truncate text-xs text-muted-foreground", children: r.ar })
          ] }),
          /* @__PURE__ */ jsx(Volume2, { className: "h-4 w-4 text-primary" })
        ] }, r.en)) })
      ] })
    ] })
  ] });
}
export {
  Home as component
};
