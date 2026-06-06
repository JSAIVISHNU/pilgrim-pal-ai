import * as React from "react";
import { useRouter, isRedirect } from "@tanstack/react-router";
import { T as TSS_SERVER_FUNCTION, g as getServerFnById, a as createServerFn } from "./server-CYvTr6Bj.js";
import { z } from "zod";
function useServerFn(serverFn) {
  const router = useRouter();
  return React.useCallback(async (...args) => {
    try {
      const res = await serverFn(...args);
      if (isRedirect(res)) throw res;
      return res;
    } catch (err) {
      if (isRedirect(err)) {
        err.options._fromLocation = router.stores.location.get();
        return router.navigate(router.resolveRedirect(err).options);
      }
      throw err;
    }
  }, [router, serverFn]);
}
const LANGUAGES = [
  { code: "ar", name: "Arabic", native: "العربية", bcp47: "ar-SA", rtl: true },
  { code: "en", name: "English", native: "English", bcp47: "en-US" },
  { code: "ur", name: "Urdu", native: "اردو", bcp47: "ur-PK", rtl: true },
  { code: "hi", name: "Hindi", native: "हिन्दी", bcp47: "hi-IN" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia", bcp47: "id-ID" },
  { code: "ms", name: "Malay", native: "Bahasa Melayu", bcp47: "ms-MY" },
  { code: "tr", name: "Turkish", native: "Türkçe", bcp47: "tr-TR" },
  { code: "fa", name: "Persian", native: "فارسی", bcp47: "fa-IR", rtl: true },
  { code: "bn", name: "Bengali", native: "বাংলা", bcp47: "bn-BD" },
  { code: "fr", name: "French", native: "Français", bcp47: "fr-FR" },
  { code: "es", name: "Spanish", native: "Español", bcp47: "es-ES" },
  { code: "tl", name: "Tagalog", native: "Tagalog", bcp47: "tl-PH" },
  { code: "sw", name: "Swahili", native: "Kiswahili", bcp47: "sw-KE" },
  { code: "ru", name: "Russian", native: "Русский", bcp47: "ru-RU" },
  { code: "zh", name: "Chinese", native: "中文", bcp47: "zh-CN" }
];
function getLang(code) {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const translateText = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  text: z.string().min(1).max(5e3),
  from: z.string().min(2).max(40),
  to: z.string().min(2).max(40)
})).handler(createSsrRpc("923a5261ae4ef344d627d5738bf40c7cf9d0d2df09dff176b88978a9a856c370"));
const translateImage = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  imageDataUrl: z.string().min(20),
  to: z.string().min(2).max(40)
})).handler(createSsrRpc("0a930c94c13eff8589bc6dc2dedf5ad1c61bb2f8d3d648c321da097fcef1dd70"));
function speak(text, bcp47) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = bcp47;
  utter.rate = 0.95;
  const voices = window.speechSynthesis.getVoices();
  const match = voices.find((v) => v.lang.toLowerCase().startsWith(bcp47.toLowerCase().slice(0, 2)));
  if (match) utter.voice = match;
  window.speechSynthesis.speak(utter);
}
function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
function startRecognition(opts) {
  if (typeof window === "undefined") return null;
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    opts.onError?.("Voice input not supported on this browser. Try Chrome on Android.");
    return null;
  }
  const rec = new SR();
  rec.lang = opts.lang;
  rec.continuous = false;
  rec.interimResults = true;
  rec.onresult = (e) => {
    let txt = "";
    let isFinal = false;
    for (let i = e.resultIndex; i < e.results.length; i++) {
      txt += e.results[i][0].transcript;
      if (e.results[i].isFinal) isFinal = true;
    }
    opts.onResult(txt, isFinal);
  };
  rec.onerror = (e) => opts.onError?.(e.error || "Recognition error");
  rec.onend = () => opts.onEnd?.();
  rec.start();
  return rec;
}
export {
  LANGUAGES as L,
  speak as a,
  startRecognition as b,
  translateImage as c,
  getLang as g,
  stopSpeaking as s,
  translateText as t,
  useServerFn as u
};
