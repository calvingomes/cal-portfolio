"use client";

import { NavLogo, NavListItems, ResumeButton } from "../NavShared";
import styles from "./DesktopNavbar.module.css";

const DesktopNavbar = ({ fireResumeDownloadEvent }: { fireResumeDownloadEvent: (location?: string) => void }) => {
  return (
    <nav className={styles.desktopNav}>
      <NavLogo />

      <div className={styles.links}>
        <ol className={styles.ol}>
          <NavListItems liClassName={styles.li} />
        </ol>
      </div>

      <ResumeButton
        className={styles.resumeButton}
        onClick={() => fireResumeDownloadEvent('desktop-navbar')}
      />
    </nav>
  );
}

export default DesktopNavbar;