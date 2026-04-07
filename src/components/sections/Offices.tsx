"use client";

import Image from "next/image";
import { MapPin, Phone, Clock, ExternalLink } from "lucide-react";
import "./offices.css";
import SectionHeader from "@/components/ui/SectionHeader";
import AmbientEffects from "@/components/ui/AmbientEffects";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";

interface OfficeItem {
  city: string;
  label: string;
  address: string;
  phone: string;
  hours: string;
  image: SanityImage;
  mapLink: string;
}

function OfficesGrid({ offices }: { offices: OfficeItem[] }) {
  return (
    <div className="of-grid">
      {offices.map((b, i) => (
        <a
          key={`of-${b.city}-${i}`}
          href={b.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="of-card"
        >
          {b.image && (
            <Image
              src={urlFor(b.image).width(800).url()}
              alt={`${b.city} office`}
              fill
              className="of-card-bg"
              sizes="(max-width:900px) 100vw, 33vw"
            />
          )}
          <div className="of-card-overlay" aria-hidden="true" />

          <div className="of-card-content">
            <div className="of-card-top">
              <div className="of-badge">
                <span className="of-badge-dot" />
                {b.label}
              </div>
            </div>

            <div className="of-card-bottom">
              <h3 className="of-city">{b.city}</h3>

              <div className="of-info">
                <div className="of-row">
                  <MapPin size={13} strokeWidth={1.5} />
                  <span>{b.address}</span>
                </div>
                <div className="of-row">
                  <Phone size={13} strokeWidth={1.5} />
                  <span>{b.phone}</span>
                </div>
                <div className="of-row">
                  <Clock size={13} strokeWidth={1.5} />
                  <span>{b.hours}</span>
                </div>
              </div>

              <div className="of-map-link">
                <ExternalLink size={14} strokeWidth={1.5} />
                <span>View on Google Maps</span>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

export { OfficesGrid };

export default function Offices({ offices }: { offices: OfficeItem[] }) {
  return (
    <section
      id="offices"
      className="of-section dark-section section-top-glow relative pt-10 pb-14 md:pt-14 md:pb-20"
    >
      <AmbientEffects />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        <div>
          <SectionHeader
            label="Our Offices"
            title="Find Us"
            accentWord="Worldwide"
            subtitle="With offices across the Middle East and North Africa, we're always close to where you need us."
          />
        </div>

        <OfficesGrid offices={offices} />
      </div>
    </section>
  );
}
