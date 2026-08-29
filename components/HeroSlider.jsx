"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { id: 1, src: "/screenshots/hero-woman-dress.png", alt: "Woman in silk dress" },
  { id: 2, src: "/screenshots/hero-man-suit.png", alt: "Man in tailored suit" },
  { id: 3, src: "/screenshots/hero-jewelry-flatlay.png", alt: "Jewelry and accessories" },
  { id: 4, src: "/screenshots/hero-gift-flatlay.png", alt: "Gift box and candle" },
];

const AUTO_ROTATE_MS = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden bg-[#EAF0F7]">
      <div className="relative w-full aspect-[12/5]">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            aria-hidden={i !== active}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            {s.src ? (
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#DCE6F2] to-[#C9D8EB] text-[#5C6E8C] text-sm text-center px-6">
                [ Image placeholder {i + 1} — add product/lifestyle photo here ]
              </div>
            )}
          </div>
        ))}

        <div className="absolute inset-0 z-10 flex items-center px-6 sm:pl-10 lg:pl-20 xl:pl-28">
          <div className="max-w-lg">
            <h1 className="font-serif text-4xl md:text-5xl leading-tight text-[#1C2B4A] mb-4">
              Every Style.
              <br />
              Every You.
            </h1>
            <p className="text-[#3A4A6B] mb-6 max-w-sm">
              Explore top collections across fashion, jewelry, gifts and more.
            </p>
            <a
              href="/products"
              className="inline-block bg-[#1C2B4A] text-white px-7 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>

        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#1C2B4A] transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[#1C2B4A] transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-[#1C2B4A]" : "w-2 bg-[#B9C6DB]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}