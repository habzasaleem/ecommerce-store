/**
 * Parallax works via `background-attachment: fixed` on the section's
 * background image — the image scrolls slower than the page content,
 * creating the depth effect. Set the image with the CSS var below once
 * you have a photo; until then it falls back to a solid navy panel.
 *
 * Note: background-attachment: fixed is disabled on iOS Safari by
 * default (it treats it like `scroll`), so the effect gracefully
 * degrades to a normal static banner on mobile — no extra work needed.
 */
export default function DealOfDay({ imageUrl = "/screenshots/hero-shopper-sale.png" }) {
  return (
    <section
      className="relative px-6 lg:px-12 py-16 md:py-24 bg-[#1C2B4A] bg-cover bg-center bg-fixed flex items-center"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : undefined}
    >
      <div className="absolute inset-0 bg-[#1C2B4A]/70" />
      <div className="relative z-10">
        <p className="uppercase tracking-widest text-[#D4A937] text-sm mb-2">
          Deal of the Day
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
          Up to 50% Off
        </h2>
        <a
          href="/products"
          className="inline-block bg-white text-[#1C2B4A] px-7 py-3 rounded-md text-sm font-medium hover:bg-[#D4A937] hover:text-white transition-colors"
        >
          Shop Now
        </a>
      </div>
    </section>
  );
}