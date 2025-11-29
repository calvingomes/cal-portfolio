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
    "Vue.js",
    "Next.js",
    "Astro",
    "JavaScript (ES6+)",
    "TypeScript",
    "Node.js",
  ];

  return (
    <section id="about" className={styles.aboutSection} ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className={styles.inner}>
        <div className={styles.text}>
          <p>
            Hello! My name is Calvin blah blah about HTML &amp; CSS!
          </p>

          <p>
            Fast-forward to today, and I’ve had the privilege of working at{" "}
            <a href="">an advertising agency</a>, <a href="">a start-up</a>,{" "}
            <a href="">a huge corporation</a>, and{" "}
            <a href="">a student-led design studio</a>. My main focus these days
            is building accessible, inclusive products and digital experiences
            at <a href="">Upstatement</a> for a variety of clients.
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
              src="/images/my-photo.jpg"
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
