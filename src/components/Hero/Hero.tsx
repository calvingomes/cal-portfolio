"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { usePrefersReducedMotion } from "@/hooks";

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return <section className={styles.heroSection} />;

  const one = <h1 key="1">{`Hey there, I'm`}</h1>;
  const two = (
    <h2 key="2" className="big-heading">
      Calvin Gomes.
    </h2>
  );
  const three = (
    <h3 key="3" className="big-heading">
      I build great experiences for the web.
    </h3>
  );
  const four = (
    <p key="4">
      I love building fast, reliable, and accessible stuff for the web.
      I focus on making sure complex ideas turn into smooth, user-friendly
      digital experiences. Currently, {`I'm`} contributing to projects with the
      excellent team at{" "}
      <a href="https://bolser.co.uk/" target="_blank" rel="noreferrer">
        Bolser Digital Agency
      </a>
      .
    </p>
  );
  const five = (
    <a
      key="5"
      className={styles.emailLink}
      href="mailto:calvingomes045@gmail.com"
      rel="noreferrer"
    >
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <section className={styles.heroSection}>
      {prefersReducedMotion
        ? items
        : items.map((item, i) => (
          <div
            key={i}
            className={styles.fadeup}
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            {item}
          </div>
        ))}
    </section>
  );
};

export default Hero;
