"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/config";

import styles from "./DesktopNavbar.module.css";
import navbarStyles from './../Navbar.module.css'

const DesktopNavbar = ({ fireResumeDownloadEvent }: { fireResumeDownloadEvent: (location?: string) => void }) => {
  return (
    <nav className={styles.desktopNav}>
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

      <div className={styles.links}>
        <ol className={styles.ol}>
          {navLinks.map(({ url, name }, i) => {
            return (
              <li key={i} className={styles.li}>
                <Link
                  href={url}
                >
                  {name}
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      <Link
        className={styles.resumeButton}
        aria-label="resume"
        href="/api/resume"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => fireResumeDownloadEvent('desktop-navbar')}

      >
        RESUME
      </Link>
    </nav>
  );
}

export default DesktopNavbar;