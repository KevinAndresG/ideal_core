import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Marquee } from "@/components/home/Marquee";
import { CustomizerTeaser } from "@/components/home/CustomizerTeaser";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Marquee />
      <FeaturedProducts />
      <CustomizerTeaser />
      <Testimonials />
    </>
  );
}
