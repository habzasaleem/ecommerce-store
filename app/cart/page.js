"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="px-6 lg:px-12 py-16 text-center min-h-[50vh]">
        <h1 className="font-serif text-2xl text-[#1C2B4A] mb-3">Your cart is empty</h1>
        <p className="text-[#6B7A99] mb-6">Browse our categories to find something you'll love.</p>
        <Link
          href="/"
          className="inline-block bg-[#1C2B4A] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 lg:px-12 py-10 min-h-[50vh]">
      <h1 className="font-serif text-3xl text-[#1C2B4A] mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border border-[#EAF0F7] rounded-lg p-4"
            >
              <div className="w-20 h-20 rounded-md overflow-hidden bg-[#EAF0F7] shrink-0">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1C2B4A] truncate">{item.name}</p>
                <p className="text-sm text-[#6B7A99]">${item.price.toFixed(2)} each</p>
              </div>

              <div className="flex items-center border border-[#D7DFEA] rounded-md">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.name}`}
                  className="px-2.5 py-1.5 text-[#1C2B4A] hover:bg-[#EAF0F7] transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 text-sm font-medium text-[#1C2B4A]">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.name}`}
                  className="px-2.5 py-1.5 text-[#1C2B4A] hover:bg-[#EAF0F7] transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>

              <p className="w-16 text-right text-sm font-semibold text-[#1C2B4A]">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.name} from cart`}
                className="text-[#9CA5B8] hover:text-red-500 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="border border-[#EAF0F7] rounded-lg p-6 h-fit bg-[#EAF0F7]">
          <h2 className="font-serif text-lg text-[#1C2B4A] mb-4">Order Summary</h2>
          <div className="flex justify-between text-sm text-[#3A4A6B] mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs text-[#6B7A99] mb-4">Shipping and taxes calculated at checkout.</p>
          <Link
            href="/checkout"
            className="block text-center bg-[#1C2B4A] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}