import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";

import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import "./global.css";

export const metadata: Metadata = {
  title: "Calvin Gomes",
  description: "Frontend Web Developer",
  metadataBase: new URL('https://calvingomes.vercel.app'),
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "u5n_AvAN8QO16-AVLxYExIgsRZ3r1D2OtmuDaiWZj3w",
  },
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
