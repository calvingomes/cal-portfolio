"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import loadScrollReveal from "@/utils/sr";
import { srConfig } from "@/config";
import { Icon } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks";
import projectsData from "@/content/projects.json";

const StyledProjectsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: clamp(24px, 5vw, var(--fz-heading));
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 15px;
    position: relative;
    margin-top: 50px;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }
`;

const StyledProject = styled.li`
  position: relative;
  cursor: default;
  transition: var(--transition);

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .project-inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: var(--border-radius);
    background-color: var(--light-navy);
    transition: var(--transition);
    overflow: auto;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;

    .folder {
      color: var(--green);
      svg {
        width: 40px;
        height: 40px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      margin-right: -10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    margin: 0 0 10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      position: static;

      &:before {
        content: "";
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    color: var(--light-slate);
    font-size: 17px;

    a {
      ${({ theme }) => theme.mixins.inlineLink};
    }
  }

  .project-tech-list {
    display: flex;
    align-items: flex-end;
    flex-grow: 1;
    flex-wrap: wrap;
    padding: 0;
    margin: 20px 0 0 0;
    list-style: none;

    li {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      line-height: 1.75;

      &:not(:last-of-type) {
        margin-right: 15px;
      }
    }
  }
`;

/* ---------------------  COMPONENT --------------------- */

const Projects = () => {
  const [showMore, setShowMore] = useState(false);

  const revealTitle = useRef<HTMLHeadingElement | null>(null);
  const revealArchive = useRef<HTMLAnchorElement | null>(null);
  const revealProjects = useRef<HTMLLIElement[]>([]);

  const prefersReducedMotion = usePrefersReducedMotion();

  /* ScrollReveal */
  useEffect(() => {
    if (prefersReducedMotion) return;

    (async () => {
      const sr = await loadScrollReveal();

      if (revealTitle.current) sr.reveal(revealTitle.current, srConfig());
      if (revealArchive.current) sr.reveal(revealArchive.current, srConfig());

      revealProjects.current.forEach((ref, i) => {
        if (ref) sr.reveal(ref, srConfig(i * 100));
      });
    })();
  }, [prefersReducedMotion]);

  const GRID_LIMIT = 6;

  const filteredProjects = projectsData.filter((p) => p.showInProjects !== false);

  const sorted = [...filteredProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const firstSix = sorted.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? sorted : firstSix;

  const renderProject = (project: any) => {
    const { title, tech, github, external, description } = project;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>

            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a href={external} aria-label="External Link" className="external" target="_blank">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank">
              {title}
            </a>
          </h3>

          <div
            className="project-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((t: string, i: number) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <Link href="/archive" className="inline-link archive-link" ref={revealArchive}>
        view the archive
      </Link>

      <ul className="projects-grid">
        {projectsToShow.map((project, i) => (
          <StyledProject
            key={i}
            ref={(el) => {
              revealProjects.current[i] = el!;
            }}
          >
            {renderProject(project)}
          </StyledProject>
        ))}
      </ul>

      <button className="more-button" onClick={() => setShowMore(!showMore)}>
        Show {showMore ? "Less" : "More"}
      </button>
    </StyledProjectsSection>
  );
};

export default Projects;