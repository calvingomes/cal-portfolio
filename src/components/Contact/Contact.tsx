"use client";

import { useEffect, useRef } from "react";
import loadScrollReveal from "@/utils/sr";
import { srConfig, email } from "@/config";
import { usePrefersReducedMotion } from "@/hooks";
import styles from "./Contact.module.css";

const Contact = () => {
  const revealContainer = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    (async () => {
      const sr = await loadScrollReveal();
      if (revealContainer.current) {
        sr.reveal(revealContainer.current, srConfig());
      }
    })();
  }, [prefersReducedMotion]);

  return (
    <section
      id="contact"
      className={styles.contactSection}
      ref={(el) => {
        revealContainer.current = el;
      }}
    >
      <h2 className={`numbered-heading ${styles.overline}`}>What’s Next?</h2>

      <h2 className={styles.title}>Get In Touch</h2>

      <p>
        I’m always interested in hearing about new challenges, high-traffic
        solutions, or how we can make the web more accessible. If you have a
        question or an opportunity you’d like to discuss, feel free to drop a
        line!
      </p>

      <a className={styles.emailLink} href={`mailto:${email}`}>
        Say Hi!
      </a>
    </section>
  );
};

export default Contact;
