import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, useRef, useEffect } from "react";
import { MobileShell } from "@/components/MobileShell";
import { LanguagePicker } from "@/components/LanguagePicker";
import { translateText } from "@/lib/translate.functions";
import { getLang } from "@/lib/languages";
import { speak, stopSpeaking, startRecognition } from "@/lib/speech";
import { Mic, Volume2, Loader2, X, Copy, Square } from "lucide-react";

export const Route = createFileRoute("/translate")({
  head: () => ({
    meta: [
      { title: "Translate — Hajj Guide AI" },
      { name: "description", content: "Translate text and voice between Arabic and your language." },
    ],
  }),
  component: TranslatePage,
});

function TranslatePage() {
  const translateFn = useServerFn(translateText);
  const [from, setFrom] = useState("ar");
  const [to, setTo] = useState("en");
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<any>(null);

  useEffect(() => () => stopSpeaking(), []);

  async function handleTranslate(input?: string) {
    const value = (input ?? text).trim();
    if (!value) return;
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const r = await translateFn({
        data: { text: value, from: getLang(from).name, to: getLang(to).name },
      });
      setResult(r.translation);
    } catch (e: any) {
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
      onEnd: () => setListening(false),
    });
    if (rec) {
      recogRef.current = rec;
      setListening(true);
    }
  }

  const toLang = getLang(to);
  const fromLang = getLang(from);

  return (
    <MobileShell title="Translate">
      <div className="space-y-4 p-4">
        <LanguagePicker from={from} to={to} onChangeFrom={setFrom} onChangeTo={setTo} onSwap={swap} />

        <div className="rounded-2xl bg-card p-3 shadow-card">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {fromLang.name}
            </span>
            {text && (
              <button
                onClick={() => {
                  setText("");
                  setResult("");
                }}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            dir={fromLang.rtl ? "rtl" : "ltr"}
            placeholder={`Enter text in ${fromLang.name}, e.g. "Where is the nearest exit?"`}
            rows={4}
            className="w-full resize-none bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          />
        </div>

        <button
          onClick={() => handleTranslate()}
          disabled={loading || !text.trim()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {loading ? "Translating…" : "Translate"}
        </button>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {result && (
          <div className="rounded-2xl bg-card p-3 shadow-card">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {toLang.name}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigator.clipboard?.writeText(result)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Copy"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={() => speak(result, toLang.bcp47)}
                  className="text-primary hover:text-primary-glow"
                  aria-label="Speak"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <p dir={toLang.rtl ? "rtl" : "ltr"} className="text-lg font-medium text-foreground">
              {result}
            </p>
          </div>
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {["Masjid Directions", "Medical Help", "Halal Food", "Hotel"].map((p) => (
            <button
              key={p}
              onClick={() => {
                setText(p);
                handleTranslate(p);
              }}
              className="rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-accent-foreground active:scale-95"
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center pt-4">
          <button
            onClick={toggleMic}
            className={[
              "flex h-16 w-16 items-center justify-center rounded-full text-primary-foreground shadow-elegant transition-all active:scale-95",
              listening ? "bg-destructive animate-pulse" : "bg-gradient-primary",
            ].join(" ")}
            aria-label={listening ? "Stop listening" : "Tap to speak"}
          >
            {listening ? <Square className="h-6 w-6" /> : <Mic className="h-7 w-7" />}
          </button>
          <p className="mt-2 text-xs text-muted-foreground">
            {listening ? "Listening… tap to stop" : `Tap to speak in ${fromLang.name}`}
          </p>
        </div>
      </div>
    </MobileShell>
  );
}
