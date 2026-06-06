import { jsxs, jsx } from "react/jsx-runtime";
import { useRouterState, Link } from "@tanstack/react-router";
import { Menu, Home, Languages, ScanLine, Info } from "lucide-react";
function MobileShell({ children, title = "Hajj Guide AI" }) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto flex min-h-screen w-full max-w-md flex-col bg-background", children: [
    /* @__PURE__ */ jsxs("header", { className: "safe-top sticky top-0 z-30 flex items-center justify-between bg-gradient-primary px-4 py-3 text-primary-foreground shadow-elegant", children: [
      /* @__PURE__ */ jsx("button", { className: "rounded-md p-1.5 hover:bg-white/10", "aria-label": "Menu", children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-base font-semibold tracking-tight", children: title }),
      /* @__PURE__ */ jsx("div", { className: "h-7 w-7 rounded-full bg-white/20 text-center text-xs leading-7", children: "🕋" })
    ] }),
    /* @__PURE__ */ jsx("main", { className: "flex-1 overflow-y-auto pb-24", children }),
    /* @__PURE__ */ jsx(BottomNav, {})
  ] });
}
function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/", label: "Home", icon: Home },
    { to: "/translate", label: "Translate", icon: Languages },
    { to: "/scan", label: "Scan", icon: ScanLine, primary: true },
    { to: "/info", label: "Info", icon: Info }
  ];
  return /* @__PURE__ */ jsx("nav", { className: "safe-bottom fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-border bg-card/95 backdrop-blur", children: /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-4", children: items.map(({ to, label, icon: Icon, primary }) => {
    const active = path === to;
    return /* @__PURE__ */ jsx("li", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to,
        className: [
          "flex flex-col items-center gap-0.5 px-2 py-2 text-[11px] font-medium transition-colors",
          active ? "text-primary" : "text-muted-foreground"
        ].join(" "),
        children: [
          /* @__PURE__ */ jsx(
            "span",
            {
              className: [
                "flex h-10 w-10 items-center justify-center rounded-full transition-all",
                primary ? "bg-gradient-primary text-primary-foreground shadow-elegant -mt-6 h-12 w-12 border-4 border-background" : active ? "bg-accent" : ""
              ].join(" "),
              children: /* @__PURE__ */ jsx(Icon, { className: primary ? "h-6 w-6" : "h-5 w-5" })
            }
          ),
          label
        ]
      }
    ) }, to);
  }) }) });
}
export {
  MobileShell as M
};
