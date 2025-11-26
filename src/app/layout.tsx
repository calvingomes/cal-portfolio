import type { Metadata } from "next";

import Providers from "./providers";
import GlobalStyle from "@/styles/GlobalStyle";
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
      <body
        className="antialiased"
        suppressHydrationWarning
      >
        <Providers>
          <GlobalStyle />
          <NavbarWrapper />
          {children}
          <FooterWrapper />
        </Providers>
      </body>
    </html>
  );
}
