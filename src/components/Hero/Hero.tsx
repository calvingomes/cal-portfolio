"use client";

import { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import { usePrefersReducedMotion } from "@/hooks";
import { pushDL } from "@/lib/datalayer";

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  const fireSendEmailEvent = () => {
    pushDL("send_email", {
      location: "hero",
    });
  };

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return <section className={styles.heroSection} />;

  const one = <h1 key="1">{`Hi, I'm`}</h1>;
  const two = (
    <h2 key="2" className="big-heading">
      Calvin Gomes.
    </h2>
  );
  const three = (
    <h3 key="3" className="medium-heading">
      I build great things for the web.
    </h3>
  );
  const four = (
    <p key="4">
      I build fast, reliable, and accessible solutions. I focus on turning
      complex ideas into smooth, user-friendly digital products. I’ve
      contributed to projects alongside excellent teams, including{" "}
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
      onClick={() => fireSendEmailEvent()}
    >
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <section id="home" className={styles.heroSection}>
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
