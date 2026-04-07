"use client";

import { useCallback, useState } from "react";
import clsx from "clsx";
import { User, Mail, Phone, Layers, MessageSquare, ChevronDown, ArrowRight, Loader2 } from "lucide-react";
import { OfficesGrid } from "@/components/sections/Offices";
import { useReveal } from "@/hooks/useReveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import PageAmbient from "@/components/ui/PageAmbient";
import { ToastContainer, type ToastData } from "@/components/ui/Toast";
import { CONTACT } from "@/lib/constants";
import type { SanityContactPage, SanityOffice, SanityFaqItem, SanitySiteSettings } from "@/sanity/lib/types";
import "./contact.css";

export default function ContactPageClient({
  contactData,
  offices,
  faqs,
  siteSettings,
}: {
  contactData: SanityContactPage;
  offices: SanityOffice[];
  faqs: SanityFaqItem[];
  siteSettings?: SanitySiteSettings | null;
}) {
  const email = siteSettings?.contactEmail || CONTACT.email;
  const phone = siteSettings?.contactPhone || `+${CONTACT.phone}`;
  const pageRef = useReveal();

  const serviceOptions = contactData?.serviceOptions ?? [
    "Mobile App Development",
    "Web Development",
    "UI/UX Design",
    "Custom Software",
    "Cloud Solutions",
    "Other",
  ];

  const faqItems = (faqs ?? []).map((f) => ({
    q: f.question,
    a: f.answer,
  }));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((variant: "success" | "error", message: string) => {
    setToasts((prev) => [...prev, { id: Date.now() + Math.random(), variant, message }]);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: { ok?: boolean; error?: string } = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        pushToast("error", data.error || "Something went wrong. Please try again.");
        return;
      }
      pushToast("success", "Message sent! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    } catch {
      pushToast("error", "Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div ref={pageRef} className="ct-page">
      <PageAmbient prefix="ct" streak dots />

      {/* ═══════════════════════════════════════
          HERO + FORM — Side by Side
          ═══════════════════════════════════════ */}
      <section className="ct-hero">
        <div className="ct-hero-mesh" aria-hidden="true" />

        {/* Pulsing neon rings (behind left text) */}
        <div className="ct-hero-rings" aria-hidden="true">
          <div className="ct-ring ct-ring--1" />
          <div className="ct-ring ct-ring--2" />
          <div className="ct-ring ct-ring--3" />
        </div>

        <div className="ct-hero-row">
          {/* ── Left — Hero Text ── */}
          <div className="ct-hero-left" data-reveal="up">
            <p className="ct-tag">
              Contact Us
            </p>
            <h1 className="ct-hero-h1">
              {contactData?.heroTitle ?? "Let's Build Something"}{" "}
              <span className="ct-accent">{contactData?.heroAccent ?? "Great Together"}</span>
            </h1>
            <p className="ct-hero-sub">
              {contactData?.heroSubtitle ?? "Have a project in mind? A question about our services? Or just want to say hello? We'd love to hear from you — let's start a conversation."}
            </p>

            <div className="ct-hero-divider" aria-hidden="true">
              <span className="ct-hero-divider-dot" />
            </div>

            <div className="ct-hero-icons">
              <a href={`mailto:${email}`} className="ct-icon-btn" aria-label="Email us">
                <Mail size={22} strokeWidth={1.5} />
                <span className="ct-icon-label">Email</span>
              </a>
              <a href={`tel:${phone}`} className="ct-icon-btn" aria-label="Call us">
                <Phone size={22} strokeWidth={1.5} />
                <span className="ct-icon-label">Phone</span>
              </a>
              <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="ct-icon-btn ct-icon-btn--wa" aria-label="WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span className="ct-icon-label">WhatsApp</span>
              </a>
            </div>

            <p className="ct-hero-note">
              We respond within <span className="ct-accent">24 hours</span>.
              <br />
              Find our offices below.
            </p>
          </div>

          {/* ── Right — Contact Form ── */}
          <div className="ct-hero-right" data-reveal="up" style={{ "--delay": "0.15s" } as React.CSSProperties}>
            <form className="ct-form" onSubmit={handleSubmit} noValidate>
              <div className="ct-form-accent" aria-hidden="true" />
              <div className="ct-form-glow" aria-hidden="true" />

              <h2 className="ct-form-title">Send a Message</h2>

              <div className="ct-form-grid">
                {/* Full Name */}
                <div className={clsx("ct-field", focused === "name" && "ct-field--focused", form.name && "ct-field--filled")}>
                  <label className="ct-field-label" htmlFor="ct-name">Full Name</label>
                  <div className="ct-field-wrap">
                    <User className="ct-field-icon" size={16} strokeWidth={1.5} />
                    <input id="ct-name" name="name" type="text" className="ct-input" placeholder="John Doe" value={form.name} onChange={handleChange} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} required />
                  </div>
                </div>

                {/* Email */}
                <div className={clsx("ct-field", focused === "email" && "ct-field--focused", form.email && "ct-field--filled")}>
                  <label className="ct-field-label" htmlFor="ct-email">Email Address</label>
                  <div className="ct-field-wrap">
                    <Mail className="ct-field-icon" size={16} strokeWidth={1.5} />
                    <input id="ct-email" name="email" type="email" className="ct-input" placeholder="john@example.com" value={form.email} onChange={handleChange} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} required />
                  </div>
                </div>

                {/* Phone */}
                <div className={clsx("ct-field", focused === "phone" && "ct-field--focused", form.phone && "ct-field--filled")}>
                  <label className="ct-field-label" htmlFor="ct-phone">Phone <span className="ct-optional">(Optional)</span></label>
                  <div className="ct-field-wrap">
                    <Phone className="ct-field-icon" size={16} strokeWidth={1.5} />
                    <input id="ct-phone" name="phone" type="tel" className="ct-input" placeholder="+966 5X XXX XXXX" value={form.phone} onChange={handleChange} onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                {/* Service */}
                <div className={clsx("ct-field", focused === "service" && "ct-field--focused", form.service && "ct-field--filled")}>
                  <label className="ct-field-label" htmlFor="ct-service">Service</label>
                  <div className="ct-field-wrap">
                    <Layers className="ct-field-icon" size={16} strokeWidth={1.5} />
                    <select id="ct-service" name="service" className="ct-input ct-select" value={form.service} onChange={handleChange} onFocus={() => setFocused("service")} onBlur={() => setFocused(null)} required>
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <ChevronDown className="ct-field-arrow" size={14} strokeWidth={2} />
                  </div>
                </div>

                {/* Message — full width */}
                <div className={clsx("ct-field ct-field--full", focused === "message" && "ct-field--focused", form.message && "ct-field--filled")}>
                  <label className="ct-field-label" htmlFor="ct-message">Your Message</label>
                  <div className="ct-field-wrap ct-field-wrap--textarea">
                    <MessageSquare className="ct-field-icon ct-field-icon--textarea" size={16} strokeWidth={1.5} />
                    <textarea id="ct-message" name="message" className="ct-input ct-textarea" placeholder="Tell us about your project, goals, and timeline..." rows={5} value={form.message} onChange={handleChange} onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} required />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="ct-submit" disabled={submitting} aria-busy={submitting}>
                <span className="ct-submit-shimmer" aria-hidden="true" />
                <span className="ct-submit-text">
                  {submitting ? (
                    <>
                      Sending…
                      <Loader2 size={16} strokeWidth={2.5} className="ct-submit-spinner" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} strokeWidth={2.5} />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BRANCHES — Our Offices
          ═══════════════════════════════════════ */}
      <div className="ct-wrap">
        <div className="ct-thread" aria-hidden="true" />

        {/* ═══════════════════════════════════════
            BRANCHES — Full-bleed Image Cards
            ═══════════════════════════════════════ */}
        <section className="of-embedded">
          <div className="of-embedded-head">
            <p className="ct-tag">Our Offices</p>
            <h2 className="ct-section-title">
              Find Us <span className="ct-accent">Worldwide</span>
            </h2>
          </div>
          <OfficesGrid offices={offices} />
        </section>

        <div className="ct-thread" aria-hidden="true" />

        {/* ═══════════════════════════════════════
            FAQ
            ═══════════════════════════════════════ */}
        <section className="ct-faq">
          <div className="ct-branches-head">
            <p className="ct-tag">FAQ</p>
            <h2 className="ct-section-title">
              Frequently Asked <span className="ct-accent">Questions</span>
            </h2>
          </div>

          <FaqAccordion items={faqItems} classPrefix="ct-faq" />
        </section>


      </div>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
