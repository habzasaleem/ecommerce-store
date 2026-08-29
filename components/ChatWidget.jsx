"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { MessageCircle, X } from "lucide-react";
import { ToolFindProductsDisplay } from "@/components/ToolFindProductsDisplay";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open shopping assistant chat"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1C2B4A] text-[#D4A937] shadow-lg transition hover:bg-[#243759] hover:scale-105"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {open && (
        <div className="fixed bottom-5 right-5 z-50 flex h-[520px] w-[360px] max-w-[92vw] flex-col overflow-hidden rounded-xl border border-[#D7DFEA] bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#1C2B4A] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">Dazzle Assistant</p>
              <p className="text-xs text-[#D4A937]">Ask about products, orders, or returns</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-3 py-3 space-y-3"
            aria-live="polite"
            aria-atomic="false"
          >
            {messages.length === 0 && (
              <div className="space-y-2">
                <p className="text-xs text-neutral-500">Try asking:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "What's your return policy?",
                    "Show me watches under $50",
                    "Do you ship internationally?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => sendMessage({ text: suggestion })}
                      className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs text-neutral-700 transition hover:border-[#1C2B4A] hover:text-[#1C2B4A]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                <div className="mb-1 text-[11px] font-medium text-neutral-500">
                  {message.role === "user" ? "You" : "Assistant"}
                </div>

                {message.parts.map((part, i) => {
                  if (part.type === "text") {
                    return (
                      <p key={i} className="text-sm text-neutral-800 whitespace-pre-wrap">
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

            {status === "submitted" && <ProductGridSkeleton count={2} />}

            {isBusy && (
              <button
                type="button"
                onClick={() => stop()}
                className="text-xs font-medium text-neutral-500 underline hover:text-neutral-700"
              >
                Taking too long? Cancel
              </button>
            )}

            {error && (
              <div
                role="alert"
                className="flex items-center justify-between gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2"
              >
                <p className="text-xs text-red-700">
                  {error.message || "Something went wrong. Please try again."}
                </p>
                <button
                  type="button"
                  onClick={() => regenerate()}
                  className="shrink-0 rounded-md bg-red-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-[#D7DFEA] p-2.5">
            <label htmlFor="widget-chat-input" className="sr-only">
              Ask the shopping assistant a question
            </label>
            <input
              id="widget-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#1C2B4A]"
              disabled={isBusy}
            />
            <button
              type="submit"
              disabled={isBusy}
              className="rounded-lg bg-[#1C2B4A] px-3 py-2 text-sm font-medium text-white disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}