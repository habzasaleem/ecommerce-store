import { google } from "@ai-sdk/google";
import {
  streamText,
  convertToModelMessages,
  createUIMessageStreamResponse,
  toUIMessageStream,
} from "ai";
import { findProducts } from "@/lib/tools/find-products";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// --- Rate limiting (in-memory, per IP) ---
// NOTE: This resets whenever the serverless function cold-starts, since it's
// not backed by a database. It's a lightweight first line of defense against
// casual abuse, not a bulletproof long-term solution. A production app at
// scale would use Redis (e.g. Upstash) to persist counts across cold starts.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 10; // per IP, per window
const MAX_MESSAGE_LENGTH = 500; // characters, per user message

const requestLog = new Map(); // ip -> array of timestamps

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = requestLog.get(ip) || [];

  // Keep only timestamps within the current window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(ip, recent);
  return false;
}

function getClientIp(req) {
  // Vercel sets x-forwarded-for on incoming requests
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return "unknown";
}

// Surfaces real error messages in the tool's output-error state instead of
// the SDK's default generic "An error occurred" text.
function errorHandler(error) {
  if (error == null) return "unknown error";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST(req) {
  const ip = getClientIp(req);

  // --- Rate limit check ---
  if (isRateLimited(ip)) {
  return new Response("Too many requests. Please try again in a bit.", {
    status: 429,
    headers: { "Content-Type": "text/plain" },
  });
}

  const { messages } = await req.json();

  // --- Input length check (on the latest user message) ---
  const lastMessage = messages[messages.length - 1];
  const lastMessageText =
    lastMessage?.parts
      ?.map((p) => (p.type === "text" ? p.text : ""))
      .join("") ?? "";

  if (lastMessageText.length > MAX_MESSAGE_LENGTH) {
  return new Response(
    `Message too long. Please keep it under ${MAX_MESSAGE_LENGTH} characters.`,
    { status: 400, headers: { "Content-Type": "text/plain" } }
  );
}


  const result = streamText({
    model: google("gemini-2.5-flash"),
    system:
      "You are a helpful shopping assistant for a small online store. " +
      "When the user describes something they want, use the findProducts " +
      "tool to search the catalog instead of guessing what's available. " +
      "After the tool returns, briefly summarize the results in one short " +
      "sentence — the product cards will already show the details, so " +
      "don't repeat prices or descriptions in your text.",
    messages: await convertToModelMessages(messages),
    tools: {
      findProducts,
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: errorHandler,
    }),
  });
}