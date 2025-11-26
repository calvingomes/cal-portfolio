import type { Metadata } from "next";

import Providers from "./providers";
import GlobalStyle from "@/styles/GlobalStyle";
import NavbarWrapper from "@/components/Navbar/NavbarWrapper";
import Footer from "@/components/Footer/Footer";


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
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Providers>
          <GlobalStyle />
          <NavbarWrapper  />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
