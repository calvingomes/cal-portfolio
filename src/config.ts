import type { IconName } from "@/components/icons";

export const email = "calvingomes045@gmail.com";

// Strictly typed social media items
export type SocialMediaItem = {
  name: IconName;
  url: string;
};


export const socialMedia: { name: IconName; url: string }[] = [
  { name: "GitHub", url: "https://github.com/calvingomes" },
  { name: "Linkedin", url: "https://www.linkedin.com/in/calvingomes045/" },
];


// Navigation items
export type NavLink = {
  name: string;
  url: string;
};

export const navLinks: NavLink[] = [
  { name: "About", url: "/#about" },
  { name: "Experience", url: "/#jobs" },
  { name: "Work", url: "/#projects" },
  { name: "Contact", url: "/#contact" },
];

// Colors (readonly: as const)
export const colors = {
  green: "#64ffda",
  navy: "#0a192f",
  darkNavy: "#020c1b",
} as const;

// ScrollReveal settings
export const srConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: "bottom",
  distance: "20px",
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  mobile: true,
  reset: false,
  useDelay: "always",
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
});
