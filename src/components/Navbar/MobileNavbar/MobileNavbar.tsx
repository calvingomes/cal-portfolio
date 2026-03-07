"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/config";
import { X } from "lucide-react";

import styles from "./MobileNavbar.module.css";
import navbarStyles from './../Navbar.module.css'

const MobileNavbar = ({ fireResumeDownloadEvent }: { fireResumeDownloadEvent: (location?: string) => void }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={styles.mobileNavContainer}>
      {!menuOpen &&
        <div className={styles.mobileNav}>
          <div className={navbarStyles.logo} tabIndex={-1}>
            <Link href="/" aria-label="home">
              <Image
                src="/images/my-photo.webp"
                alt="My Photo"
                width={70}
                height={70}
                className={navbarStyles.logoImage}
              />
            </Link>
          </div>

          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            MENU
          </button>
        </div>
      }

      <div className={`${styles.menuItems} ${menuOpen ? styles.open : ""}`}>
        <button
          className={styles.closeButton}
          onClick={toggleMenu}
          aria-label="Close"
        >
          <X size={35} />
        </button>

        <ol className={styles.ol}>
          {navLinks.map(({ url, name }, i) => (
            <li key={i} className={styles.li}>
              <Link href={url}>{name}</Link>
            </li>
          ))}
        </ol>

        <Link
          className={styles.resumeButton}
          aria-label="resume"
          href="/api/resume"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => fireResumeDownloadEvent('mobile-navbar')}
        >
          RESUME
        </Link>
      </div>
    </nav>
  );
}

export default MobileNavbar;