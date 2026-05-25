import CustomCursor from "./components/CustomCursor";
import LenisScroll from "./components/LenisScroll";
import Hero from "./components/Hero";
import BrandStory from "./components/BrandStory";
import ProductExperience from "./components/ProductExperience";
import Technology from "./components/Technology";
import CaseStudy from "./components/CaseStudy";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      {/* 1. Custom Intuitive Trailing Cursor */}
      <CustomCursor />

      {/* 2. Global Grain Overlay for Cinematic Texture */}
      <div className="grain-overlay" />

      {/* 3. Smooth Scrolling Logic */}
      <LenisScroll />

      {/* 4. Main Page Structure (loads immediately for instant reveal) */}
      <main className="w-full relative flex flex-col bg-[#020204]">
        <Hero />
        <BrandStory />
        <ProductExperience />
        <Technology />
        <CaseStudy />
        <Testimonials />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
