/**
 * OCR Utility using Tesseract.js
 * Extracts text from images without backend
 * Supports Arabic, English, and 100+ languages
 */

declare global {
  interface Window {
    Tesseract: any;
  }
}

// Load Tesseract.js library from CDN
function loadTesseractLibrary(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Tesseract) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5.0.4/dist/tesseract.min.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Tesseract.js"));
    document.head.appendChild(script);
  });
}

/**
 * Extract text from image using OCR
 * @param imageDataUrl - Base64 image data URL
 * @param language - Language code (e.g., 'ara', 'eng', 'spa')
 * @returns Extracted text
 */
export async function extractTextFromImage(
  imageDataUrl: string,
  language: string = "ara+eng" // Arabic + English by default
): Promise<string> {
  try {
    // Load Tesseract if not already loaded
    await loadTesseractLibrary();

    const { Tesseract } = window;
    const { recognize } = Tesseract;

    // Create progress callback
    const progressHandler = (progress: any) => {
      console.log(`OCR Progress: ${(progress.progress * 100).toFixed(0)}%`);
    };

    // Run OCR
    const result = await recognize(imageDataUrl, language, {
      logger: progressHandler,
    });

    return result.data.text || "";
  } catch (error) {
    console.error("OCR extraction failed:", error);
    throw new Error(
      `Failed to extract text from image: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Language codes for Tesseract
 */
export const OCR_LANGUAGES = {
  Arabic: "ara",
  English: "eng",
  Spanish: "spa",
  French: "fra",
  German: "deu",
  Chinese: "chi_sim",
  Japanese: "jpn",
  Hindi: "hin",
  Urdu: "urd",
  Persian: "fas",
  Turkish: "tur",
  Indonesian: "ind",
  Malay: "msa",
  Portuguese: "por",
  Russian: "rus",
  Italian: "ita",
  Dutch: "nld",
  Polish: "pol",
  Swedish: "swe",
  Korean: "kor",
};

/**
 * Get Tesseract language code from language name
 */
export function getTesseractLang(langName: string): string {
  return (
    OCR_LANGUAGES[langName as keyof typeof OCR_LANGUAGES] ||
    langName.substring(0, 3).toLowerCase()
  );
}
