"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Home, GraduationCap, Heart, Users, Code, TrendingUp, MapPin, ChevronDown } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";
import PageAmbient from "@/components/ui/PageAmbient";
import { CONTACT } from "@/lib/constants";
import type { SanityCareersPage } from "@/sanity/lib/types";
import "./careers.css";

/* ── Icon map — maps Sanity iconKey to Lucide component ── */
const PERK_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  home: Home,
  education: GraduationCap,
  heart: Heart,
  team: Users,
  code: Code,
  growth: TrendingUp,
};

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
      <PageAmbient prefix="ca" />


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
                              <MapPin size={14} />
                              {job.location}
                            </span>
                            <span className="ca-job-dot" aria-hidden="true" />
                            <span className="ca-job-type">{job.type}</span>
                          </div>
                        </div>
                        <div className="ca-job-right">
                          <a
                            href={`mailto:${CONTACT.careersEmail}?subject=Application: ${job.title}`}
                            className="ca-job-apply"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span className="ca-job-apply-shimmer" aria-hidden="true" />
                            Apply Now
                          </a>
                          <span className={`ca-job-chevron ${isOpen ? "ca-job-chevron--open" : ""}`}>
                            <ChevronDown size={20} />
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
                <div className="ca-why-card-icon">{(() => { const Icon = PERK_ICONS[perk.iconKey] ?? Code; return <Icon size={24} />; })()}</div>
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
