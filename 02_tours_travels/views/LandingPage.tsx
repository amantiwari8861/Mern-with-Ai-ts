import HeroSlider from "@/components/HeroSlider";
import Hero3DCarousel from "@/components/three-d/Hero3DCarousel";
import Collections from "@/views/Collections";

const LandingPage = () => {
  return (
    <div>
      <HeroSlider />
      <Hero3DCarousel />

      <section className="container mx-auto px-6 pt-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-(--secondary)">
          Signature Collections
        </p>
        <h2 className="mt-2 text-3xl font-bold text-(--primary) sm:text-4xl">
          Handpicked Destinations
        </h2>
      </section>

      <Collections />
    </div>
  );
};

export default LandingPage;
