"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import { usePrefersReducedMotion } from "@/hooks";

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px),
    (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;
  }

  h2.big-heading,
  h3.big-heading {
    margin: 0;
  }

  h3.big-heading {
    color: var(--slate);
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  /* Fade-up animation */
  .fadeup {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.6s ease forwards;
  }

  @keyframes fadeUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Hero = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return <StyledHeroSection />;

  const one = <h1 key="1">{`Hey there, I'm`}</h1>;
  const two = (
    <h2 key="2" className="big-heading">
      Calvin Gomes.
    </h2>
  );
  const three = (
    <h3 key="3" className="big-heading">
      I build great experiences for the web.
    </h3>
  );
  const four = (
    <p key="4">
      I love building fast, reliable, and accessible stuff for the web.
      I focus on making sure complex ideas turn into smooth, user-friendly
      digital experiences. Currently, {`I'm`} contributing to projects with the
      excellent team at{" "}
      <a href="https://bolser.co.uk/" target="_blank" rel="noreferrer">
        Bolser Digital Agency
      </a>
      .
    </p>
  );
  const five = (
    <a
      key="5"
      className="email-link"
      href="mailto:calvingomes045@gmail.com"
      rel="noreferrer"
    >
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion
        ? items
        : items.map((item, i) => (
          <div
            key={i}
            className="fadeup"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
          >
            {item}
          </div>
        ))}
    </StyledHeroSection>
  );
};

export default Hero;
