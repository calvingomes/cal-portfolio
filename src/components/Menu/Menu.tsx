"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Menu.module.css";
import { navLinks } from "@/config";
import { KEY_CODES } from "@/utils";
import { useOnClickOutside } from "@/hooks";

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef as React.RefObject<HTMLElement>, () => setMenuOpen(false));

  // Toggle body blur
  useEffect(() => {
    document.body.classList.toggle("blur", menuOpen);
  }, [menuOpen]);

  // Keyboard: ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Close menu when resizing out of mobile breakpoint
  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      if ((e.target as Window).innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <div className={styles.menu}>
      <div ref={wrapperRef}>
        <button
          className={`${styles.hamburgerButton} ${menuOpen ? styles.open : ''}`}
          onClick={toggleMenu}
          ref={buttonRef}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <div className={styles.hamBox}>
            <div className={`${styles.hamBoxInner} ${menuOpen ? styles.open : ''}`} />
          </div>
        </button>

        <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ''}`} aria-hidden={!menuOpen}>
          <nav ref={navRef} className={styles.nav}>
            <ol className={styles.ol}>
              {navLinks.map(({ url, name }, i) => (
                <li key={i} className={styles.li}>
                  <Link href={url} onClick={() => setMenuOpen(false)} className={styles.link}>
                    {name}
                  </Link>
                </li>
              ))}
            </ol>

            <a href="/resume.pdf" className={styles.resumeLink}>
              Resume
            </a>
          </nav>
        </aside>
      </div>
    </div>
  );
};

export default Menu;
