"use client";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import type { SanityProjectListItem } from "@/sanity/lib/types";

interface MosaicCTAProps {
  projects: SanityProjectListItem[];
  /** CSS class prefix for scoped styling (e.g. "pd" or "p5") */
  prefix: string;
}

export default function MosaicCTA({ projects, prefix }: MosaicCTAProps) {
  return (
    <div className={`${prefix}-bottom`}>
      {/* Project images mosaic background */}
      <div className={`${prefix}-bottom-mosaic`} aria-hidden="true">
        <div className={`${prefix}-bottom-mosaic-track`}>
          {[...projects, ...projects].map((p, i) => (
            <div key={`${p.slug}-${i}`} className={`${prefix}-bottom-mosaic-item`}>
              <Image
                src={p.image ? urlFor(p.image).width(200).url() : "/placeholder.jpg"}
                alt=""
                fill
                sizes="100px"
                loading="lazy"
                className={`${prefix}-bottom-mosaic-img`}
              />
            </div>
          ))}
        </div>
        <div className={`${prefix}-bottom-mosaic-track ${prefix}-bottom-mosaic-track--reverse`}>
          {[...projects.slice().reverse(), ...projects.slice().reverse()].map((p, i) => (
            <div key={`${p.slug}-rev-${i}`} className={`${prefix}-bottom-mosaic-item`}>
              <Image
                src={p.image ? urlFor(p.image).width(200).url() : "/placeholder.jpg"}
                alt=""
                fill
                sizes="100px"
                loading="lazy"
                className={`${prefix}-bottom-mosaic-img`}
              />
            </div>
          ))}
        </div>
        <div className={`${prefix}-bottom-mosaic-track`}>
          {[...projects.slice(2), ...projects, ...projects.slice(0, 2)].map((p, i) => (
            <div key={`${p.slug}-alt-${i}`} className={`${prefix}-bottom-mosaic-item`}>
              <Image
                src={p.image ? urlFor(p.image).width(200).url() : "/placeholder.jpg"}
                alt=""
                fill
                sizes="100px"
                loading="lazy"
                className={`${prefix}-bottom-mosaic-img`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={`${prefix}-bottom-mosaic-overlay`} aria-hidden="true" />

      <span className={`${prefix}-bottom-border`} aria-hidden="true" />
      <div className={`${prefix}-bottom-inner`}>
        <h3 className={`${prefix}-bottom-heading`}>Have a project in mind?</h3>
        <p className={`${prefix}-bottom-sub`}>Let&apos;s craft something exceptional together.</p>
        <Link href="/contact" className={`${prefix}-bottom-btn`}>
          <span>Start a Conversation</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="15" x2="15" y2="3" />
            <polyline points="7 3 15 3 15 11" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
