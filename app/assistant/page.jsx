"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ToolFindProductsDisplay } from "@/components/ToolFindProductsDisplay";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <div className="mx-auto flex h-screen max-w-2xl flex-col p-4">
      <h1 className="mb-4 text-lg font-semibold text-neutral-900">
        Shopping Assistant
      </h1>

      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <p className="text-sm text-neutral-400">
            Try: &ldquo;Find me something cozy under $30&rdquo; or
            &ldquo;show me electronics&rdquo;
          </p>
        )}

        {messages.map((message) => (
          <div key={message.id}>
            <div className="mb-1 text-xs font-medium text-neutral-400">
              {message.role === "user" ? "You" : "Assistant"}
            </div>

            {message.parts.map((part, i) => {
              // Plain text parts
              if (part.type === "text") {
                return (
                  <p key={i} className="text-sm text-neutral-800">
                    {part.text}
                  </p>
                );
              }

              // Tool parts for findProducts — handles all 4 lifecycle states
              if (part.type === "tool-findProducts") {
                return <ToolFindProductsDisplay key={i} part={part} />;
              }

              return null;
            })}
          </div>
        ))}

        {status === "submitted" && (
          <p className="text-sm text-neutral-400">Assistant is replying…</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a product…"
          className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          disabled={status !== "ready"}
        />
        <button
          type="submit"
          disabled={status !== "ready"}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}