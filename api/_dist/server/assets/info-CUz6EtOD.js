import { jsx, jsxs } from "react/jsx-runtime";
import { M as MobileShell } from "./MobileShell-Dspc-g_Y.js";
import { Search, BookOpen, Siren, Bus, Sun, Luggage, ShieldAlert, Wifi, Phone } from "lucide-react";
import "@tanstack/react-router";
function InfoPage() {
  return /* @__PURE__ */ jsx(MobileShell, { title: "Info & Announcements", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-foreground", children: "Official Announcements" }),
    /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 rounded-2xl bg-card px-3 py-2.5 shadow-card", children: [
      /* @__PURE__ */ jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsx("input", { placeholder: "Search guides or instructions…", className: "w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "overflow-hidden rounded-2xl bg-card shadow-card", children: [
      /* @__PURE__ */ jsx("div", { className: "h-28 bg-gradient-hero relative", children: /* @__PURE__ */ jsx("span", { className: "absolute left-3 top-3 rounded-full bg-destructive px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground", children: "Urgent" }) }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-base font-semibold", children: "Essential Health & Safety 2026" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Protect yourself and fellow pilgrims. Official guidelines for heat mitigation, hydration, and crowd safety." })
      ] })
    ] }),
    /* @__PURE__ */ jsx(InfoCard, { icon: /* @__PURE__ */ jsx(BookOpen, { className: "h-5 w-5" }), tag: "Rituals", tagColor: "text-primary", title: "Step-by-Step Umrah", body: "A verified chronological guide through Tawaf, Sa'i, and Halq with recommended supplications.", cta: "Read Guide →" }),
    /* @__PURE__ */ jsx(InfoCard, { icon: /* @__PURE__ */ jsx(Siren, { className: "h-5 w-5" }), tag: "Emergency", tagColor: "text-destructive", title: "Emergency Contacts", body: "Quick-dial links for Medical Services, Civil Defense, and Lost & Found centers across the Holy Sites.", cta: "Open Contacts ↗" }),
    /* @__PURE__ */ jsx(InfoCard, { icon: /* @__PURE__ */ jsx(Bus, { className: "h-5 w-5" }), tag: "Logistics", tagColor: "text-primary", title: "Shuttle Schedule", body: "Live updates for the Al-Haramain train and bus frequency between residential areas and the Grand Mosque." }),
    /* @__PURE__ */ jsx(InfoCard, { icon: /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }), tag: "Weather Advisory", tagColor: "text-warning", title: "Extreme Heat Expected", body: "Peak temperatures above 45°C. Avoid outdoor movement between 11 AM and 4 PM." }),
    /* @__PURE__ */ jsx(InfoCard, { icon: /* @__PURE__ */ jsx(Luggage, { className: "h-5 w-5" }), tag: "Baggage", tagColor: "text-primary", title: "Baggage Limits", body: "Updated dimensions for cabin luggage and prohibitions for items inside the Haram boundary." }),
    /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
      /* @__PURE__ */ jsxs("h3", { className: "mb-2 flex items-center gap-2 text-sm font-semibold text-foreground", children: [
        /* @__PURE__ */ jsx(ShieldAlert, { className: "h-4 w-4 text-primary" }),
        " Quick Reference"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsx(QuickRow, { icon: /* @__PURE__ */ jsx(Wifi, { className: "h-4 w-4" }), title: "Free Public Wi-Fi Access", hint: "Connect to 'Hajj-Free-WiFi' at main stations." }),
        /* @__PURE__ */ jsx(QuickRow, { icon: /* @__PURE__ */ jsx(Phone, { className: "h-4 w-4" }), title: "Emergency Hotline 911", hint: "Available 24/7 in multiple languages." })
      ] })
    ] })
  ] }) });
}
function InfoCard({
  icon,
  tag,
  tagColor,
  title,
  body,
  cta
}) {
  return /* @__PURE__ */ jsxs("article", { className: "rounded-2xl bg-card p-4 shadow-card", children: [
    /* @__PURE__ */ jsxs("div", { className: `mb-1.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${tagColor}`, children: [
      icon,
      tag
    ] }),
    /* @__PURE__ */ jsx("h4", { className: "text-base font-semibold text-foreground", children: title }),
    /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: body }),
    cta && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs font-semibold text-primary", children: cta })
  ] });
}
function QuickRow({
  icon,
  title,
  hint
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-card p-3 shadow-card", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-primary", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-[11px] text-muted-foreground", children: hint })
    ] })
  ] });
}
export {
  InfoPage as component
};
