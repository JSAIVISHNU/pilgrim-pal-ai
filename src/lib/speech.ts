// Browser Web Speech API helpers (works on Chrome/Edge/Safari mobile)

export function speak(text: string, bcp47: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = bcp47;
  utter.rate = 0.95;
  // pick a voice that matches the language if available
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find((v) => v.lang.toLowerCase().startsWith(bcp47.toLowerCase().slice(0, 2)));
  if (match) utter.voice = match;
  window.speechSynthesis.speak(utter);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

type RecogOpts = {
  lang: string;
  onResult: (text: string, isFinal: boolean) => void;
  onError?: (err: string) => void;
  onEnd?: () => void;
};

export function startRecognition(opts: RecogOpts) {
  if (typeof window === "undefined") return null;
  const SR =
    (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;
  if (!SR) {
    opts.onError?.("Voice input not supported on this browser. Try Chrome on Android.");
    return null;
  }
  const rec = new SR();
  rec.lang = opts.lang;
  rec.continuous = false;
  rec.interimResults = true;
  rec.onresult = (e: any) => {
    let txt = "";
    let isFinal = false;
    for (let i = e.resultIndex; i < e.results.length; i++) {
      txt += e.results[i][0].transcript;
      if (e.results[i].isFinal) isFinal = true;
    }
    opts.onResult(txt, isFinal);
  };
  rec.onerror = (e: any) => opts.onError?.(e.error || "Recognition error");
  rec.onend = () => opts.onEnd?.();
  rec.start();
  return rec;
}
