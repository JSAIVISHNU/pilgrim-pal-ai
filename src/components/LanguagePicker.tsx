import { LANGUAGES } from "@/lib/languages";
import { ArrowLeftRight } from "lucide-react";

type Props = {
  from: string;
  to: string;
  onChangeFrom: (v: string) => void;
  onChangeTo: (v: string) => void;
  onSwap: () => void;
};

export function LanguagePicker({ from, to, onChangeFrom, onChangeTo, onSwap }: Props) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-card">
      <select
        value={from}
        onChange={(e) => onChangeFrom(e.target.value)}
        className="flex-1 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground outline-none focus:ring-2 focus:ring-ring"
        aria-label="Source language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
      <button
        onClick={onSwap}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant active:scale-95"
        aria-label="Swap languages"
      >
        <ArrowLeftRight className="h-4 w-4" />
      </button>
      <select
        value={to}
        onChange={(e) => onChangeTo(e.target.value)}
        className="flex-1 rounded-xl bg-secondary px-3 py-2.5 text-sm font-medium text-secondary-foreground outline-none focus:ring-2 focus:ring-ring"
        aria-label="Target language"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
