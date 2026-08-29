import Link from "next/link";
import { getProductsByCategory, getProductById, CATEGORY_LABELS, products } from "@/lib/products";
import ProductDetailClient from "./ProductDetailClient";

// One dynamic segment ([slug]) serves both category pages (/products/women)
// and product pages (/products/p1). Next.js does not allow two different
// dynamic folder names at the same level, so this replaces the old
// separate [category] and [id] folders.
export function generateStaticParams() {
  const categorySlugs = Object.keys(CATEGORY_LABELS).map((slug) => ({ slug }));
  const productIds = products.map((p) => ({ slug: p.id }));
  return [...categorySlugs, ...productIds];
}

export default async function ProductsSlugPage({ params }) {
  const { slug } = await params;

  // Case 1: slug matches a known category (e.g. "women", "watches")
  if (CATEGORY_LABELS[slug]) {
    const label = CATEGORY_LABELS[slug];
    const items = getProductsByCategory(slug);

    return (
      <div className="px-6 lg:px-12 py-10 min-h-[50vh]">
        <h1 className="font-serif text-3xl text-[#1C2B4A] mb-8">{label}</h1>

        {items.length === 0 ? (
          <p className="text-[#6B7A99]">No products in this category yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {items.map((product) => (
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
                  <p className="text-sm text-[#1C2B4A] font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.originalPrice && (
                    <p className="text-xs text-[#9CA5B8] line-through">
                      ${product.originalPrice.toFixed(2)}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Case 2: slug matches a product id (e.g. "p1")
  const product = getProductById(slug);
  if (product) {
    return <ProductDetailClient product={product} />;
  }

  // Case 3: matches neither
  return (
    <div className="px-6 lg:px-12 py-16 text-center min-h-[50vh]">
      <p className="text-[#6B7A99]">Page not found.</p>
    </div>
  );
}