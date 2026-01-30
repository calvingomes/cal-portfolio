"use client";

import { useState, useEffect } from "react";
import { pushDL } from "@/lib/datalayer";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { navLinks } from "@/config";
import { useScrollDirection, useActiveSection } from "@/hooks";
import Menu from "@components/Menu/Menu";

const Navbar = () => {
  const scrollDirection = useScrollDirection() ?? "up";
  const [scrolledToTop, setScrolledToTop] = useState(true);

  const getSectionId = (url: string) => url.split("#")[1] ?? "";
  const sectionIds = ["home", "about", "jobs", "projects", "contact"];
  const activeSection = useActiveSection(sectionIds);

  const fireResumeDownloadEvent = () => {
    pushDL("resume_download", {
      location: "desktop-navbar",
    });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolledToTop(window.pageYOffset < 70);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const headerClass = `${styles.header} ${
    scrollDirection === "up" && !scrolledToTop ? styles.scrollUp : ""
  } ${scrollDirection === "down" && !scrolledToTop ? styles.scrollDown : ""}`;

  return (
    <header className={headerClass}>
      <nav className={styles.nav}>
        <div className={styles.logo} tabIndex={-1}>
          <Link href="/" aria-label="home">
            Calvin Gomes
          </Link>
        </div>

        <div className={styles.links}>
          <ol className={styles.ol}>
            {navLinks.map(({ url, name }, i) => {
              const sectionId = getSectionId(url);
              const isActive = activeSection === sectionId;

              return (
                <li key={i} className={styles.li}>
                  <Link
                    href={url}
                    className={isActive ? styles.activeLink : ""}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ol>

          <a
            className={styles.resumeButton}
            href="/api/resume"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => fireResumeDownloadEvent()}
          >
            Resume
          </a>
        </div>

        <Menu />
      </nav>
    </header>
  );
};

export default Navbar;
