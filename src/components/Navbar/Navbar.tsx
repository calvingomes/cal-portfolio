"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styled, { css } from "styled-components";
import { navLinks } from "@/config";
import { useScrollDirection } from "@/hooks";
import Menu from "@components/Menu/Menu";

const StyledHeader = styled.header<{ $scrollDirection: "up" | "down"; $scrolledToTop: boolean; $mounted: boolean }>`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background-color: rgba(10, 25, 47, 0.85);
  backdrop-filter: blur(10px);
  transition: var(--transition);

  opacity: ${({ $mounted }) => ($mounted ? 1 : 0)};
  transform: ${({ $mounted }) => ($mounted ? "translateY(0px)" : "translateY(-20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease, var(--transition);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${({ $scrollDirection, $scrolledToTop }) =>
    $scrollDirection === "up" &&
    !$scrolledToTop &&
    css`
        height: var(--nav-scroll-height);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `}

    ${({ $scrollDirection, $scrolledToTop }) =>
    $scrollDirection === "down" &&
    !$scrolledToTop &&
    css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `}
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};

    a {
      color: var(--green);
      width: 42px;
      height: 42px;
      position: relative;
      z-index: 1;

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;

        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-4px, -4px);
      }
    }
  }
`;

const StyledLinks = styled.div<{ $mounted: boolean }>`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }

  opacity: ${({ $mounted }) => ($mounted ? 1 : 0)};
  transform: ${({ $mounted }) => ($mounted ? "translateY(0px)" : "translateY(-10px)")};
  transition: opacity 0.6s ease, transform 0.6s ease;

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      margin: 0 5px;
      counter-increment: item 1;

      a {
        padding: 10px;

        &:before {
          content: "0" counter(item) ".";
          margin-right: 5px;
          color: var(--green);
          font-size: var(--fz-xxs);
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    opacity: ${({ $mounted }) => ($mounted ? 1 : 0)};
    transition: opacity 0.7s ease;
  }
`;

const Navbar = () => {
  const scrollDirection = useScrollDirection() ?? "up";
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const mounted = true;

  useEffect(() => {
    const onScroll = () => {
      setScrolledToTop(window.pageYOffset < 50);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <StyledHeader $scrollDirection={scrollDirection} $scrolledToTop={scrolledToTop} $mounted={mounted}>
      <StyledNav>
        <div className="logo" tabIndex={-1}>
          <Link href="/" aria-label="home">
            Calvin Gomes
          </Link>
        </div>

        <StyledLinks $mounted={mounted}>
          <ol>
            {navLinks.map(({ url, name }, i) => (
              <li key={i}>
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ol>

          <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </StyledLinks>

        <Menu />
      </StyledNav>
    </StyledHeader>
  );
};

export default Navbar;
