import HeroSlider from "@/components/HeroSlider";
import FeatureBar from "@/components/FeatureBar";
import CategoryGrid from "@/components/CategoryGrid";
import PromoBanners from "@/components/PromoBanners";
import TrendingProducts from "@/components/TrendingProducts";
import DealOfDay from "@/components/DealOfDay";


export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeatureBar />
      <CategoryGrid />
      <PromoBanners />
      <TrendingProducts />
      <DealOfDay />
      
    </>
  );
}