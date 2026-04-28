"use client";

import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import Manifesto from "./components/Manifesto";
import Approach from "./components/Approach";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Process from "./components/Process";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Manifesto />
        <Approach />
        <Projects />
        <Stack />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
