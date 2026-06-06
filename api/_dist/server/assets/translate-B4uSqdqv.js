import { jsxs, jsx } from "react/jsx-runtime";
import { L as LANGUAGES, u as useServerFn, s as stopSpeaking, g as getLang, a as speak, b as startRecognition, t as translateText } from "./speech-cEk4UQX-.js";
import { useState, useRef, useEffect } from "react";
import { M as MobileShell } from "./MobileShell-Dspc-g_Y.js";
import { ArrowLeftRight, X, Loader2, Copy, Volume2, Square, Mic } from "lucide-react";
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
function LanguagePicker({ from, to, onChangeFrom, onChangeTo, onSwap }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-card", children: [
    /* @__PURE__ */ jsx(
      "select",
      {
        value: from,
        onChange: (e) => onChangeFrom(e.target.value),
        className: "flex-1 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground outline-none focus:ring-2 focus:ring-ring",
        "aria-label": "Source language",
        children: LANGUAGES.map((l) => /* @__PURE__ */ jsx("option", { value: l.code, children: l.name }, l.code))
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onSwap,
        className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant active:scale-95",
        "aria-label": "Swap languages",
        children: /* @__PURE__ */ jsx(ArrowLeftRight, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsx(
      "select",
      {
        value: to,
        onChange: (e) => onChangeTo(e.target.value),
        className: "flex-1 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground outline-none focus:ring-2 focus:ring-ring",
        "aria-label": "Target language",
        children: LANGUAGES.map((l) => /* @__PURE__ */ jsx("option", { value: l.code, children: l.name }, l.code))
      }
    )
  ] });
}
function TranslatePage() {
  const translateFn = useServerFn(translateText);
  const [from, setFrom] = useState("ar");
  const [to, setTo] = useState("en");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [listening, setListening] = useState(false);
  const recogRef = useRef(null);
  useEffect(() => () => stopSpeaking(), []);
  async function handleTranslate(input) {
    const value = (input ?? text).trim();
    if (!value) return;
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const r = await translateFn({
        data: {
          text: value,
          from: getLang(from).name,
          to: getLang(to).name
        }
      });
      setResult(r.translation);
    } catch (e) {
      setError(e?.message ?? "Translation failed");
    } finally {
      setLoading(false);
    }
  }
  function swap() {
    setFrom(to);
    setTo(from);
    setText(result);
    setResult(text);
  }
  function toggleMic() {
    if (listening) {
      recogRef.current?.stop?.();
      setListening(false);
      return;
    }
    setError(null);
    const rec = startRecognition({
      lang: getLang(from).bcp47,
      onResult: (t, isFinal) => {
        setText(t);
        if (isFinal) {
          setListening(false);
          handleTranslate(t);
        }
      },
      onError: (err) => {
        setError(err);
        setListening(false);
      },
      onEnd: () => setListening(false)
    });
    if (rec) {
      recogRef.current = rec;
      setListening(true);
    }
  }
  const toLang = getLang(to);
  const fromLang = getLang(from);
  return /* @__PURE__ */ jsx(MobileShell, { title: "Translate", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 p-4", children: [
    /* @__PURE__ */ jsx(LanguagePicker, { from, to, onChangeFrom: setFrom, onChangeTo: setTo, onSwap: swap }),
    /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-3 shadow-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: fromLang.name }),
        text && /* @__PURE__ */ jsx("button", { onClick: () => {
          setText("");
          setResult("");
        }, className: "text-muted-foreground hover:text-foreground", "aria-label": "Clear", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), dir: fromLang.rtl ? "rtl" : "ltr", placeholder: `Enter text in ${fromLang.name}, e.g. "Where is the nearest exit?"`, rows: 4, className: "w-full resize-none bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none" })
    ] }),
    /* @__PURE__ */ jsxs("button", { onClick: () => handleTranslate(), disabled: loading || !text.trim(), className: "flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant active:scale-[0.99] disabled:opacity-60", children: [
      loading ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : null,
      loading ? "Translating…" : "Translate"
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive", children: error }),
    result && /* @__PURE__ */ jsxs("div", { className: "rounded-2xl bg-card p-3 shadow-card", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground", children: toLang.name }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => navigator.clipboard?.writeText(result), className: "text-muted-foreground hover:text-foreground", "aria-label": "Copy", children: /* @__PURE__ */ jsx(Copy, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsx("button", { onClick: () => speak(result, toLang.bcp47), className: "text-primary hover:text-primary-glow", "aria-label": "Speak", children: /* @__PURE__ */ jsx(Volume2, { className: "h-5 w-5" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("p", { dir: toLang.rtl ? "rtl" : "ltr", className: "text-lg font-medium text-foreground", children: result })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: ["Masjid Directions", "Medical Help", "Halal Food", "Hotel"].map((p) => /* @__PURE__ */ jsx("button", { onClick: () => {
      setText(p);
      handleTranslate(p);
    }, className: "rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground active:scale-95", children: p }, p)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center pt-4", children: [
      /* @__PURE__ */ jsx("button", { onClick: toggleMic, className: ["flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground shadow-elegant transition-all active:scale-95", listening ? "bg-destructive animate-pulse" : "bg-gradient-primary"].join(" "), "aria-label": listening ? "Stop listening" : "Tap to speak", children: listening ? /* @__PURE__ */ jsx(Square, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Mic, { className: "h-7 w-7" }) }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: listening ? "Listening… tap to stop" : `Tap to speak in ${fromLang.name}` })
    ] })
  ] }) });
}
export {
  TranslatePage as component
};
