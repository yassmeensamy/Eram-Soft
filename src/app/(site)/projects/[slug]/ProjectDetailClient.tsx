"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  Compass, Map, Bell, BarChart3, Globe, Shield, Truck, Tag,
  CreditCard, Home, Zap, Repeat, Video, User, ShoppingBag,
  Award, BarChart, Clock, QrCode, Coffee, Gift, Tablet,
  PieChart, FileText, AlertTriangle, Layers, MessageSquare,
  Lock, Database,
} from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import MosaicCTA from "@/components/ui/MosaicCTA";
import type { SanityProject, SanityProjectListItem } from "@/sanity/lib/types";
import "./project-detail.css";

/* ── Icon component for features ── */
const FEATURE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  compass: Compass,
  map: Map,
  bell: Bell,
  chart: BarChart3,
  globe: Globe,
  shield: Shield,
  truck: Truck,
  tag: Tag,
  "credit-card": CreditCard,
  store: Home,
  zap: Zap,
  repeat: Repeat,
  video: Video,
  user: User,
  "shopping-bag": ShoppingBag,
  award: Award,
  "bar-chart": BarChart,
  clock: Clock,
  "qr-code": QrCode,
  coffee: Coffee,
  gift: Gift,
  tablet: Tablet,
  "pie-chart": PieChart,
  "file-text": FileText,
  "alert-triangle": AlertTriangle,
  layers: Layers,
  "message-square": MessageSquare,
  lock: Lock,
  database: Database,
};

function FeatureIcon({ name }: { name: string }) {
  const Icon = FEATURE_ICONS[name] ?? Zap;
  return <Icon size={20} />;
}

/* ── Tech logo mapping ── */
function getTechLogo(name: string): string {
  const logos: Record<string, string> = {
    Flutter: "/tech/flutter.svg",
    "React Native": "/tech/react.svg",
    React: "/tech/react.svg",
    "Next.js": "/tech/nextjs.svg",
    Firebase: "/tech/firebase.svg",
    "Node.js": "/tech/nodejs.svg",
    PostgreSQL: "/tech/postgresql.svg",
    "Google Maps": "/tech/google-maps.svg",
    Stripe: "/tech/stripe.svg",
    "QR Integration": "/tech/qr.svg",
    Python: "/tech/python.svg",
    "GPT-4": "/tech/openai.svg",
    Kubernetes: "/tech/kubernetes.svg",
  };
  return logos[name] || "/tech/qr.svg";
}

export default function ProjectDetailClient({
  project,
  allProjects,
}: {
  project: SanityProject;
  allProjects: SanityProjectListItem[];
}) {
  const isMobileApp = !project.category.toLowerCase().includes("platform");

  useEffect(() => {
    const els = document.querySelectorAll(".pd-reveal");
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("pd-revealed");
        }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const heroImageUrl = project.image ? urlFor(project.image).width(1400).url() : "/placeholder.jpg";

  return (
    <div className="pd-page">
      {/* Ambient glows */}
      <div className="pd-glow pd-glow--1" aria-hidden="true" />
      <div className="pd-glow pd-glow--2" aria-hidden="true" />
      <div className="pd-glow pd-glow--3" aria-hidden="true" />
      <div className="pd-glow pd-glow--4" aria-hidden="true" />

      {/* Noise texture */}
      <div className="pd-noise" aria-hidden="true" />

      {/* Hero Section */}
      <section className="pd-hero">
        <div className="pd-hero-img">
          <Image
            src={heroImageUrl}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="pd-hero-img-el"
          />
        </div>
        <div className="pd-hero-overlay" />
        <div className="pd-hero-scanline" aria-hidden="true" />

        <div className="pd-hero-content">
          <h1 className="pd-hero-title">
            {project.title}
          </h1>
          <p className="pd-hero-tagline">
            {project.tagline}
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <div className="pd-stats">
        <div className={`pd-stats-grid ${(project.appStoreUrl || project.googlePlayUrl || project.websiteUrl) ? "pd-stats-grid--with-downloads" : ""}`}>
          <div className="pd-stat">
            <div className="pd-stat-label">Platform</div>
            <div className="pd-stat-value">{project.platform}</div>
          </div>
          <div className="pd-stat">
            <div className="pd-stat-label">Status</div>
            <div className="pd-stat-value pd-stat-value--live">
              {project.status === "Live" && <span className="pd-live-dot" />}
              {project.status}
            </div>
          </div>
          {project.appStoreUrl && (
              <a href={project.appStoreUrl} target="_blank" rel="noopener noreferrer" className="pd-download">
                <div className="pd-download-icon pd-download-icon--apple">
                  <svg width="20" height="20" viewBox="0 0 814 1000" fill="#ffffff">
                    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.8-82-106.7-209.5-106.7-330.5 0-194.2 126.2-297.5 250.3-297.5 65.9 0 120.9 43.3 162.2 43.3 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8.6 15.7 1.3 18.2 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103.5-30.4 139.5-71.4z"/>
                  </svg>
                </div>
                <div className="pd-download-info">
                  <span className="pd-download-label">Download on the</span>
                  <span className="pd-download-store">App Store</span>
                </div>
                <svg className="pd-download-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
          )}
          {project.googlePlayUrl && (
              <a href={project.googlePlayUrl} target="_blank" rel="noopener noreferrer" className="pd-download">
                <div className="pd-download-icon pd-download-icon--google">
                  <svg width="18" height="20" viewBox="0 0 18 20">
                    <path d="M0.55 0.19C0.21 0.54 0 1.09 0 1.79v16.42c0 0.7 0.21 1.25 0.55 1.6L0.65 19.9 9.8 10.75v-0.1v-0.1L0.65 1.4 0.55 0.19z" fill="#4CAF50"/>
                    <path d="M12.85 13.8L9.8 10.75v-0.1v-0.1l3.05-3.05 0.1 0.06 3.61 2.05c1.03 0.59 1.03 1.55 0 2.13l-3.61 2.05-0.1 0.01z" fill="#FFBC00"/>
                    <path d="M13 13.74L9.8 10.55 0.55 19.8c0.34 0.36 0.9 0.4 1.53 0.05L13 13.74z" fill="#F44336"/>
                    <path d="M13 7.36L2.08 1.25C1.45 0.9 0.89 0.94 0.55 1.3L9.8 10.55 13 7.36z" fill="#00BCD4"/>
                  </svg>
                </div>
                <div className="pd-download-info">
                  <span className="pd-download-label">Get it on</span>
                  <span className="pd-download-store">Google Play</span>
                </div>
                <svg className="pd-download-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
          )}
          {project.websiteUrl && (
              <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="pd-download">
                <div className="pd-download-icon">
                  <Globe size={20} />
                </div>
                <div className="pd-download-info">
                  <span className="pd-download-label">Visit the</span>
                  <span className="pd-download-store">Website</span>
                </div>
                <svg className="pd-download-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
          )}
        </div>
      </div>

      {/* Overview */}
      <div className="pd-section">
        <p className="pd-section-label">
          Overview
        </p>
        <h2 className="pd-section-title">
          Project <span>Deep Dive</span>
        </h2>
        <div className="pd-divider" />

        <div className="pd-overview-grid">
          <div>
            <div className="pd-overview-block">
              <div className="pd-overview-heading">The Challenge</div>
              <p className="pd-overview-text">{project.challenge}</p>
            </div>
            <div className="pd-overview-block">
              <div className="pd-overview-heading">The Solution</div>
              <p className="pd-overview-text">{project.solution}</p>
            </div>
          </div>

          <div>
            <div className="pd-client-card">
              <div className="pd-client-card-title">Client Details</div>

              <div className="pd-client-item">
                <div className="pd-client-label">Client</div>
                <div className="pd-client-value">{project.client?.name ?? "N/A"}</div>
              </div>

              <div className="pd-client-item">
                <div className="pd-client-label">Industry</div>
                <div className="pd-client-value">{project.client?.industry ?? "N/A"}</div>
              </div>

              <div className="pd-client-item">
                <div className="pd-client-label">Services</div>
                <div className="pd-client-services">
                  {(project.client?.services ?? []).map((s) => (
                    <span key={s} className="pd-client-service-tag">{s}</span>
                  ))}
                </div>
              </div>

              <div className="pd-client-item">
                <div className="pd-client-label">Tech Stack</div>
                <div className="pd-client-tech">
                  {(project.tech ?? []).map((t) => (
                    <span key={t} className="pd-tech-tag">
                      <Image src={getTechLogo(t)} alt="" width={16} height={16} className="pd-tech-tag-logo" />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="pd-section">
        <p className="pd-section-label">Gallery</p>
        <h2 className="pd-section-title">
          App <span>Screenshots</span>
        </h2>
        <div className="pd-divider" />

        <div className="pd-gallery-wrap">
          <div className="pd-gallery-track">
            {(project.gallery ?? []).slice(0, 3).map((img, i) => (
              <div
                key={i}
                className="pd-gallery-item"
              >
                <div className="pd-device-frame">
                  <Image
                    src={img ? urlFor(img).width(800).url() : "/placeholder.jpg"}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={800}
                    height={isMobileApp ? 1600 : 500}
                    className={`pd-gallery-img ${!isMobileApp ? "pd-gallery-img--web" : ""}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="pd-section">
        <p className="pd-section-label">Features</p>
        <h2 className="pd-section-title">
          Key <span>Capabilities</span>
        </h2>
        <div className="pd-divider" />

        <div className={`pd-kc-grid ${(project.features ?? []).length > 6 ? "pd-kc-grid--scroll" : ""}`}>
          {(project.features ?? []).map((feature) => (
            <div key={feature.title} className="pd-kc-card">
              <div className="pd-kc-card-glow" />
              <div className="pd-kc-card-inner">
                <div className="pd-kc-icon-wrap">
                  <div className="pd-kc-icon-ring" />
                  <div className="pd-kc-icon-box">
                    <FeatureIcon name={feature.icon} />
                  </div>
                </div>
                <h3 className="pd-kc-title">{feature.title}</h3>
                <p className="pd-kc-desc">{feature.description}</p>
              </div>
              <div className="pd-kc-card-border" />
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      {project.testimonial && (
        <div className="pd-tst">
          <div className="pd-tst-glyph" aria-hidden="true">&ldquo;</div>
          <blockquote className="pd-tst-quote">
            {project.testimonial.quote}
          </blockquote>
          <div className="pd-tst-rule" aria-hidden="true" />
          <div className="pd-tst-attribution">
            <span className="pd-tst-name">{project.testimonial.author}</span>
            <span className="pd-tst-sep" aria-hidden="true" />
            <span className="pd-tst-role">{project.testimonial.role}</span>
          </div>
        </div>
      )}

      {/* Bottom CTA — Mosaic */}
      <div className="pd-reveal">
        <MosaicCTA projects={allProjects} prefix="pd" />
      </div>
    </div>
  );
}
