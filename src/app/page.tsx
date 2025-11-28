"use client";

import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Jobs from "@/components/Jobs/Jobs";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Jobs />
    </main>
  );
}
