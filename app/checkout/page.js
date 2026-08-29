"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";

function generateOrderNumber() {
  return "DZ-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  });
  const [orderNumber, setOrderNumber] = useState(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Simulated checkout: validates the form and shows a confirmation.
    // No real payment is processed and no order is persisted to a database —
    // documented as a known limitation (see README).
    const number = generateOrderNumber();
    setOrderNumber(number);
    clearCart();
  }

  if (orderNumber) {
    return (
      <div className="px-6 lg:px-12 py-16 text-center min-h-[50vh]">
        <h1 className="font-serif text-3xl text-[#1C2B4A] mb-3">Order Confirmed</h1>
        <p className="text-[#3A4A6B] mb-1">Thank you, {form.name || "friend"} — your order is on its way.</p>
        <p className="text-sm text-[#6B7A99] mb-8">
          Order number: <span className="font-semibold text-[#1C2B4A]">{orderNumber}</span>
        </p>
        <Link
          href="/"
          className="inline-block bg-[#1C2B4A] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="px-6 lg:px-12 py-16 text-center min-h-[50vh]">
        <h1 className="font-serif text-2xl text-[#1C2B4A] mb-3">Your cart is empty</h1>
        <p className="text-[#6B7A99] mb-6">Add something to your cart before checking out.</p>
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
      <h1 className="font-serif text-3xl text-[#1C2B4A] mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4 max-w-lg">
          <h2 className="font-serif text-lg text-[#1C2B4A] mb-1">Shipping Details</h2>

          <input
            name="name"
            required
            placeholder="Full name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-[#D7DFEA] text-sm focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-[#D7DFEA] text-sm focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
          />
          <input
            name="address"
            required
            placeholder="Street address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-[#D7DFEA] text-sm focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
          />
          <div className="flex gap-4">
            <input
              name="city"
              required
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              className="flex-1 px-4 py-3 rounded-md border border-[#D7DFEA] text-sm focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
            />
            <input
              name="zip"
              required
              placeholder="ZIP code"
              value={form.zip}
              onChange={handleChange}
              className="w-32 px-4 py-3 rounded-md border border-[#D7DFEA] text-sm focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1C2B4A] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
          >
            Place Order
          </button>
        </form>

        {/* Order summary */}
        <div className="border border-[#EAF0F7] rounded-lg p-6 h-fit bg-[#EAF0F7]">
          <h2 className="font-serif text-lg text-[#1C2B4A] mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm text-[#3A4A6B]">
                <span className="truncate pr-2">
                  {item.name} × {item.quantity}
                </span>
                <span className="shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[#D7DFEA] pt-3 flex justify-between text-sm font-semibold text-[#1C2B4A]">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}