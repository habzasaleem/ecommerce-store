"use client";

import { useEffect } from "react";

// Next.js automatically renders this file whenever a rendering error
// (thrown exception, failed data fetch, etc.) happens anywhere inside
// this route segment (app/assistant and anything nested under it).
//
// Props are passed in automatically by Next.js — you don't pass them yourself.
export default function AssistantError({ error, reset }) {
  useEffect(() => {
    // Log to console (and later, a real error-tracking service) so you
    // can see what actually broke, even though the user sees a friendly screen.
    console.error("Assistant route error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="text-4xl">⚠️</div>

      <h2 className="text-lg font-semibold text-gray-900">
        Something went wrong
      </h2>

      <p className="max-w-sm text-sm text-gray-500">
        The assistant ran into a problem loading this page. This is usually
        temporary — try again.
      </p>

      <button
        onClick={
          // reset() tells Next.js to try re-rendering this route segment
          // from scratch, without a full page reload.
          () => reset()
        }
        className="mt-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Try again
      </button>
    </div>
  );
}