"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";
import { ProductGrid } from "@/components/ProductCard";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const category = searchParams.get("category") || "";

  const terms = query.split(/\s+/).filter(Boolean);

  const results = products.filter((p) => {
    if (category && p.category !== category) return false;
    if (terms.length === 0) return true;

    const haystack = [p.name, p.description, p.category, ...p.tags]
      .join(" ")
      .toLowerCase();

    return terms.every((t) => haystack.includes(t));
  });

  return (
    <main className="mx-auto max-w-6xl px-6 lg:px-12 py-10">
      <h1 className="font-serif text-2xl text-[#1C2B4A] mb-1">
        Search Results
      </h1>
      <p className="text-sm text-[#6B7A99] mb-6">
        {results.length} result{results.length === 1 ? "" : "s"}
        {query ? ` for "${searchParams.get("q")}"` : ""}
        {category ? ` in ${category}` : ""}
      </p>

      <ProductGrid products={results} />
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 lg:px-12 py-10">Loading…</div>}>
      <SearchResults />
    </Suspense>
  );
}