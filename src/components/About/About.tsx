"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./About.module.css";
import { srConfig } from "@/config";
import loadScrollReveal from "@/utils/sr";
import { usePrefersReducedMotion } from "@/hooks";

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!revealContainer.current) return;

    (async () => {
      const srInstance = await loadScrollReveal();
      srInstance.reveal(revealContainer.current!, srConfig());
    })();
  }, [prefersReducedMotion]);

  const skills = [
    "React",
    "Next.js",
    "Vue.js",
    "Astro",
    "TypeScript",
    "JavaScript (ES6+)",
    "GraphQL",
    "Strapi",
    "Contentful",
    "Wordpress",
  ];

  return (
    <section id="about" className={styles.aboutSection} ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className={styles.inner}>
        <div className={styles.text}>
          <p>
            Hi! I’m Calvin, and my passion lies in engineering high-performance,
            scalable web solutions. As a frontend specialist with over six years
            of experience, I thrive on crafting component-driven architectures
            for diverse platforms.
          </p>

          <p>
            My technical journey began in 2017 as a freelancer, where I learned
            to build SEO-friendly, mobile-first websites. That foundation led to
            product engineering roles across a{" "}
            <a href="https://codingmart.com/" target="_blank" rel="noreferrer">
              product-centric consulting firm
            </a>
            , a{" "}
            <a
              href="https://www.uenergysolar.co.uk/"
              target="_blank"
              rel="noreferrer"
            >
              renewable energy company
            </a>
            , and a{" "}
            <a href="https://bolser.co.uk/" target="_blank" rel="noreferrer">
              full-service digital agency
            </a>
            , delivering scalable, user-focused web applications.
          </p>

          <p>
            I specialize in modern UI engineering, taking abstract concepts and
            realizing them as reliable, seamless user experiences across
            high-traffic environments.
          </p>

          <p>Here are a few technologies I’ve been working with recently:</p>

          <ul className={styles.skillsList}>
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className={styles.pic}>
          <div className={styles.wrapper}>
            <Image
              src="/images/my-photo.webp"
              alt="My Photo"
              width={300}
              height={300}
              priority
              className={styles.img}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
