import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// MyMemory API - Free, no key needed, more reliable
const MYMEMORY_URL = "https://api.mymemory.translated.net/get";

// Language code mapping for MyMemory
const languageMap: Record<string, string> = {
  "Arabic": "ar",
  "English": "en",
  "Spanish": "es",
  "French": "fr",
  "German": "de",
  "Chinese": "zh",
  "Japanese": "ja",
  "Hindi": "hi",
  "Urdu": "ur",
  "Persian": "fa",
  "Turkish": "tr",
  "Indonesian": "id",
  "Malay": "ms",
  "Portuguese": "pt",
  "Russian": "ru",
  "Italian": "it",
  "Dutch": "nl",
  "Polish": "pl",
  "Swedish": "sv",
  "Korean": "ko",
};

// MyMemory Translation function
async function translateText_MyMemory(text: string, fromLang: string, toLang: string): Promise<string> {
  try {
    const fromCode = languageMap[fromLang] || fromLang.toLowerCase().substring(0, 2);
    const toCode = languageMap[toLang] || toLang.toLowerCase().substring(0, 2);

    const params = new URLSearchParams({
      q: text,
      langpair: `${fromCode}|${toCode}`,
    });

    const res = await fetch(`${MYMEMORY_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`MyMemory error: ${res.status}`);
    }

    const data = await res.json();
    
    if (data.responseStatus === 200) {
      return data.responseData.translatedText || "";
    } else if (data.responseStatus === 400) {
      throw new Error("Invalid language pair or text");
    } else {
      throw new Error(`API returned status: ${data.responseStatus}`);
    }
  } catch (error) {
    console.error("MyMemory translation failed:", error);
    throw new Error(`Translation failed: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

export const translateText = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      text: z.string().min(1).max(5000),
      from: z.string().min(2).max(40),
      to: z.string().min(2).max(40),
    })
  )
  .handler(async ({ data }) => {
    const translation = await translateText_MyMemory(data.text, data.from, data.to);
    return { translation: translation.trim() };
  });

export const translateImage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      imageDataUrl: z.string().min(20),
      to: z.string().min(2).max(40),
    })
  )
  .handler(async ({ data }) => {
    // Note: OCR needs to be implemented on client-side with Tesseract.js
    // This is a placeholder. See scan.tsx for client-side OCR implementation
    throw new Error("Image translation requires client-side OCR. Please see scan page for updated implementation.");
  });
