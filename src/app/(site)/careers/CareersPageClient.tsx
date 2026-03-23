"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useReveal } from "@/hooks/useReveal";
import type { SanityCareersPage, SanityPerk, SanityJobPosition } from "@/sanity/lib/types";
import "./careers.css";

/* ══════════════════════════════════════════════
   ICON MAP — maps Sanity iconKey to SVG
   ══════════════════════════════════════════════ */

const perkIcons: Record<string, React.ReactNode> = {
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
    </svg>
  ),
  education: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path d="M12 14l9-5-9-5-9 5 9 5zM12 14v7" />
    </svg>
  ),
  heart: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  team: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  growth: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

/* ══════════════════════════════════════════════
   PAGE CLIENT
   ══════════════════════════════════════════════ */

export default function CareersPageClient({
  careersData,
}: {
  careersData: SanityCareersPage;
}) {
  const pageRef = useReveal();
  const perks = careersData?.perks ?? [];
  const positions = careersData?.positions ?? [];

  const [expandedJob, setExpandedJob] = useState<string | null>(positions[0]?.title ?? null);
  const [showMoreJobs, setShowMoreJobs] = useState<Record<string, boolean>>({});
  const [overflowJobs, setOverflowJobs] = useState<Record<string, boolean>>({});
  const descRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

  const checkOverflow = useCallback(() => {
    const lineHeight = 0.9 * 1.7 * 16; // font-size * line-height * base
    const maxHeight = lineHeight * 5.5;
    positions.forEach((job) => {
      const el = descRefs.current[job.title];
      if (el) {
        setOverflowJobs((prev) => ({
          ...prev,
          [job.title]: el.scrollHeight > maxHeight,
        }));
      }
    });
  }, [positions]);

  useEffect(() => {
    checkOverflow();
  }, [expandedJob, checkOverflow]);

  return (
    <div ref={pageRef} className="ca-page">
      {/* ── Ambient layers ── */}
      <div className="ca-glow ca-glow--a" aria-hidden="true" />
      <div className="ca-glow ca-glow--b" aria-hidden="true" />
      <div className="ca-glow ca-glow--c" aria-hidden="true" />
      <div className="ca-grain" aria-hidden="true" />
      <div className="ca-dots" aria-hidden="true" />


      {/* ── Main content ── */}
      <div className="ca-wrap">

        {/* ═══════════════════════════════════════
            EMPTY STATE — No current openings
            ═══════════════════════════════════════ */}
        {positions.length === 0 && (
          <section className="ca-positions">
            <div className="ca-positions-head" data-reveal="up">
              <p className="ca-tag">Open Roles</p>
              <h2 className="ca-section-title">
                Open <span className="ca-accent">Positions</span>
              </h2>
              <p className="ca-positions-sub">
                Find your next challenge. We&apos;re looking for talented people
                who want to make an impact.
              </p>
            </div>

            <div className="ca-empty" data-reveal="up">
              <div className="ca-empty-icon" aria-hidden="true">
                <div className="ca-empty-icon-ring" />
                <div className="ca-empty-icon-ring ca-empty-icon-ring--2" />
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <h3 className="ca-empty-title">No Open Positions Right Now</h3>
              <p className="ca-empty-desc">
                We don&apos;t have any openings at the moment.
                Check back soon &mdash; new roles are added regularly.
              </p>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════
            OPEN POSITIONS — when jobs exist
            ═══════════════════════════════════════ */}
        {positions.length > 0 && (
          <>
            <div className="ca-thread" aria-hidden="true" />

            <section id="positions" className="ca-positions">
              <div className="ca-positions-head" data-reveal="up">
                <p className="ca-tag">Open Roles</p>
                <h2 className="ca-section-title">
                  Open <span className="ca-accent">Positions</span>
                </h2>
                <p className="ca-positions-sub">
                  Find your next challenge. We&apos;re looking for talented people
                  who want to make an impact.
                </p>
              </div>

              <div className="ca-jobs-list" data-reveal="up">
                {positions.map((job) => {
                  const isOpen = expandedJob === job.title;
                  return (
                    <div
                      key={job.title}
                      className={`ca-job-card ${isOpen ? "ca-job-card--open" : ""}`}
                    >
                      <button
                        className="ca-job-header"
                        onClick={() => setExpandedJob(isOpen ? null : job.title)}
                        aria-expanded={isOpen}
                      >
                        <div className="ca-job-left">
                          <h3 className="ca-job-title">{job.title}</h3>
                          <div className="ca-job-meta">
                            <span className="ca-job-dept">{job.department}</span>
                            <span className="ca-job-dot" aria-hidden="true" />
                            <span className="ca-job-location">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {job.location}
                            </span>
                            <span className="ca-job-dot" aria-hidden="true" />
                            <span className="ca-job-type">{job.type}</span>
                          </div>
                        </div>
                        <div className="ca-job-right">
                          <a
                            href={`mailto:careers@eramsoft.com?subject=Application: ${job.title}`}
                            className="ca-job-apply"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="ca-job-apply-shimmer" aria-hidden="true" />
                            Apply Now
                          </a>
                          <span className={`ca-job-chevron ${isOpen ? "ca-job-chevron--open" : ""}`}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </span>
                        </div>
                      </button>

                      <div className={`ca-job-body ${isOpen ? "ca-job-body--open" : ""}`}>
                        <div className="ca-job-body-inner">
                          <p
                            ref={(el) => { descRefs.current[job.title] = el; }}
                            className={`ca-job-description ${!showMoreJobs[job.title] && overflowJobs[job.title] ? "ca-job-description--clamped" : ""}`}
                          >
                            {job.details}
                            {overflowJobs[job.title] && (
                              <button
                                className="ca-job-show-more"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowMoreJobs((prev) => ({
                                    ...prev,
                                    [job.title]: !prev[job.title],
                                  }));
                                }}
                              >
                                {showMoreJobs[job.title] ? "Show Less" : "Show More"}
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        <div className="ca-thread" aria-hidden="true" />

        {/* ═══════════════════════════════════════
            WHY WORK WITH US — Split layout
            ═══════════════════════════════════════ */}
        <section className="ca-why">
          <div className="ca-why-head" data-reveal="up">
            <p className="ca-tag">Life at Eram Soft</p>
            <h2 className="ca-section-title">
              Why Work <span className="ca-accent">With Us</span>
            </h2>
          </div>

          <div className="ca-why-grid">
            {perks.map((perk, i) => (
              <div
                key={perk.title}
                className="ca-why-card"
                data-reveal="up"
                style={{ "--delay": `${i * 0.06}s` } as React.CSSProperties}
              >
                <div className="ca-why-card-icon">{perkIcons[perk.iconKey] ?? perkIcons.code}</div>
                <h3 className="ca-why-card-title">{perk.title}</h3>
                <p className="ca-why-card-desc">{perk.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
