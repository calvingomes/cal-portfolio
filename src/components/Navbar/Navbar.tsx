"use client";

import { sendGTMEvent } from "@next/third-parties/google";

import DesktopNavbar from "./DesktopNavbar/DesktopNavbar";
import MobileNavbar from "./MobileNavbar/MobileNavbar";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const fireResumeDownloadEvent = (location = 'desktop-navbar') => {
    sendGTMEvent({
      event: "resume_download",
      location: location,
    });
  };
  return (
    <header className={styles.header}>
      <DesktopNavbar fireResumeDownloadEvent={fireResumeDownloadEvent} />
      <MobileNavbar fireResumeDownloadEvent={fireResumeDownloadEvent} />
    </header>
  );
};

export default Navbar;
