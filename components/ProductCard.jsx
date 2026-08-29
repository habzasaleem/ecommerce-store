import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product, priority = false }) {
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-xl border border-neutral-200 bg-white overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="relative aspect-square bg-neutral-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-cover"
          unoptimized
          priority={priority}
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 rounded-full bg-indigo-600 text-white text-xs font-medium px-2 py-1">
            {Math.round((1 - product.price / product.originalPrice) * 100)}%
            off
          </span>
        )}
      </div>
      <div className="p-3">
        <h2 className="text-sm font-medium text-neutral-900 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-900">
            ${product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-neutral-600 line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500">
        No products matched that search. Try a different description.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < 2} />
      ))}
    </div>
  );
}