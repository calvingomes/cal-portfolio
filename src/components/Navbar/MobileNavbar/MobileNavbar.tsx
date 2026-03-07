"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { NavLogo, NavListItems, ResumeButton } from "../NavShared";

import styles from "./MobileNavbar.module.css";

const MobileNavbar = ({ fireResumeDownloadEvent }: { fireResumeDownloadEvent: (location?: string) => void }) => {

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className={styles.mobileNavContainer}>
      {!menuOpen &&
        <div className={styles.mobileNav}>
          <NavLogo />

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
          <NavListItems liClassName={styles.li} />
        </ol>

        <ResumeButton
          className={styles.resumeButton}
          onClick={() => fireResumeDownloadEvent('mobile-navbar')}
        />
      </div>
    </nav>
  );
}

export default MobileNavbar;