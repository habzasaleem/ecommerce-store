// app/api/chat/route.js
//
// Server-side endpoint for the AI shopping assistant.
// The browser never talks to Gemini directly — it only ever talks to
// this route. This is what keeps the API key server-side only.

import { streamText, convertToModelMessages } from 'ai';
import { model, generationConfig, systemPrompt } from '@/lib/ai-config';

// Allow streaming responses to run longer than the default timeout
export const maxDuration = 30;

export async function POST(req) {
  const body = await req.json();
  console.log('--- incoming body ---');
  console.log(JSON.stringify(body, null, 2));
  const { messages } = body;

const result = streamText({
  model,
  system: systemPrompt,
  messages: await convertToModelMessages(messages),
  temperature: generationConfig.temperature,
  maxOutputTokens: generationConfig.maxOutputTokens,
});
  // Returns a streaming response in the format useChat expects on the
  // client — this is what makes token-by-token rendering possible.
  return result.toUIMessageStreamResponse();
}