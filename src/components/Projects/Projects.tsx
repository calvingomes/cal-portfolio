"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import loadScrollReveal from "@/utils/sr";
import { srConfig } from "@/config";
import { Icon } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks";
import projectsData from "@/content/projects.json";
import styles from "./Projects.module.css";

const Projects = () => {
  const revealTitle = useRef<HTMLHeadingElement | null>(null);
  const revealArchive = useRef<HTMLDivElement | null>(null);
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

  const filteredProjects = projectsData.filter(
    (p) => p.showInProjects !== false,
  );
  const sorted = [...filteredProjects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const firstSix = sorted.slice(0, GRID_LIMIT);
  const projectsToShow = firstSix;

  const renderProject = (project: any) => {
    const { title, tech, github, external, description } = project;

    return (
      <div className={styles.projectInner}>
        <header>
          <div className={styles.projectTop}>
            <div className={styles.folder}>
              <Icon name="Folder" />
            </div>

            <div className={styles.projectLinks}>
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className={styles.external}
                  target="_blank"
                >
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className={styles.projectTitle}>
            <a href={external} target="_blank">
              {title}
            </a>
          </h3>

          <div
            className={styles.projectDescription}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </header>

        <footer>
          {tech && (
            <ul className={styles.projectTechList}>
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
    <div className={styles.projectsSection}>
      <h2 ref={revealTitle}>Other Noteworthy Projects</h2>

      <ul className={styles.projectsGrid}>
        {projectsToShow.map((project, i) => (
          <li
            key={i}
            className={styles.project}
            ref={(el) => {
              revealProjects.current[i] = el!;
            }}
          >
            {renderProject(project)}
          </li>
        ))}
      </ul>

      <div ref={revealArchive}>
        <Link href="/archive" className={styles.moreButton}>
          view the archive
        </Link>
      </div>
    </div>
  );
};

export default Projects;
