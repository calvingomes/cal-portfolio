"use client";

import { useEffect, useRef } from 'react';
import Image from "next/image";
import styled from 'styled-components';
import { srConfig } from '@/config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@/hooks';

const StyledAboutSection = styled.section`
  max-width: 900px;

  .inner {
    display: flex;
    gap: 50px;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;
const StyledText = styled.div`
  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  height: fit-content;

  @media (max-width: 768px) {
    margin: 50px auto 0;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 300px;
    height: auto;
    border-radius: var(--border-radius);
    background-color: var(--green);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!revealContainer.current) return;
    if (!sr) return;

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  const skills = ['React', 'Vue.js', 'Next.js', 'Astro', 'JavaScript (ES6+)', 'TypeScript', 'Node.js',];

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
          <div>
            <p>
              Hello! My name is Calvin blah blah
              about HTML &amp; CSS!
            </p>

            <p>
              Fast-forward to today, and I’ve had the privilege of working at{' '}
              <a href="">an advertising agency</a>,{' '}
              <a href="">a start-up</a>,{' '}
              <a href="">a huge corporation</a>, and{' '}
              <a href="">a student-led design studio</a>. My
              main focus these days is building accessible, inclusive products and digital
              experiences at <a href="">Upstatement</a> for a variety of
              clients.
            </p>

            <p>Here are a few technologies I’ve been working with recently:</p>
          </div>

          <ul className="skills-list">
            {skills && skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </StyledText>

        <StyledPic>
          <div className="wrapper">
            <Image
              src="/images/my-photo.jpg"
              alt="My Photo"
              width={300}
              height={300}
              priority
              style={{objectFit: 'cover', aspectRatio: '1/1'}}
            />
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;
