"use client";

import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Jobs from "@/components/Jobs/Jobs";
import Featured from "@/components/Featured/Featured";

export default function HomePage() {
  return (
    <main id="content">
      <Hero />
      <About />
      <Jobs />
      <Featured />
    </main>
  );
}
