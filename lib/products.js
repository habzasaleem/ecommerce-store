export const products = [
  // Women
  {
    id: "p1",
    name: "Floral Wrap Dress",
    price: 54.99,
    originalPrice: 69.99,
    image: "/screenshots/image1.jpg",
    category: "women",
    tags: ["dress", "summer", "new"],
    description: "Lightweight floral wrap dress with a flattering tie waist, perfect for warm-weather occasions.",
    featured: true,
  },
  {
    id: "p2",
    name: "Tailored Wide-Leg Trousers",
    price: 42.0,
    originalPrice: 52.0,
    image: "/screenshots/image9.jpg",
    category: "women",
    tags: ["workwear", "classic"],
    description: "High-waisted wide-leg trousers in a soft stretch fabric, tailored for an elevated everyday look.",
  },
  {
    id: "p3",
    name: "Cashmere Blend Cardigan",
    price: 64.5,
    originalPrice: 79.99,
    image: "/screenshots/image6.jpg",
    category: "women",
    tags: ["knitwear", "cozy", "gift"],
    description: "Soft cashmere-blend cardigan with mother-of-pearl buttons, layers easily over any outfit.",
  },

  // Men
  {
    id: "p4",
    name: "Oxford Casual Shirt",
    price: 44.99,
    image: "/screenshots/image2.jpg",
    category: "men",
    tags: ["shirt", "classic"],
    description: "Breathable cotton Oxford shirt with a tailored fit, works equally well tucked in or rolled up.",
    featured: true,
  },
  {
    id: "p5",
    name: "Slim Fit Chino Pants",
    price: 38.0,
    originalPrice: 48.0,
    image: "/screenshots/image7.jpg",
    category: "men",
    tags: ["pants", "workwear"],
    description: "Slim fit chinos in a durable stretch cotton, versatile enough for office or weekend.",
  },
  {
    id: "p6",
    name: "Merino Wool Sweater",
    price: 58.0,
    image: "/screenshots/image8.jpg",
    category: "men",
    tags: ["knitwear", "winter", "gift"],
    description: "Fine-gauge merino wool sweater, warm without the bulk — a cold-weather staple.",
  },

  // Jewelry
  {
    id: "p7",
    name: "Diamond Solitaire Ring",
    price: 199.99,
    image: "/screenshots/image3.jpg",
    category: "jewelry",
    tags: ["ring", "gift", "luxury"],
    description: "Classic solitaire ring featuring a brilliant-cut diamond set in polished sterling silver.",
    featured: true,
  },
  {
    id: "p8",
    name: "Gold Layered Necklace",
    price: 34.5,
    originalPrice: 45.0,
    image: "/screenshots/image10.jpg",
    category: "jewelry",
    tags: ["necklace", "everyday"],
    description: "14k gold-plated layered chain necklace, designed to be worn alone or stacked.",
  },
  {
    id: "p9",
    name: "Pearl Drop Earrings",
    price: 27.99,
    image: "/screenshots/image11.jpg",
    category: "jewelry",
    tags: ["earrings", "gift"],
    description: "Freshwater pearl drop earrings on delicate gold-tone hooks, understated and elegant.",
  },

  // Gifts
  {
    id: "p10",
    name: "Curated Gift Box Set",
    price: 39.99,
    image: "/screenshots/image12.jpg",
    category: "gifts",
    tags: ["gift", "bundle"],
    description: "A hand-packed box featuring a candle, mini notebook, and keepsake trinket — ready to gift.",
  },
  {
    id: "p11",
    name: "Engraved Keepsake Box",
    price: 24.5,
    originalPrice: 32.0,
    image: "/screenshots/image13.jpg",
    category: "gifts",
    tags: ["gift", "personalized"],
    description: "Wooden keepsake box with custom engraving option — a lasting home for small treasures.",
  },

  // Candles
  {
    id: "p12",
    name: "Lavender Soy Candle",
    price: 22.99,
    originalPrice: 29.99,
    image: "/screenshots/image4.jpg",
    category: "candles",
    tags: ["candle", "relaxing"],
    description: "Hand-poured soy candle with calming lavender and chamomile notes, 45-hour burn time.",
    featured: true,
  },
  {
    id: "p13",
    name: "Amber & Sandalwood Candle",
    price: 26.0,
    originalPrice: 32.0,
    image: "/screenshots/image14.jpg",
    category: "candles",
    tags: ["candle", "cozy", "gift"],
    description: "Warm amber and sandalwood blend in a reusable ceramic vessel — a signature scent for any room.",
  },

  // Watches & Clocks
  {
    id: "p14",
    name: "Classic Leather Strap Watch",
    price: 119.99,
    originalPrice: 149.99,
    image: "/screenshots/image5.jpg",
    category: "watches",
    tags: ["watch", "classic", "gift"],
    description: "Minimalist analog watch with a genuine leather strap and sapphire-coated crystal face.",
    featured: true,
  },
  {
    id: "p15",
    name: "Modern Wall Clock",
    price: 32.5,
    originalPrice: 42.0,
    image: "/screenshots/image15.jpg",
    category: "watches",
    tags: ["clock", "home"],
    description: "Silent-sweep wall clock with a walnut frame — a clean, modern addition to any room.",
  },
];

export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export const CATEGORY_LABELS = {
  women: "Women",
  men: "Men",
  jewelry: "Jewelry",
  gifts: "Gifts",
  candles: "Candles",
  watches: "Watches & Clocks",
};