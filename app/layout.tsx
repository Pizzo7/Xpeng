import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieNotice } from "@/components/layout/CookieNotice";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLdOrganization } from "@/components/seo/JsonLdOrganization";
import { MotionProvider } from "@/components/motion";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { site } from "@/lib/data";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: `${site.companyName} | XPENG Models`,
    template: `%s | ${site.companyName}`,
  },
  description:
    "Discover XPENG electric vehicles in Ghana. Explore models and book a test drive with the authorized distributor.",
  openGraph: {
    title: `${site.companyName} | XPENG Models`,
    description:
      "Explore the XPENG lineup and book a test drive.",
    locale: "en_GH",
    type: "website",
    siteName: site.companyName,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GH" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* Using CSS link fonts so builds do not depend on next/font Google fetch */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Outfit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <ThemeScript />
        <ThemeProvider>
          <MotionProvider>
            <JsonLdOrganization />
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-gold focus:px-4 focus:py-2 focus:text-on-gold"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
            <CookieNotice />
            <WhatsAppButton />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
