// Skeleton placeholder shaped like your real product cards
// (purple image block + title + description + price).
// Keeping the same heights/spacing as the real card avoids layout
// shift (CLS) when the actual results pop in.

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-neutral-200">
      {/* mirrors the purple image block */}
      <div className="h-[200px] w-full bg-neutral-200" />

      <div className="space-y-2 p-3">
        {/* title line */}
        <div className="h-4 w-3/4 rounded bg-neutral-200" />
        {/* description line */}
        <div className="h-3 w-full rounded bg-neutral-200" />
        <div className="h-3 w-2/3 rounded bg-neutral-200" />
        {/* price line */}
        <div className="h-4 w-1/4 rounded bg-neutral-300" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 2 }) {
  return (
    <div>
      {/* mirrors the "Found N results for..." line above the grid */}
      <div className="mb-2 h-3 w-40 animate-pulse rounded bg-neutral-200" />

      <div className="grid grid-cols-2 gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}