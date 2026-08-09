import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-surface border-b border-black/10 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-lg font-semibold text-foreground">
        StoreName
      </Link>
      <div className="flex gap-6 text-sm text-foreground">
        <Link href="/products">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
}