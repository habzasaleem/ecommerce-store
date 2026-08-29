"use client";

import { useState } from "react";
import Link from "next/link";
import { products, CATEGORY_LABELS } from "@/lib/products";

const FILTERS = ["All", ...Object.values(CATEGORY_LABELS)];

function labelFor(slug) {
  return CATEGORY_LABELS[slug] ?? slug;
}

export default function AllProductsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? products
      : products.filter((p) => labelFor(p.category) === activeFilter);

  return (
    <div className="px-6 lg:px-12 py-10 min-h-[60vh]">
      <h1 className="font-serif text-3xl text-[#1C2B4A] mb-2">All Products</h1>
      <p className="text-sm text-[#6B7A99] mb-6">{filtered.length} products</p>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-3 mb-8">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeFilter === filter
                ? "bg-[#1C2B4A] text-white border-[#1C2B4A]"
                : "bg-white text-[#1C2B4A] border-[#D7DFEA] hover:border-[#1C2B4A]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group block">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#EAF0F7] mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <p className="text-sm font-medium text-[#1C2B4A] group-hover:text-[#D4A937] transition-colors">
              {product.name}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-[#1C2B4A] font-semibold">${product.price.toFixed(2)}</p>
              {product.originalPrice && (
                <p className="text-xs text-[#9CA5B8] line-through">
                  ${product.originalPrice.toFixed(2)}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}