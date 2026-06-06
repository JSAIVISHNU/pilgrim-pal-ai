export type Language = { code: string; name: string; native: string; bcp47: string; rtl?: boolean };

export const LANGUAGES: Language[] = [
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
  { code: "zh", name: "Chinese", native: "中文", bcp47: "zh-CN" },
];

export function getLang(code: string): Language {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}
