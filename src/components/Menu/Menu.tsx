"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { navLinks } from "@/config";
import { KEY_CODES } from "@/utils";
import { useOnClickOutside } from "@/hooks";

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const StyledHamburgerButton = styled.button<{ $menuOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: relative;
    z-index: 10;
    margin-right: -15px;
    padding: 15px;
    border: 0;
    background: transparent;
    color: inherit;
    text-transform: none;
    transition: opacity 0.15s linear, filter 0.15s linear;
  }

  .ham-box {
    position: relative;
    width: var(--hamburger-width);
    height: 24px;
  }

  .ham-box-inner {
    position: absolute;
    top: 50%;
    right: 0;
    width: var(--hamburger-width);
    height: 2px;
    border-radius: var(--border-radius);
    background-color: var(--green);
    transform: rotate(${props => (props.$menuOpen ? "225deg" : "0deg")});
    transition: transform 0.22s;

    &:before,
    &:after {
      content: "";
      position: absolute;
      right: 0;
      width: var(--hamburger-width);
      height: 2px;
      border-radius: 4px;
      background-color: var(--green);
      transition: transform 0.15s ease;
    }

    &:before {
      top: ${props => (props.$menuOpen ? "0" : "-10px")};
      opacity: ${props => (props.$menuOpen ? 0 : 1)};
    }

    &:after {
      bottom: ${props => (props.$menuOpen ? "0" : "-10px")};
      transform: rotate(${props => (props.$menuOpen ? "-90deg" : "0")});
    }
  }
`;

const StyledSidebar = styled.aside<{ $menuOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.flexCenter};
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    padding: 50px 10px;
    width: min(75vw, 400px);
    height: 100vh;
    background-color: var(--light-navy);
    box-shadow: -10px 0 30px -15px var(--navy-shadow);
    z-index: 9;
    transform: translateX(${props => (props.$menuOpen ? "0" : "100vw")});
    visibility: ${props => (props.$menuOpen ? "visible" : "hidden")};
    transition: var(--transition);
  }

  nav {
    ${({ theme }) => theme.mixins.flexBetween};
    width: 100%;
    flex-direction: column;
    text-align: center;
  }

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;

    li {
      margin: 0 auto 20px;
      counter-increment: item 1;
      font-size: clamp(var(--fz-sm), 4vw, var(--fz-lg));

      &:before {
        content: "0" counter(item) ".";
        display: block;
        margin-bottom: 5px;
        color: var(--green);
      }
    }

    @media (max-width: 600px) {
      li {
        margin: 0 auto 10px;
      }
    }

    a {
      ${({ theme }) => theme.mixins.link};
      width: 100%;
      padding: 3px 20px 20px;
    }
  }

  .resume-link {
    ${({ theme }) => theme.mixins.bigButton};
    padding: 18px 50px;
    margin: 10% auto 0;
    width: max-content;
  }
`;

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef as React.RefObject<HTMLElement>, () => setMenuOpen(false));

  // Toggle body blur
  useEffect(() => {
    document.body.classList.toggle("blur", menuOpen);
  }, [menuOpen]);

  // Keyboard: ESC to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KEY_CODES.ESCAPE || e.key === KEY_CODES.ESCAPE_IE11) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  // Close menu when resizing out of mobile breakpoint
  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      if ((e.target as Window).innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <StyledMenu>
      <div ref={wrapperRef}>
        <StyledHamburgerButton
          onClick={toggleMenu}
          $menuOpen={menuOpen}
          ref={buttonRef}
          aria-label="Menu"
        >
          <div className="ham-box">
            <div className="ham-box-inner" />
          </div>
        </StyledHamburgerButton>

        <StyledSidebar $menuOpen={menuOpen} aria-hidden={!menuOpen}>
          <nav ref={navRef}>
            <ol>
              {navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link href={url} onClick={() => setMenuOpen(false)}>
                    {name}
                  </Link>
                </li>
              ))}
            </ol>

            <a href="/resume.pdf" className="resume-link">
              Resume
            </a>
          </nav>
        </StyledSidebar>
      </div>
    </StyledMenu>
  );
};

export default Menu;
