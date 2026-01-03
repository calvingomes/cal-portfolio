"use client";

import { useEffect, useRef } from "react";
import loadScrollReveal from "@/utils/sr";
import { srConfig } from "@/config";
import { Icon } from "@/components/icons";
import { usePrefersReducedMotion } from "@/hooks";
import projectsData from "@/content/projects.json";
import styles from "./Archive.module.css";

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
      <header className={styles.header} ref={(el) =>{revealTitle.current = el}}>
        <h1 className="big-heading">Archive</h1>
        <p className="subtitle">A big list of things I’ve worked on</p>
      </header>

      <div className={styles.tableContainer} ref={(el) => {revealTable.current = el}}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Year</th>
              <th>Title</th>
              <th className={styles.hideOnMobile}>Made at</th>
              <th className={styles.hideOnMobile}>Built with</th>
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
                <td className={`${styles.year} overline`}>
                  {new Date(project.date).getFullYear()}
                </td>

                <td className={styles.title}>{project.title}</td>

                <td className={`${styles.company} ${styles.hideOnMobile}`}>
                  {project.company || "—"}
                </td>

                <td className={`${styles.tech} ${styles.hideOnMobile}`}>
                  {project.tech?.length > 0 &&
                    project.tech.map((t, idx) => (
                      <span key={idx}>
                        {t}
                        {idx !== project.tech.length - 1 && (
                          <span className={styles.separator}>&middot;</span>
                        )}
                      </span>
                    ))}
                </td>

                <td className={styles.links}>
                  <div>
                    {project.playstore && (
                      <a href={project.playstore} aria-label="Playstore Link">
                        <Icon name="PlayStore" />
                      </a>
                    )}

                    {project.appstore && (
                      <a href={project.appstore} aria-label="Appstore Link">
                        <Icon name="AppStore" />
                      </a>
                    )}

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
      </div>
    </>
  );
};

export default Archive;