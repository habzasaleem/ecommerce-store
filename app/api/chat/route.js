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

// Surfaces real error messages in the tool's output-error state instead of
// the SDK's default generic "An error occurred" text.
function errorHandler(error) {
  if (error == null) return "unknown error";
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return JSON.stringify(error);
}

export async function POST(req) {
  const { messages } = await req.json();

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