import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { translateImage } from "@/lib/translate.functions";
import { LANGUAGES, getLang } from "@/lib/languages";
import { speak } from "@/lib/speech";
import { Camera, Upload, Volume2, Loader2, ImageIcon } from "lucide-react";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Scan & Translate — Hajj Guide AI" },
      { name: "description", content: "Snap a photo of any sign or document and get an instant translation." },
    ],
  }),
  component: ScanPage,
});

function ScanPage() {
  const translateImg = useServerFn(translateImage);
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [to, setTo] = useState("en");
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [original, setOriginal] = useState("");
  const [translated, setTranslated] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      runTranslate(dataUrl);
    };
    reader.readAsDataURL(f);
  }

  async function runTranslate(dataUrl: string) {
    setLoading(true);
    setError(null);
    setOriginal("");
    setTranslated("");
    try {
      const r = await translateImg({ data: { imageDataUrl: dataUrl, to: getLang(to).name } });
      setOriginal(r.original || "");
      setTranslated(r.translation || "");
    } catch (e: any) {
      setError(e?.message ?? "Failed to read image");
    } finally {
      setLoading(false);
    }
  }

  const toLang = getLang(to);

  return (
    <MobileShell title="Scan & Translate">
      <div className="space-y-4 p-4">
        <div className="rounded-2xl bg-card p-3 shadow-card">
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Translate to
          </label>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground outline-none focus:ring-2 focus:ring-ring"
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.name} — {l.native}
              </option>
            ))}
          </select>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-border bg-muted">
          {preview ? (
            <img src={preview} alt="Scanned" className="h-64 w-full object-cover" />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="mb-2 h-10 w-10 opacity-50" />
              <p className="text-sm">Take or upload a photo of a sign</p>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
              <div className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-elegant">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm font-medium">Reading sign…</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => cameraRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-primary py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant active:scale-[0.98]"
          >
            <Camera className="h-5 w-5" /> Camera
          </button>
          <button
            onClick={() => uploadRef.current?.click()}
            className="flex items-center justify-center gap-2 rounded-2xl bg-card py-3.5 text-sm font-semibold text-foreground shadow-card active:scale-[0.98]"
          >
            <Upload className="h-5 w-5 text-primary" /> Upload
          </button>
        </div>

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={onFile}
        />
        <input ref={uploadRef} type="file" accept="image/*" className="hidden" onChange={onFile} />

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        {original && (
          <div className="rounded-2xl bg-card p-3 shadow-card">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Detected text
            </p>
            <p className="text-sm text-foreground whitespace-pre-wrap">{original}</p>
          </div>
        )}

        {translated && (
          <div className="rounded-2xl bg-gradient-primary p-4 text-primary-foreground shadow-elegant">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider opacity-80">
                {toLang.name}
              </span>
              <button
                onClick={() => speak(translated, toLang.bcp47)}
                className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold active:scale-95"
              >
                <Volume2 className="h-4 w-4" /> Read aloud
              </button>
            </div>
            <p dir={toLang.rtl ? "rtl" : "ltr"} className="text-lg font-semibold leading-relaxed">
              {translated}
            </p>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
