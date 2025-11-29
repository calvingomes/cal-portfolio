"use client";

import styles from "./Footer.module.css";
import Icon from "@/components/icons/icon";
import { socialMedia } from "@/config";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        <ul className={styles.ul}>
          {socialMedia.map(({ name, url }, i) => (
            <li key={i}>
              <a href={url} aria-label={name}>
                <Icon name={name} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.credit} tabIndex={-1}>
        <a href="">
          <div>Designed and Built by Calvin with Next.js</div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
