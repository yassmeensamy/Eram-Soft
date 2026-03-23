import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import FloatingContact from "@/components/ui/FloatingContact";
import { sanityFetch } from "@/sanity/lib/fetch";
import { footerConfigQuery, siteSettingsQuery } from "@/sanity/lib/queries";
import type { SanityFooterConfig, SanitySiteSettings } from "@/sanity/lib/types";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [footerData, siteSettings] = await Promise.all([
    sanityFetch<SanityFooterConfig>({ query: footerConfigQuery, tags: ["footer"] }),
    sanityFetch<SanitySiteSettings>({ query: siteSettingsQuery, tags: ["siteSettings"] }),
  ]);

  return (
    <>
      <Navbar />
      {children}
      <Footer data={footerData} socialLinks={siteSettings?.socialLinks} />
      <FloatingContact />
    </>
  );
}
