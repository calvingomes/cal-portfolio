"use client";

import { pushDL } from "@/lib/datalayer";

import styles from "./Footer.module.css";
import Icon from "@/components/icons/icon";
import { socialMedia } from "@/config";

const Footer = () => {
  const fireSocialMediaEvent = (fireEvent: string) => {
    pushDL("footer_links", {
      location: fireEvent,
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <ul className={styles.ul}>
          {socialMedia.map(({ name, url, fireEvent }, i) => (
            <li key={i}>
              <a
                href={url}
                aria-label={name}
                target="_blank"
                rel="noreferrer"
                onClick={() => fireSocialMediaEvent(fireEvent)}
              >
                <Icon name={name} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.credit} tabIndex={-1}>
        <a
          href="https://github.com/calvingomes/cal-portfolio"
          target="_blank"
          rel="noreferrer"
          onClick={() => fireSocialMediaEvent("github-repo")}
        >
          <div>Designed and Built by Calvin with Next.js</div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
