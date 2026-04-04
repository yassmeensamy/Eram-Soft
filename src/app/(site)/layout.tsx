import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import { sanityFetch } from "@/sanity/lib/fetch";
import { footerConfigQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanityFooterConfig, SanitySiteSettings } from "@/sanity/lib/types";

async function SiteFooter() {
  const [footerData, siteSettings] = await Promise.all([
    sanityFetch<SanityFooterConfig>({ query: footerConfigQuery, tags: ["footer"] }),
    sanityFetch<SanitySiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
  ]);
  return <Footer data={footerData} socialLinks={siteSettings?.socialLinks} />;
}

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Suspense fallback={null}>
        <SiteFooter />
      </Suspense>
      <FloatingContact />
    </>
  );
}
