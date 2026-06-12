import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Marquee } from "@/components/home/Marquee";
import { CustomizerTeaser } from "@/components/home/CustomizerTeaser";
import { Testimonials } from "@/components/home/Testimonials";
import { getFeaturedProducts } from "@/lib/data/products";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <Hero />
      {/* <Categories /> */}
      <Marquee />
      <FeaturedProducts featured={featured} />
      <CustomizerTeaser />
      <Testimonials />
    </>
  );
}
