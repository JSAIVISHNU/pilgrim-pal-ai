import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-CYvTr6Bj.js";
import { z } from "zod";
import "node:async_hooks";
import "h3-v2";
import "@tanstack/router-core";
import "seroval";
import "@tanstack/history";
import "@tanstack/router-core/ssr/client";
import "@tanstack/router-core/ssr/server";
import "react";
import "@tanstack/react-router";
import "react/jsx-runtime";
import "@tanstack/react-router/ssr/server";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";
function getKey() {
  const k = process.env.LOVABLE_API_KEY;
  if (!k) throw new Error("LOVABLE_API_KEY is not configured");
  return k;
}
async function chat(messages) {
  const key = getKey();
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages
    })
  });
  if (!res.ok) {
    const t = await res.text();
    if (res.status === 429) throw new Error("Rate limit reached. Please wait a moment.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits to continue.");
    throw new Error(`Translation failed: ${res.status} ${t}`);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
const translateText_createServerFn_handler = createServerRpc({
  id: "923a5261ae4ef344d627d5738bf40c7cf9d0d2df09dff176b88978a9a856c370",
  name: "translateText",
  filename: "src/lib/translate.functions.ts"
}, (opts) => translateText.__executeServer(opts));
const translateText = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  text: z.string().min(1).max(5e3),
  from: z.string().min(2).max(40),
  to: z.string().min(2).max(40)
})).handler(translateText_createServerFn_handler, async ({
  data
}) => {
  const sys = "You are a professional translator for Hajj and Umrah pilgrims. Translate the user's text accurately and naturally. Respond with ONLY the translated text, no explanations, no quotes, no prefixes.";
  const user = `Translate from ${data.from} to ${data.to}:

${data.text}`;
  const out = await chat([{
    role: "system",
    content: sys
  }, {
    role: "user",
    content: user
  }]);
  return {
    translation: out.trim()
  };
});
const translateImage_createServerFn_handler = createServerRpc({
  id: "0a930c94c13eff8589bc6dc2dedf5ad1c61bb2f8d3d648c321da097fcef1dd70",
  name: "translateImage",
  filename: "src/lib/translate.functions.ts"
}, (opts) => translateImage.__executeServer(opts));
const translateImage = createServerFn({
  method: "POST"
}).inputValidator(z.object({
  imageDataUrl: z.string().min(20),
  to: z.string().min(2).max(40)
})).handler(translateImage_createServerFn_handler, async ({
  data
}) => {
  const sys = 'You read signs, instruction boards, and documents for Hajj/Umrah pilgrims. Extract ALL readable text from the image, then translate it into the target language. Respond as strict JSON: {"original": string, "translation": string}. No markdown, no code fences.';
  const out = await chat([{
    role: "system",
    content: sys
  }, {
    role: "user",
    content: [{
      type: "text",
      text: `Target language: ${data.to}. Extract text and translate.`
    }, {
      type: "image_url",
      image_url: {
        url: data.imageDataUrl
      }
    }]
  }]);
  let parsed = {
    original: "",
    translation: out
  };
  try {
    const cleaned = out.replace(/```json|```/g, "").trim();
    parsed = JSON.parse(cleaned);
  } catch {
  }
  return parsed;
});
export {
  translateImage_createServerFn_handler,
  translateText_createServerFn_handler
};
