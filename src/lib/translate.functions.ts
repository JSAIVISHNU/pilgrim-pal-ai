import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

function getKey(): string {
  const k = process.env.LOVABLE_API_KEY;
  if (!k) throw new Error("LOVABLE_API_KEY is not configured");
  return k;
}

async function chat(messages: Array<{ role: string; content: unknown }>) {
  const key = getKey();
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, messages }),
  });
  if (!res.ok) {
    const t = await res.text();
    if (res.status === 429) throw new Error("Rate limit reached. Please wait a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
    throw new Error(`Translation failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  return (data.choices?.[0]?.message?.content as string) ?? "";
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
    const sys =
      "You are a professional translator for Hajj and Umrah pilgrims. Translate the user's text accurately and naturally. Respond with ONLY the translated text, no explanations, no quotes, no prefixes.";
    const user = `Translate from ${data.from} to ${data.to}:\n\n${data.text}`;
    const out = await chat([
      { role: "system", content: sys },
      { role: "user", content: user },
    ]);
    return { translation: out.trim() };
  });

export const translateImage = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      imageDataUrl: z.string().min(20),
      to: z.string().min(2).max(40),
    })
  )
  .handler(async ({ data }) => {
    const sys =
      "You read signs, instruction boards, and documents for Hajj/Umrah pilgrims. Extract ALL readable text from the image, then translate it into the target language. Respond as strict JSON: {\"original\": string, \"translation\": string}. No markdown, no code fences.";
    const out = await chat([
      { role: "system", content: sys },
      {
        role: "user",
        content: [
          { type: "text", text: `Target language: ${data.to}. Extract text and translate.` },
          { type: "image_url", image_url: { url: data.imageDataUrl } },
        ],
      },
    ]);
    let parsed: { original: string; translation: string } = { original: "", translation: out };
    try {
      const cleaned = out.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      // fallback: whole text as translation
    }
    return parsed;
  });
