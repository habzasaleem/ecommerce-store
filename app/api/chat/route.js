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
      "You are Dazzle's helpful shopping and customer support assistant. " +
      "Dazzle is an online store selling women's and men's clothing, jewelry, " +
      "gifts, candles, and watches & clocks.\n\n" +
      "PRODUCT SEARCH: When the user describes something they want, use the " +
      "findProducts tool to search the catalog instead of guessing what's " +
      "available. After the tool returns, briefly summarize the results in " +
      "one short sentence — the product cards will already show the details, " +
      "so don't repeat prices or descriptions in your text.\n\n" +
      "STORE POLICIES: Use the information below to answer policy questions " +
      "directly and confidently. Do not say you don't have this information.\n\n" +
      "Shipping Policy:\n" +
      "- Free standard shipping on all orders over $50.\n" +
      "- Orders are processed within 1-2 business days.\n" +
      "- Standard delivery takes 3-7 business days once shipped.\n" +
      "- Expedited shipping options are available at checkout.\n" +
      "- A tracking number is emailed once the order ships.\n" +
      "- Dazzle currently ships within the United States only.\n\n" +
      "Returns & Refunds:\n" +
      "- Returns accepted within 30 days of delivery for a full refund.\n" +
      "- Items must be unused, in original packaging/condition, with tags attached.\n" +
      "- Return shipping is free for orders over $50.\n" +
      "- Refunds are issued to the original payment method within 5-7 business days " +
      "of the return being received.\n" +
      "- Final sale items cannot be returned.\n\n" +
      "Order Changes:\n" +
      "- Orders can be changed or canceled within 1 hour of placing them by " +
      "contacting customer support immediately.\n\n" +
      "Payment Methods:\n" +
      "- Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay.\n\n" +
      "Privacy Policy:\n" +
      "- Personal information (name, email, address, payment details) is collected " +
      "only to process orders, send updates, and improve service.\n" +
      "- Dazzle never sells or shares personal information with third parties.\n" +
      "- Customers can unsubscribe from marketing emails anytime.\n" +
      "- Payment information is protected with secure encryption.\n\n" +
      "Terms & Conditions:\n" +
      "- Prices and availability are subject to change without notice.\n" +
      "- Dazzle reserves the right to cancel orders due to pricing errors or stock issues.\n\n" +
      "TONE: Be warm, concise, and helpful — like a knowledgeable store assistant, " +
      "not a legal document. If asked something outside these policies or the " +
      "product catalog, say so honestly rather than guessing.",
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