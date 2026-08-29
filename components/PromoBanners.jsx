import Image from "next/image";

const BANNERS = [
  { title: "Summer Collection", cta: "Explore Now", href: "/products/women", image: "/screenshots/7.png" },
  { title: "Gifts That Matter", cta: "Shop Gifts", href: "/products/gifts", image: "/screenshots/8.png" },
  { title: "Luxury Watches", cta: "Shop Now", href: "/products/watches", image: "/screenshots/9.png" },
];

export default function PromoBanners() {
  return (
    <section className="px-6 lg:px-12 py-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {BANNERS.map((banner) => (
        <a
          key={banner.title}
          href={banner.href}
          className="group relative overflow-hidden rounded-xl h-56 bg-[#EAF0F7] flex items-end"
        >
          {banner.image ? (
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-[#8492AD] text-xs">
              [ banner image ]
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative z-10 p-6">
            <h3 className="font-serif text-xl text-[#1C2B4A] group-hover:text-white transition-colors mb-1">
              {banner.title}
            </h3>
            <span className="text-sm font-medium text-[#1C2B4A] group-hover:text-white underline underline-offset-2 transition-colors">
              {banner.cta}
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}