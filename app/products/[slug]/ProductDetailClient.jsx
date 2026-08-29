"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";

export default function ProductDetailClient({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="px-6 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="aspect-square rounded-lg overflow-hidden bg-[#EAF0F7]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div>
        <h1 className="font-serif text-3xl text-[#1C2B4A] mb-3">{product.name}</h1>

        <div className="flex items-center gap-3 mb-5">
          <span className="text-2xl font-semibold text-[#1C2B4A]">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-base text-[#9CA5B8] line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <p className="text-[#3A4A6B] leading-relaxed mb-8">{product.description}</p>

        <div className="flex items-center gap-4 mb-6">
          <span className="text-sm font-medium text-[#1C2B4A]">Quantity</span>
          <div className="flex items-center border border-[#D7DFEA] rounded-md">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="Decrease quantity"
              className="px-3 py-2 text-[#1C2B4A] hover:bg-[#EAF0F7] transition-colors"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 text-sm font-medium text-[#1C2B4A]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="px-3 py-2 text-[#1C2B4A] hover:bg-[#EAF0F7] transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          className="inline-flex items-center gap-2 bg-[#1C2B4A] text-white px-7 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
        >
          {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}