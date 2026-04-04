import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0e1a",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eramsoft.com"),
  title: {
    default: "EramSoft — Software Development & Digital Solutions",
    template: "%s | EramSoft",
  },
  description:
    "EramSoft delivers end-to-end software development, mobile apps, web platforms, and digital transformation solutions. Based in the UAE with global reach.",
  keywords: [
    "software development",
    "mobile app development",
    "web development",
    "digital solutions",
    "UAE software company",
    "EramSoft",
    "custom software",
    "IT consulting",
  ],
  authors: [{ name: "EramSoft", url: "https://www.eramsoft.com" }],
  creator: "EramSoft",
  publisher: "EramSoft",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.eramsoft.com",
    siteName: "EramSoft",
    title: "EramSoft — Software Development & Digital Solutions",
    description:
      "End-to-end software development, mobile apps, web platforms, and digital transformation solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "EramSoft — Software Development & Digital Solutions",
    description:
      "End-to-end software development, mobile apps, web platforms, and digital transformation solutions.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  alternates: {
    canonical: "https://www.eramsoft.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
