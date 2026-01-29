import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import "./global.css";

export const metadata: Metadata = {
  title: "Calvin Gomes",
  description: "Frontend Web Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        {/* Vercel Analytics */}
        <Analytics />
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T0G6QSSLPS"
          strategy="afterInteractive"
        />
        <Script
          id="ga4"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-T0G6QSSLPS');
            `,
          }}
        />
      </body>
    </html>
  );
}
