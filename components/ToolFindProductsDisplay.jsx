import { ProductGrid } from "./ProductCard";

export function ToolFindProductsDisplay({ part }) {
  return (
    <div className="my-3 max-w-xl animate-fade-in" key={part.state}>
      {part.state === "input-streaming" && <StateDeciding input={part.input} />}
      {part.state === "input-available" && <StateRunning input={part.input} />}
      {part.state === "output-available" && (
        <StateResult input={part.input} output={part.output} />
      )}
      {part.state === "output-error" && <StateError errorText={part.errorText} />}
    </div>
  );
}

// "What is it doing?" — AI is still deciding/streaming the search parameters
function StateDeciding({ input }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-500">
      <span className="flex gap-0.5">
        <Dot delay="0ms" />
        <Dot delay="150ms" />
        <Dot delay="300ms" />
      </span>
      <span>
        Thinking about what to search for
        {input?.query ? `: "${input.query}"` : "…"}
      </span>
    </div>
  );
}

// "With what input?" — the tool call is locked in and now executing
function StateRunning({ input }) {
  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2 text-indigo-700 font-medium">
        <svg className="h-3.5 w-3.5 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        Searching products
      </div>
      <div className="mt-1 text-xs text-indigo-600/80 flex flex-wrap gap-x-3">
        {input?.query && <span>query: “{input.query}”</span>}
        {typeof input?.maxPrice === "number" && (
          <span>under ${input.maxPrice}</span>
        )}
        {input?.category && <span>category: {input.category}</span>}
      </div>
    </div>
  );
}

// "What came back?" — real component, not a JSON dump
function StateResult({ input, output }) {
  const count = output?.count ?? 0;

  // No matches is a distinct state from "results found" — worth its
  // own designed message instead of an empty grid.
  if (count === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm">
        <p className="text-neutral-600">
          No products matched
          {input?.query ? ` "${input.query}"` : " that search"}
          {typeof input?.maxPrice === "number" ? ` under $${input.maxPrice}` : ""}.
        </p>
        <p className="mt-1 text-xs text-neutral-400">
          Try a higher price limit, a different category, or a broader search term.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-2 text-xs text-neutral-500">
        Found{" "}
        <span className="font-medium text-neutral-700">{count}</span> result
        {count === 1 ? "" : "s"}
        {input?.query ? ` for "${input.query}"` : ""}
      </div>
      <ProductGrid products={output?.products ?? []} />
    </div>
  );
}

// "What went wrong?" — designed failure state, not a crash
function StateError({ errorText }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm">
      <div className="flex items-center gap-2 text-red-700 font-medium">
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.516 11.598c.75 1.334-.213 2.98-1.742 2.98H3.483c-1.53 0-2.492-1.646-1.743-2.98L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        Search didn't work
      </div>
      <p className="mt-1 text-xs text-red-600">
        {errorText || "Something went wrong while searching the catalog."}
      </p>
    </div>
  );
}

function Dot({ delay }) {
  return (
    <span
      className="h-1.5 w-1.5 rounded-full bg-neutral-400 animate-bounce"
      style={{ animationDelay: delay }}
    />
  );
}