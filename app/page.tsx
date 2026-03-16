"use client";

import SmoothScroll from "./components/SmoothScroll";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Projects from "./components/Projects";
import GeometricDivider from "./components/GeometricDivider";
import SectionReveal from "./components/SectionReveal";
import About from "./components/About";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ColorSelector from "./components/ColorSelector";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <ColorSelector />
      <Hero />
      <Marquee text="Laravel / React / TypeScript / Next.js" speed={25} outlined />
      <Projects />
      <GeometricDivider />
      <SectionReveal>
        <About />
      </SectionReveal>
      <Marquee text="Design / Code / Experience" speed={30} />
      <SectionReveal>
        <Stack />
      </SectionReveal>
      <GeometricDivider />
      <SectionReveal>
        <Contact />
      </SectionReveal>
      <Footer />
    </>
  );
}
