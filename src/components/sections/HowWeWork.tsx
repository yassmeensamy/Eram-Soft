"use client";

import { ReactNode, useState, useEffect, useRef } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientEffects from "@/components/ui/AmbientEffects";
import "./how-we-work.css";

interface StepItem {
  number: string;
  title: string;
  description: string;
  iconKey: string;
}

const stepIcons: Record<string, ReactNode> = {
  discovery: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
  design: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
      <circle cx="11" cy="11" r="2" />
    </svg>
  ),
  development: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  testing: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  launch: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
};

export default function HowWeWork({ steps }: { steps: StepItem[] }) {
  const [reachedStep, setReachedStep] = useState(-1);
  const [hoverStep, setHoverStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasPlayed = useRef(false);
  const [lineStyle, setLineStyle] = useState({ left: 0, right: 0, top: 36 });

  // The active step is either hover (takes priority) or the auto-animated reached step
  const activeStep = hoverStep !== null ? hoverStep : reachedStep;
  const progress = steps.length > 1 ? Math.max(0, activeStep) / (steps.length - 1) : 0;

  // Measure node positions
  useEffect(() => {
    const measure = () => {
      const container = timelineRef.current;
      if (!container || nodeRefs.current.length === 0) return;
      const containerRect = container.getBoundingClientRect();
      const first = nodeRefs.current[0];
      const last = nodeRefs.current[nodeRefs.current.length - 1];
      if (!first || !last) return;
      const firstRect = first.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();
      setLineStyle({
        left: firstRect.left - containerRect.left + firstRect.width / 2,
        right: containerRect.right - lastRect.right + lastRect.width / 2,
        top: firstRect.top - containerRect.top + firstRect.height / 2,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [steps]);

  // Scroll-triggered sequential animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayed.current) {
          hasPlayed.current = true;
          steps.forEach((_, i) => {
            setTimeout(() => setReachedStep(i), i * 400);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [steps]);

  return (
    <section ref={sectionRef} id="how-we-work" className="hw-section dark-section section-top-glow relative py-20 md:py-28">
      <AmbientEffects />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div>
          <SectionHeader
            label="Our Process"
            title="How We"
            accentWord="Work"
            subtitle="A proven process that turns ideas into exceptional digital products, every single time."
          />
        </div>

        <div
          ref={timelineRef}
          className="hw-timeline"
          style={{ "--hw-progress": progress } as React.CSSProperties}
        >
          <div
            className="hw-timeline-line"
            aria-hidden="true"
            style={{ left: lineStyle.left, right: lineStyle.right, top: lineStyle.top }}
          />
          <div
            className={`hw-timeline-progress${activeStep >= 0 ? " hw-timeline-progress--on" : ""}`}
            aria-hidden="true"
            style={{ left: lineStyle.left, right: lineStyle.right, top: lineStyle.top - 1 }}
          />

          {steps.map((step, i) => {
            const isLit = i <= activeStep;
            return (
              <div
                key={`step-${step.number}-${i}`}
                className={`hw-step ${isLit ? "hw-step--reached" : ""} ${hoverStep === i ? "hw-step--hover" : ""}`}
                onMouseEnter={() => setHoverStep(i)}
                onMouseLeave={() => setHoverStep(null)}
              >
                <div
                  className="hw-step-node"
                  ref={(el) => { nodeRefs.current[i] = el; }}
                >
                  <div className="hw-step-node-ring" />
                  <div className="hw-step-node-icon">{stepIcons[step.iconKey]}</div>
                </div>

                <div className="hw-step-content">
                  <span className="hw-step-number">{step.number}</span>
                  <h3 className="hw-step-title">{step.title}</h3>
                  <p className="hw-step-desc">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
