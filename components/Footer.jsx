"use client";

import { useState } from "react";
import { Facebook, Instagram, Youtube, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const COLUMNS = [
  {
    title: "Shop",
    links: [
      { label: "Women", href: "/products/women" },
      { label: "Men", href: "/products/men" },
      { label: "Jewelry", href: "/products/jewelry" },
      { label: "Gifts", href: "/products/gifts" },
      { label: "Candles", href: "/products/candles" },
      { label: "Watches & Clocks", href: "/products/watches" },
    ],
  },
  {
    title: "Customer Care",
    links: [
      { label: "Contact Us", href: "/#contact", isAnchor: true },
      { label: "Shipping Policy", href: "/about" },
      { label: "Returns & Refunds", href: "/about" },
      { label: "FAQs", href: "/about" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "About Dazzle", href: "/about" },
      { label: "Terms & Conditions", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
    ],
  },
];

// Replace this query with your real store address (or "lat,lng").
// Format stays: https://maps.google.com/maps?q=YOUR_ADDRESS&z=15&output=embed
const MAP_EMBED_SRC =
  "https://maps.google.com/maps?q=New%20York%2C%20NY&z=13&output=embed";

function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire this up to your real contact/send-message endpoint
    setSent(true);
    // Reset form after submission
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section id="contact" className="bg-[#EAF0F7] px-6 lg:px-12 py-10 scroll-mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact form */}
        <div>
          <h3 className="font-serif text-xl text-[#1C2B4A] mb-4">Get in Touch</h3>
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
            <div>
              <label htmlFor="contact-name" className="sr-only">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-[#D7DFEA] text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-[#D7DFEA] text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                placeholder="Your message"
                value={form.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-md border border-[#D7DFEA] text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#1C2B4A] resize-none"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-[#1C2B4A] text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
            >
              <Send size={16} />
              Send Message
            </button>
            {sent && (
              <p role="status" className="text-sm text-[#1C2B4A]">
                Thanks — we'll get back to you soon.
              </p>
            )}
          </form>
        </div>

        {/* Real map */}
        <div className="rounded-lg overflow-hidden min-h-[280px] border border-[#D7DFEA]">
          <iframe
            title="Dazzle store location"
            src={MAP_EMBED_SRC}
            className="w-full h-full min-h-[280px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

function FooterLinks() {
  const router = useRouter();

  const handleContactClick = (e) => {
    e.preventDefault();
    // If we're on the homepage, scroll to contact section
    if (window.location.pathname === "/") {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push("/#contact");
    }
  };

  return (
    <div className="px-6 lg:px-12 py-10 bg-white">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-[#1C2B4A] mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      onClick={handleContactClick}
                      className="text-sm text-[#6B7A99] hover:text-[#1C2B4A] transition-colors cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7A99] hover:text-[#1C2B4A] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // TODO: wire this up to your actual subscribe endpoint
    setSubscribed(true);
    setEmail("");
  }

  return (
    <div className="bg-[#EAF0F7] px-6 lg:px-12 py-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-xl text-[#1C2B4A] mb-1">Join Our Newsletter</h3>
          <p className="text-sm text-[#3A4A6B]">
            Get updates on new arrivals and exclusive discounts.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full max-w-md">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-l-md border border-[#D7DFEA] text-sm focus:outline-none focus:ring-1 focus:ring-[#1C2B4A]"
          />
          <button
            type="submit"
            className="bg-[#1C2B4A] text-white px-6 py-3 rounded-r-md text-sm font-medium hover:bg-[#2A3E63] transition-colors"
          >
            Subscribe
          </button>
        </form>

        <div className="flex gap-4">
          {[Facebook, Instagram, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="Social link"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#1C2B4A] hover:bg-[#1C2B4A] hover:text-white transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      {subscribed && (
        <p role="status" className="text-sm text-[#1C2B4A] mt-3">
          Thanks — you're subscribed!
        </p>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer>
      <ContactSection />
      <FooterLinks />
      <NewsletterBar />
      <div className="px-6 lg:px-12 py-5 bg-white border-t border-[#EAF0F7] text-center">
        <span className="text-xs text-[#6B7A99]">
          © {new Date().getFullYear()} Dazzle. All rights reserved.
        </span>
      </div>
    </footer>
  );
}