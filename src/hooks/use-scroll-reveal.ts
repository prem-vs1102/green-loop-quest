import { useEffect } from "react";

/**
 * Adds `is-visible` to any element with a reveal class when it enters the viewport.
 * Supports: .reveal-on-scroll, .reveal-zoom-in, .reveal-fade-left, .reveal-fade-right
 */
export const useScrollReveal = () => {
  useEffect(() => {
    const selector =
      ".reveal-on-scroll, .reveal-zoom-in, .reveal-fade-left, .reveal-fade-right";
    const els = document.querySelectorAll<HTMLElement>(selector);

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      // Already in view on mount → reveal immediately (no flash).
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        io.observe(el);
      }
    });

    return () => io.disconnect();
  }, []);
};
