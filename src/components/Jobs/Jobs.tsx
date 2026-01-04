"use client";

import { useState, useEffect, useRef, KeyboardEvent } from "react";
import styles from "./Jobs.module.css";
import { srConfig } from "@/config";
import { KEY_CODES } from "@/utils";
import loadScrollReveal from "@/utils/sr";
import { usePrefersReducedMotion } from "@/hooks";
import jobsData from "@/content/jobs.json";

const Jobs = () => {
  const [activeTabId, setActiveTabId] = useState(0);
  const [tabFocus, setTabFocus] = useState<number | null>(null);
  const tabs = useRef<HTMLButtonElement[]>([]);
  const revealContainer = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  /* ScrollReveal */
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (!revealContainer.current) return;

    (async () => {
      const sr = await loadScrollReveal();
      sr.reveal(revealContainer.current!, srConfig());
    })();
  }, [prefersReducedMotion]);

  /* Keyboard focus movement */
  useEffect(() => {
    if (tabFocus === null) return;
    const tab = tabs.current[tabFocus];
    if (tab) tab.focus();
  }, [tabFocus]);

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case KEY_CODES.ARROW_UP:
        e.preventDefault();
        setTabFocus((prev) => (prev ?? 0) - 1);
        break;
      case KEY_CODES.ARROW_DOWN:
        e.preventDefault();
        setTabFocus((prev) => (prev ?? 0) + 1);
        break;
    }
  };

  return (
    <section id="jobs" className={styles.jobsSection} ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>

      <div className={styles.inner}>
        {/* Tabs */}
        <div
          className={styles.tabList}
          role="tablist"
          aria-label="Job tabs"
          onKeyDown={onKeyDown}
        >
          {jobsData.map((job, i) => (
            <button
              key={i}
              className={`${styles.tabButton} ${activeTabId === i ? styles.activeTab : ""
                }`}
              onClick={() => setActiveTabId(i)}
              ref={(el) => {
                tabs.current[i] = el!;
              }}
              id={`tab-${i}`}
              role="tab"
              tabIndex={activeTabId === i ? 0 : -1}
              aria-selected={activeTabId === i}
              aria-controls={`panel-${i}`}
            >
              <span>{job.company}</span>
            </button>
          ))}

          <span
            className={styles.highlight}
            style={{ "--activeId": activeTabId } as React.CSSProperties}
          />
        </div>

        {/* Panels */}
        <div className={styles.tabPanels}>
          {jobsData.map(
            (job, i) =>
              activeTabId === i && (
                <div
                  key={i}
                  className={styles.tabPanel}
                  id={`panel-${i}`}
                  role="tabpanel"
                  tabIndex={0}
                  aria-labelledby={`tab-${i}`}
                >
                  <h3>
                    <span>{job.title}</span>
                    <span className={styles.company}>
                      &nbsp;@&nbsp;
                      <a href={job.url} className="inline-link">
                        {job.company}
                      </a>
                    </span>
                  </h3>

                  <p className={styles.range}>{job.range}</p>

                  <ul className={styles.fancyList}>
                    {job.highlights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
