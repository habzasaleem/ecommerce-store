import { Eye, Star } from "lucide-react";
import { products as allProducts } from "@/lib/products";

// Homepage shows a curated set of 10, not the entire catalog.
// Flip a product's `featured: true` in lib/products.js to include it here.
const FEATURED_PRODUCTS = allProducts.filter((p) => p.featured);

export default function TrendingProducts({ products = FEATURED_PRODUCTS }) {
  return (
    <section className="px-6 lg:px-12 py-10">
      <h2 className="font-serif text-2xl text-[#1C2B4A] mb-6">Trending Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/products/${product.id}`}
            className="group block"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden bg-[#EAF0F7] mb-3">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay - quick view */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 text-[#1C2B4A]">
                  <Eye size={16} />
                </span>
              </div>
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
            <div className="flex gap-0.5 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill="#D4A937" stroke="#D4A937" />
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}