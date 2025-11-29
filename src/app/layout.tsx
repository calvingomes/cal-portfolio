import type { Metadata } from "next";

import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import FooterWrapper from "@/components/Footer/FooterWrapper";

import "./globals.css";

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
        <NavbarWrapper />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}
