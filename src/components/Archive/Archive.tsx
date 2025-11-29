"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";
import loadScrollReveal from "@/utils/sr";
import { srConfig } from "@/config";
import { Icon } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks";
import projectsData from "@/content/projects.json";

/* ----------------------- STYLES (UNCHANGED) ----------------------- */

const StyledTableContainer = styled.div`
  margin: 100px -20px;

  @media (max-width: 768px) {
    margin: 50px -10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    .hide-on-mobile {
      @media (max-width: 768px) {
        display: none;
      }
    }

    tbody tr {
      &:hover,
      &:focus {
        background-color: var(--light-navy);
      }
    }

    th,
    td {
      padding: 10px;
      text-align: left;

      &:first-child {
        padding-left: 20px;

        @media (max-width: 768px) {
          padding-left: 10px;
        }
      }
      &:last-child {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
        }
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    tr {
      cursor: default;

      td:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      td:last-child {
        border-top-right-radius: var(--border-radius);
        border-bottom-right-radius: var(--border-radius);
      }
    }

    td {
      &.year {
        padding-right: 20px;

        @media (max-width: 768px) {
          padding-right: 10px;
          font-size: var(--fz-sm);
        }
      }

      &.title {
        padding-top: 15px;
        padding-right: 20px;
        color: var(--lightest-slate);
        font-size: var(--fz-xl);
        font-weight: 600;
        line-height: 1.25;
      }

      &.company {
        font-size: var(--fz-lg);
        white-space: nowrap;
      }

      &.tech {
        font-size: var(--fz-xxs);
        font-family: var(--font-mono);
        line-height: 1.5;

        .separator {
          margin: 0 5px;
        }
        span {
          display: inline-block;
        }
      }

      &.links {
        min-width: 100px;

        div {
          display: flex;
          align-items: center;

          a {
            ${({ theme }) => theme.mixins.flexCenter};
            flex-shrink: 0;
          }

          a + a {
            margin-left: 10px;
          }
        }
      }
    }
  }
`;

/* ----------------------- COMPONENT ----------------------- */

const Archive = () => {
  const revealTitle = useRef<HTMLElement | null>(null);
  const revealTable = useRef<HTMLElement | null>(null);
  const revealRows = useRef<HTMLElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    (async () => {
      const sr = await loadScrollReveal();

      if (revealTitle.current) sr.reveal(revealTitle.current, srConfig());
      if (revealTable.current) sr.reveal(revealTable.current, srConfig(200, 0));

      revealRows.current.forEach((row, i) => {
        if (row) sr.reveal(row, srConfig(i * 10));
      });
    })();
  }, [prefersReducedMotion]);

  const sorted = [...projectsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <>
      <header
        ref={(el) => {
          revealTitle.current = el;
        }}
      >
        <h1 className="big-heading">Archive</h1>
        <p className="subtitle">A big list of things I’ve worked on</p>
      </header>

      <StyledTableContainer
        ref={(el) => {
          revealTable.current = el;
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th className="hide-on-mobile">Made at</th>
              <th className="hide-on-mobile">Built with</th>
              <th>Link</th>
            </tr>
          </thead>

          <tbody>
            {sorted.map((project, i) => (
              <tr
                key={i}
                ref={(el) => {
                  revealRows.current[i] = el!;
                }}
              >
                <td className="overline year">
                  {new Date(project.date).getFullYear()}
                </td>

                <td className="title">{project.title}</td>

                <td className="company hide-on-mobile">
                  {project.company || "—"}
                </td>

                <td className="tech hide-on-mobile">
                  {project.tech?.length > 0 &&
                    project.tech.map((t, idx) => (
                      <span key={idx}>
                        {t}
                        {idx !== project.tech.length - 1 && (
                          <span className="separator">&middot;</span>
                        )}
                      </span>
                    ))}
                </td>

                <td className="links">
                  <div>
                    {project.external && (
                      <a href={project.external} aria-label="External Link">
                        <Icon name="External" />
                      </a>
                    )}

                    {project.github && (
                      <a href={project.github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableContainer>
    </>
  );
};

export default Archive;
