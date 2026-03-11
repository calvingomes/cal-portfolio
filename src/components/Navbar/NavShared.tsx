"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/config";
import navbarStyles from "./Navbar.module.css";

export const NavLogo = () => (
  <div className={navbarStyles.logo} tabIndex={-1}>
    <Link href="/" aria-label="home">
      <Image
        src="/images/my-photo.webp"
        loading="lazy"
        alt="My Photo"
        width={70}
        height={70}
        className={navbarStyles.logoImage}
      />
    </Link>
  </div>
);

export const NavListItems = ({ liClassName }: { liClassName: string }) => (
  <>
    {navLinks.map(({ url, name }, i) => (
      <li key={i} className={liClassName}>
        <Link href={url}>{name}</Link>
      </li>
    ))}
  </>
);

export const ResumeButton = ({
  className,
  onClick,
}: {
  className: string;
  onClick: () => void;
}) => (
  <a
    className={className}
    aria-label="resume"
    href="/api/resume"
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
  >
    RESUME
  </a>
);
