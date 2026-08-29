"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/CartContext";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "#contact" },
];

const CATEGORIES = [
  { label: "All Categories", value: "" },
  { label: "Women", value: "women" },
  { label: "Men", value: "men" },
  { label: "Jewelry", value: "jewelry" },
  { label: "Gifts", value: "gifts" },
  { label: "Candles", value: "candles" },
  { label: "Watches & Clocks", value: "watches" },
];

export default function Navbar() {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");

  function isActive(href) {
    if (href.startsWith("#")) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    router.push("/search?" + params.toString());
  }

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-12 py-1.5 text-xs text-[#3A4A6B] bg-[#EAF0F7]">
        <span>Free Shipping on Orders Over $50</span>
        <div className="flex items-center gap-6">
          <a href="/about" className="hover:text-[#1C2B4A] transition-colors">
            Help
          </a>
          <a href="/about" className="hover:text-[#1C2B4A] transition-colors">
            Support
          </a>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-6 lg:px-12 py-2.5 border-b border-[#EAF0F7]">
        <button
          className="lg:hidden text-[#1C2B4A]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <a href="/" className="text-xl lg:text-2xl font-serif tracking-[0.15em] text-[#1C2B4A]">
          DAZZLE
        </a>

        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-xl items-stretch border border-[#D7DFEA] rounded-full overflow-hidden"
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Search category"
            className="hidden lg:block bg-[#F7F9FC] text-sm text-[#3A4A6B] px-3 border-r border-[#D7DFEA] focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            aria-label="Search products"
            className="flex-1 px-4 py-1.5 text-sm focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Search"
            className="px-4 bg-white hover:bg-[#EAF0F7] transition-colors text-[#1C2B4A]"
          >
            <Search size={18} />
          </button>
        </form>

        <div className="flex items-center gap-5 text-[#1C2B4A]">
          <a href="/cart" className="relative flex items-center gap-1.5 text-sm hover:opacity-70 transition-opacity">
            <ShoppingCart size={20} />
            <span className="hidden lg:inline">Cart</span>
            <span className="absolute -top-2 -right-2 bg-[#D4A937] text-white text-[10px] font-semibold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
              {count}
            </span>
          </a>
        </div>
      </div>

      <nav className="hidden lg:flex items-center gap-6 px-12 py-1.5 text-[13px] font-medium text-[#1C2B4A] border-b border-[#EAF0F7]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={
              "relative pb-1 transition-colors hover:text-[#D4A937] " +
              (isActive(link.href)
                ? "after:content-[''] after:absolute after:left-0 after:-bottom-[7px] after:h-[2px] after:w-full after:bg-[#1C2B4A]"
                : "")
            }
          >
            {link.label}
          </a>
        ))}
      </nav>

      {mobileOpen && (
        <nav className="lg:hidden flex flex-col px-6 py-4 gap-3 text-sm font-medium text-[#1C2B4A] border-b border-[#EAF0F7]">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="py-1">
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}