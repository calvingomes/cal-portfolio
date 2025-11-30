"use client";

import { useEffect, useRef } from "react";
import loadScrollReveal from "@/utils/sr";
import { srConfig } from "@/config";
import { Icon } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks";
import featuredData from "@/content/featured.json";
import Projects from "../Projects/Projects";
import Image from "next/image";
import styles from "./Featured.module.css";

const Featured = () => {
  const revealTitle = useRef<HTMLHeadingElement | null>(null);
  const revealProjects = useRef<HTMLLIElement[]>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    (async () => {
      const sr = await loadScrollReveal();
      if (revealTitle.current) sr.reveal(revealTitle.current, srConfig());

      revealProjects.current.forEach((ref, i) => {
        if (ref) sr.reveal(ref, srConfig(i * 100));
      });
    })();
  }, [prefersReducedMotion]);

  return (
    <section id="projects">
      <h2 className="numbered-heading" ref={revealTitle}>
        Some Things I’ve Built
      </h2>

      <ul className={styles.projectsGrid}>
        {featuredData
          .sort((a, b) => a.date - b.date)
          .map((project, i) => (
            <li
              key={i}
              className={styles.project}
              ref={(el) => {
                revealProjects.current[i] = el!;
              }}
            >
              <div className={styles.projectContent}>
                <div>
                  <p className={styles.projectOverline}>Featured Project</p>

                  <h3 className={styles.projectTitle}>
                    <a href={project.external}>{project.title}</a>
                  </h3>

                  <div className={styles.projectDescription}>
                    {project.description}
                  </div>

                  {project.tech.length > 0 && (
                    <ul className={styles.projectTechList}>
                      {project.tech.map((tech, t) => (
                        <li key={t}>{tech}</li>
                      ))}
                    </ul>
                  )}

                  <div className={styles.projectLinks}>
                    {project.cta && (
                      <a href={project.cta} className={styles.cta}>
                        Learn More
                      </a>
                    )}

                    {project.github && (
                      <a href={project.github} aria-label="GitHub Link">
                        <Icon name="GitHub" />
                      </a>
                    )}

                    {project.external && !project.cta && (
                      <a href={project.external} className={styles.external}>
                        <Icon name="External" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.projectImage}>
                <a
                  href={project.external || project.github || "#"}
                  aria-label={project.title}
                >
                  <Image
                    src={project.cover}
                    alt={project.title}
                    width={700}
                    height={450}
                    className={styles.img}
                  />
                </a>
              </div>
            </li>
          ))}
      </ul>
      <Projects />
    </section>
  );
};

export default Featured;
