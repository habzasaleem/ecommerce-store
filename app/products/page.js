import { products } from "@/lib/products";
import { ProductGrid } from "@/components/ProductCard";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <h1 className="text-2xl font-semibold text-foreground">Shop</h1>
      <p className="text-muted mt-2">
        {products.length} products, hand-picked for cozy living.
      </p>
      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </main>
  );
}