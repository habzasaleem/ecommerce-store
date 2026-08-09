import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold text-foreground">
        Welcome to StoreName
      </h1>
      <p className="text-muted mt-3">
        Jewelry, clothes, watches, and gifts — curated for you.
      </p>
      <Link
        href="/products"
        className="inline-block mt-6 bg-accent text-white px-6 py-3 rounded-md text-sm font-medium"
      >
        Shop Now
      </Link>
    </main>
  );
}