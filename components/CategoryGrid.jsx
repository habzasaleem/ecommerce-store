const CATEGORIES = [
  { name: "Women Clothing", slug: "women", image: "/screenshots/women.png" },
  { name: "Men Clothing", slug: "men", image: "/screenshots/man.png" },
  { name: "Jewelry", slug: "jewelry", image: "/screenshots/jewelry.png" },
  { name: "Gifts", slug: "gifts", image: "/screenshots/gifts.png" },
  { name: "Candles", slug: "candles", image: "/screenshots/candles.png" },
  { name: "Watches & Clocks", slug: "watches", image: "/screenshots/watch.png" },
];

export default function CategoryGrid() {
  return (
    <section className="px-6 lg:px-12 py-10">
      <h2 className="font-serif text-2xl text-[#1C2B4A] mb-6">Shop by Category</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.slug}
            href={`/products/${cat.slug}`}
            className="group flex flex-col items-center gap-3 text-center"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden bg-[#EAF0F7] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[10px] text-[#8492AD] px-2">image</span>
              )}
            </div>
            <span className="text-sm font-medium text-[#1C2B4A] group-hover:text-[#D4A937] transition-colors">
              {cat.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}