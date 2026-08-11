'use client';

// app/assistant/page.js
//
// Client-side chat UI for the AI shopping assistant.
// Talks to app/api/chat/route.js via useChat, which handles the
// streaming connection, message state, and stop/abort control for us.

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';

export default function AssistantPage() {
  const [input, setInput] = useState('');

  // useChat wires up: sending messages, receiving the live stream,
  // tracking status (idle / submitted / streaming), and stop().
  const { messages, sendMessage, status, stop } = useChat();

  const isStreaming = status === 'streaming' || status === 'submitted';

  function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input });
    setInput('');
  }

  // --- Auto-scroll that respects the user scrolling up ---
  const scrollRef = useRef(null);
  const bottomRef = useRef(null);
  const [isPinnedToBottom, setIsPinnedToBottom] = useState(true);

  function handleScroll() {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom =
      el.scrollHeight - el.scrollTop - el.clientHeight;
    // Consider "at bottom" if within ~60px, not just exactly 0 —
    // gives a little tolerance for sub-pixel scroll rounding.
    setIsPinnedToBottom(distanceFromBottom < 60);
  }

  useEffect(() => {
    // Only auto-scroll if the user hasn't scrolled up to read something.
    if (isPinnedToBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isPinnedToBottom]);

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto bg-white">
      {/* Header */}
      <div className="border-b px-4 py-3 shrink-0">
        <h1 className="text-lg font-semibold">Shopping Assistant</h1>
      </div>

      {/* Message list */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-8">
            Ask me anything about products in the store.
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm whitespace-pre-wrap ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-900 rounded-bl-sm'
              }`}
            >
              {message.parts.map((part, i) =>
                part.type === 'text' ? (
                  <span key={i}>{part.text}</span>
                ) : null
              )}
            </div>
          </div>
        ))}

        {/* Thinking indicator — shown after send, before first token arrives */}
        {status === 'submitted' && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
              </span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* "Jump to latest" affordance when scrolled up */}
      {!isPinnedToBottom && (
        <button
          onClick={() => {
            bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
            setIsPinnedToBottom(true);
          }}
          className="self-center mb-2 text-xs bg-gray-800 text-white px-3 py-1 rounded-full shadow"
        >
          ↓ Jump to latest
        </button>
      )}

      {/* Input area */}
      <form
        onSubmit={handleSubmit}
        className="border-t px-3 py-3 flex gap-2 items-end shrink-0"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder="Ask about a product..."
          rows={1}
          className="flex-1 resize-none border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-32"
        />

        {isStreaming ? (
          <button
            type="button"
            onClick={stop}
            className="shrink-0 bg-gray-800 text-white text-sm px-4 py-2 rounded-xl"
          >
            Stop
          </button>
        ) : (
          <button
            type="submit"
            disabled={!input.trim()}
            className="shrink-0 bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl disabled:opacity-40"
          >
            Send
          </button>
        )}
      </form>
    </div>
  );
}