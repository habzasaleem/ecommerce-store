import { Truck, RotateCcw, Lock, Headphones } from "lucide-react";

const FEATURES = [
  { icon: Truck, title: "Free Shipping", subtitle: "On orders over $50" },
  { icon: RotateCcw, title: "Easy Returns", subtitle: "30 days return policy" },
  { icon: Lock, title: "Secure Payment", subtitle: "100% secure checkout" },
  { icon: Headphones, title: "24/7 Support", subtitle: "We are always here" },
];

export default function FeatureBar() {
  return (
    <section className="px-6 lg:px-12 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-[#EAF0F7]">
      {FEATURES.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="flex items-center gap-3">
          <Icon size={26} className="text-[#1C2B4A] shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[#1C2B4A]">{title}</p>
            <p className="text-xs text-[#6B7A99]">{subtitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}