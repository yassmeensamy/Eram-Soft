"use client";

import { useRef, useEffect } from "react";

export function useReveal() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -5% 0px" }
    );

    requestAnimationFrame(() => {
      targets.forEach((t) => obs.observe(t));
    });

    // Safety net: if for any reason the observer hasn't revealed an element
    // after 1.5s (e.g. element was offscreen due to transform, observer never
    // fired), force-reveal everything so content is never permanently hidden.
    const fallback = window.setTimeout(() => {
      targets.forEach((t) => t.classList.add("is-visible"));
      obs.disconnect();
    }, 1500);

    return () => {
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, []);

  return root;
}
