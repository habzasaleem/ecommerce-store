"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ToolFindProductsDisplay } from "@/components/ToolFindProductsDisplay";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";

export default function AssistantPage() {
  const [input, setInput] = useState("");

  // `error` -> non-null whenever the last request failed (network drop,
  //   API error, thrown tool error, etc.)
  // `stop`  -> lets the user cancel a request that's stuck submitted/streaming
  // `regenerate` -> re-runs the last exchange, i.e. your retry button
  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  // Input/send should only lock while a request is genuinely in flight.
  // It should NOT stay locked forever just because something errored —
  // that was the bug you hit.
  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col p-4">
      <h1 className="mb-4 text-lg font-semibold text-neutral-900">
        Shopping Assistant 
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="space-y-2">
            <p className="text-sm text-neutral-400">
              Try asking the assistant something like:
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                "Find me something cozy under $30",
                "Show me electronics",
                "What kitchen items do you have?",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    sendMessage({ text: suggestion });
                  }}
                  className="rounded-full border border-neutral-300 px-3 py-1.5 text-sm text-neutral-700 transition hover:border-indigo-500 hover:text-indigo-600"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            <div className="mb-1 text-xs font-medium text-neutral-400">
              {message.role === "user" ? "You" : "Assistant"}
            </div>

            {message.parts.map((part, i) => {
              if (part.type === "text") {
                return (
                  <p key={i} className="text-sm text-neutral-800">
                    {part.text}
                  </p>
                );
              }

              if (part.type === "tool-findProducts") {
                return <ToolFindProductsDisplay key={i} part={part} />;
              }

              return null;
            })}
          </div>
        ))}

        {/* Skeleton shown while waiting for the assistant's first
            response — matches the real product card shape so content
            doesn't jump around when it arrives. */}
        {status === "submitted" && <ProductGridSkeleton count={2} />}

        {/* Stuck-stream escape hatch: if it's taking too long or the
            connection died mid-stream, let the user cancel instead of
            being locked out until they refresh the page. */}
        {isBusy && (
          <button
            type="button"
            onClick={() => stop()}
            className="text-xs font-medium text-neutral-400 underline hover:text-neutral-600"
          >
            Taking too long? Cancel
          </button>
        )}

        {/* Designed error state with a working retry — this is the
            piece that was completely missing before. */}
        {error && (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
            <p className="text-sm text-red-700">
              Something went wrong sending that message. Check your
              connection and try again.
            </p>
            <button
              type="button"
              onClick={() => regenerate()}
              className="shrink-0 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a product…"
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          disabled={isBusy}
        />
        <button
          type="submit"
          disabled={isBusy}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}