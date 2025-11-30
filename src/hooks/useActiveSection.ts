import { useState, useEffect } from "react";

const observerOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "-80% 0px -20% 0px",
  threshold: 0,
};

const useActiveSection = (sectionIds: string[]): string => {
  const [activeId, setActiveId] = useState("");
  const [lastY, setLastY] = useState(0);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (y < 50) {
        setActiveId("home");
      }

      setScrollDir(y > lastY ? "down" : "up");
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {

      if (scrollDir === "up") {
        const candidates = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        const closest = candidates[0]?.target.id;

        if (closest === "home") {
          setActiveId("home");
          return;
        }
      }

      const visible = entries.filter((e) => e.isIntersecting);
      if (!visible.length) return;

      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      setActiveId(visible[0].target.id);
    }, observerOptions);

    const timeout = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 80);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, [sectionIds, scrollDir]);

  return activeId;
};

export default useActiveSection;
