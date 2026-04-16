"use client";

import CustomCursor from "./components/CustomCursor";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Approach from "./components/Approach";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Approach />
        <Projects />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
