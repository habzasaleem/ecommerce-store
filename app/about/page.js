// app/about/page.js
"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Truck, RefreshCw, FileText, Heart, Star } from "lucide-react";

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does shipping take?",
      answer: "Orders are processed within 1-2 business days. Standard shipping takes 3-7 business days once shipped. You'll receive a tracking number via email when your order ships."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery for a full refund. Items must be unused and in their original packaging. Return shipping is free for orders over $50."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within the United States only. We're working on expanding our shipping capabilities to serve international customers soon."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can also track your order by logging into your account on our website."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay."
    },
    {
      question: "Can I change or cancel my order?",
      answer: "You can cancel or modify your order within 1 hour of placing it. Please contact our customer support team immediately for assistance with any changes."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#1C2B4A] px-6 lg:px-12 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">About Dazzle</h1>
          <p className="text-[#D4A937] text-lg md:text-xl">
            Where Quality Meets Elegance
          </p>
          <div className="w-20 h-1 bg-[#D4A937] mx-auto mt-4"></div>
        </div>
      </section>

      {/* About Section */}
      <section className="px-6 lg:px-12 py-16 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-3xl text-[#1C2B4A] mb-4">Our Story</h2>
            <div className="w-12 h-1 bg-[#D4A937] mb-4"></div>
            <p className="text-[#3A4A6B] leading-relaxed mb-4">
              Dazzle started as a small idea: shopping for gifts and everyday essentials shouldn't mean juggling five different tabs and five different checkouts.
            </p>
            <p className="text-[#3A4A6B] leading-relaxed">
              We built a single storefront that spans clothing, jewelry, watches, candles, and gifting — so you can find what you need and get back to your day. Every item on Dazzle is picked for how it looks, how it lasts, and whether it's worth your time.
            </p>
          </div>
          <div className="bg-[#EAF0F7] rounded-lg p-8 text-center">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-serif text-[#1C2B4A]">500+</p>
                <p className="text-sm text-[#6B7A99]">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#1C2B4A]">50+</p>
                <p className="text-sm text-[#6B7A99]">Products</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#1C2B4A]">6</p>
                <p className="text-sm text-[#6B7A99]">Categories</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-[#1C2B4A">⭐</p>
                <p className="text-sm text-[#6B7A99]">4.8/5 Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-[#EAF0F7] px-6 lg:px-12 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-[#1C2B4A] text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#EAF0F7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-[#D4A937]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#1C2B4A] mb-2">Quality First</h3>
              <p className="text-sm text-[#6B7A99]">We carefully curate every product to ensure the highest quality standards.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#EAF0F7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-[#D4A937]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#1C2B4A] mb-2">Customer Satisfaction</h3>
              <p className="text-sm text-[#6B7A99]">Your happiness is our priority. We're here to make your shopping experience exceptional.</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#EAF0F7] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-[#D4A937]" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-[#1C2B4A] mb-2">Trust & Transparency</h3>
              <p className="text-sm text-[#6B7A99]">We believe in honest pricing, clear policies, and building lasting relationships.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="px-6 lg:px-12 py-16 max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl text-[#1C2B4A] text-center mb-12">Our Policies</h2>
        
        <div className="space-y-6">
          {/* Shipping Policy */}
          <div className="border border-[#D7DFEA] rounded-lg overflow-hidden">
            <div className="bg-[#EAF0F7] px-6 py-4 flex items-center gap-3">
              <Truck className="text-[#1C2B4A]" size={20} />
              <h3 className="font-serif text-xl text-[#1C2B4A]">Shipping Policy</h3>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2 text-[#3A4A6B] leading-relaxed list-disc list-inside">
                <li>Free standard shipping on all orders over $50.</li>
                <li>Orders are processed within 1–2 business days.</li>
                <li>Standard delivery takes 3–7 business days once shipped.</li>
                <li>Expedited shipping options are available at checkout.</li>
                <li>You'll receive a tracking number via email once your order ships.</li>
              </ul>
            </div>
          </div>

          {/* Returns & Refunds */}
          <div className="border border-[#D7DFEA] rounded-lg overflow-hidden">
            <div className="bg-[#EAF0F7] px-6 py-4 flex items-center gap-3">
              <RefreshCw className="text-[#1C2B4A]" size={20} />
              <h3 className="font-serif text-xl text-[#1C2B4A]">Returns &amp; Refunds</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-[#3A4A6B] leading-relaxed mb-3">
                If something isn't right, you can return most items within 30 days of delivery for a full refund, provided they're unused and in their original packaging.
              </p>
              <ul className="space-y-2 text-[#3A4A6B] leading-relaxed list-disc list-inside">
                <li>Refunds are issued to your original payment method within 5–7 business days of receiving the return.</li>
                <li>Return shipping is free for all orders over $50.</li>
                <li>Items must be in their original condition with tags attached.</li>
                <li>Final sale items cannot be returned.</li>
              </ul>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="border border-[#D7DFEA] rounded-lg overflow-hidden">
            <div className="bg-[#EAF0F7] px-6 py-4 flex items-center gap-3">
              <FileText className="text-[#1C2B4A]" size={20} />
              <h3 className="font-serif text-xl text-[#1C2B4A]">Terms &amp; Conditions</h3>
            </div>
            <div className="px-6 py-4">
              <ul className="space-y-2 text-[#3A4A6B] leading-relaxed list-disc list-inside">
                <li>By using our website, you agree to these terms and conditions.</li>
                <li>All content on this site is the property of Dazzle and is protected by copyright.</li>
                <li>Prices and availability are subject to change without notice.</li>
                <li>We reserve the right to cancel any order due to pricing errors or stock availability.</li>
                <li>Your use of this website is subject to our privacy policy.</li>
              </ul>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="border border-[#D7DFEA] rounded-lg overflow-hidden">
            <div className="bg-[#EAF0F7] px-6 py-4 flex items-center gap-3">
              <Shield className="text-[#1C2B4A]" size={20} />
              <h3 className="font-serif text-xl text-[#1C2B4A]">Privacy Policy</h3>
            </div>
            <div className="px-6 py-4">
              <p className="text-[#3A4A6B] leading-relaxed mb-3">
                Your privacy is important to us. We collect and use your information only to provide and improve our services.
              </p>
              <ul className="space-y-2 text-[#3A4A6B] leading-relaxed list-disc list-inside">
                <li>We collect personal information you provide (name, email, address, payment details).</li>
                <li>We use your data to process orders, send updates, and improve our services.</li>
                <li>We never sell or share your personal information with third parties.</li>
                <li>You can unsubscribe from marketing emails at any time.</li>
                <li>We use secure encryption to protect your payment information.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#EAF0F7] px-6 lg:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-[#1C2B4A] text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-[#6B7A99] text-center mb-12">Find quick answers to the most common questions</p>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-[#D7DFEA]"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#EAF0F7] transition-colors"
                >
                  <span className="font-medium text-[#1C2B4A]">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="text-[#D4A937] flex-shrink-0" size={20} />
                  ) : (
                    <ChevronDown className="text-[#D4A937] flex-shrink-0" size={20} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-[#3A4A6B] leading-relaxed border-t border-[#D7DFEA] pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    <div>
      <br></br>
      <br></br>
    </div> 
    </div>
  );
}