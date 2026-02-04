import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";

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
      {/* GTM */}
      <GoogleTagManager gtmId="GTM-KSQ37KL7" />

      <body className="antialiased" suppressHydrationWarning>
        <Navbar />
        {children}
        <Footer />
        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
