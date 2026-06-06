import { jsx, jsxs } from "react/jsx-runtime";
import { u as useServerFn, g as getLang, L as LANGUAGES, a as speak, c as translateImage } from "./speech-cEk4UQX-.js";
import { useRef, useState } from "react";
import { M as MobileShell } from "./MobileShell-Dspc-g_Y.js";
import { ImageIcon, Loader2, Camera, Upload, Volume2 } from "lucide-react";
import "@tanstack/react-router";
import "./server-CYvTr6Bj.js";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "@tanstack/react-router/ssr/server";
import "zod";
function ScanPage() {
  const translateImg = useServerFn(translateImage);
  const cameraRef = useRef(null);
  const uploadRef = useRef(null);
  const [to, setTo] = useState("en");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [error, setError] = useState(null);
  function onFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setPreview(dataUrl);
      runTranslate(dataUrl);
    };
    reader.readAsDataURL(f);
  }
  async function runTranslate(dataUrl) {
    setLoading(true);
    setError(null);
    setOriginal("");
    setTranslated("");
    try {
      const r = await translateImg({
        data: {
          imageDataUrl: dataUrl,
          to: getLang(to).name
        }
      });
      setOriginal(r.original || "");
      setTranslated(r.translation || "");
    } catch (e) {
      setError(e?.message ?? "Failed to read image");
    } finally {
      setLoading(false);
    }
  }
  const toLang = getLang(to);
  return /* @__PURE__ */ jsx(MobileShell, { title: "Scan & Translate", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-3 shadow-card", children: [
      /* @__PURE__ */ jsx("label", { className: "mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Translate to" }),
      /* @__PURE__ */ jsx("select", { value: to, onChange: (e) => setTo(e.target.value), className: "w-full rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground outline-none focus:ring-2 focus:ring-ring", children: LANGUAGES.map((l) => /* @__PURE__ */ jsxs("option", { value: l.code, children: [
        l.name,
        " — ",
        l.native
      ] }, l.code)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden rounded-2xl border border-border bg-muted", children: [
      preview ? /* @__PURE__ */ jsx("img", { src: preview, alt: "Scanned", className: "h-64 w-full object-cover" }) : /* @__PURE__ */ jsxs("div", { className: "flex h-64 flex-col items-center justify-center text-muted-foreground", children: [
        /* @__PURE__ */ jsx(ImageIcon, { className: "mb-2 h-10 w-10 opacity-50" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Take or upload a photo of a sign" })
      ] }),
      loading && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-elegant", children: [
        /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" }),
        /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", children: "Reading sign…" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => cameraRef.current?.click(), className: "flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant active:scale-[0.98]", children: [
        /* @__PURE__ */ jsx(Camera, { className: "h-5 w-5" }),
        " Camera"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: () => uploadRef.current?.click(), className: "flex items-center justify-center gap-2 rounded-2xl bg-card py-3.5 text-sm font-semibold text-foreground shadow-card active:scale-[0.98]", children: [
        /* @__PURE__ */ jsx(Upload, { className: "h-5 w-5 text-primary" }),
        " Upload"
      ] })
    ] }),
    /* @__PURE__ */ jsx("input", { ref: cameraRef, type: "file", accept: "image/*", capture: "environment", className: "hidden", onChange: onFile }),
    /* @__PURE__ */ jsx("input", { ref: uploadRef, type: "file", accept: "image/*", className: "hidden", onChange: onFile }),
    error && /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: error }),
    original && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-3 shadow-card", children: [
      /* @__PURE__ */ jsx("p", { className: "mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: "Detected text" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground whitespace-pre-wrap", children: original })
    ] }),
    translated && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider opacity-80", children: toLang.name }),
        /* @__PURE__ */ jsxs("button", { onClick: () => speak(translated, toLang.bcp47), className: "flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold active:scale-95", children: [
          /* @__PURE__ */ jsx(Volume2, { className: "h-4 w-4" }),
          " Read aloud"
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { dir: toLang.rtl ? "rtl" : "ltr", className: "text-lg font-semibold leading-relaxed", children: translated })
    ] })
  ] }) });
}
export {
  ScanPage as component
};
