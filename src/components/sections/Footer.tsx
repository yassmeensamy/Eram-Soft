import "./footer.css";
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/ui/SocialLinks";
import type { SanityFooterConfig, SanitySocialLink } from "@/sanity/lib/types";

const defaultFooterLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/projects" },
    { label: "Careers", href: "/careers" },
  ],
  services: [
    { label: "Mobile Development", href: "/#services" },
    { label: "Web Development", href: "/#services" },
    { label: "UI/UX Design", href: "/#services" },
    { label: "DevOps & Cloud", href: "/#services" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer({ data, socialLinks }: { data?: SanityFooterConfig | null; socialLinks?: SanitySocialLink[] }) {
  const brandDescription =
    data?.brandDescription ??
    "We craft exceptional digital experiences \u2014 from mobile apps to scalable platforms \u2014 helping businesses thrive in the digital age.";
  const columns = data?.columns ?? [
    { heading: "Company", links: defaultFooterLinks.company },
    { heading: "Services", links: defaultFooterLinks.services },
    { heading: "Support", links: defaultFooterLinks.support },
  ];
  const copyrightText =
    data?.copyrightText ??
    `\u00A9 ${new Date().getFullYear()} Eram Soft. All rights reserved.`;

  return (
    <footer className="ft-footer relative overflow-hidden">
      <div className="ft-noise" aria-hidden="true" />
      <div className="ft-glow ft-glow--1" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* ── Top section ── */}
        <div className="ft-top">
          {/* Brand */}
          <div className="ft-brand">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Eram Soft"
                width={140}
                height={40}
                className="brightness-0 invert opacity-80"
              />
            </Link>
            <p className="ft-brand-desc">
              {brandDescription}
            </p>

            {/* Social links */}
            <div className="ft-socials">
              <SocialLinks linkClassName="ft-social-link" socialLinks={socialLinks} />
            </div>
          </div>

          {/* Link columns */}
          <div className="ft-links-grid">
            {columns.map((col) => (
              <div key={col.heading} className="ft-links-col">
                <h4 className="ft-links-heading">{col.heading}</h4>
                {(col.links ?? []).map((link) => (
                  <Link key={link.label} href={link.href} className="ft-link">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="ft-divider" />

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <p className="ft-copyright">
            {copyrightText}
          </p>
          <p className="ft-credit">
            Crafted with precision & passion.
          </p>
        </div>
      </div>
    </footer>
  );
}
