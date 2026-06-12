"use client";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/src/components/layout/Nav";
import Header from "@/src/components/layout/Header";
import { ThemeProvider } from "@/src/hooks/ThemeContext";
import { useState } from "react";

const gaistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "400", "700"],
  variable: "--font-gaist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <html lang="en" className={gaistMono.variable}>
      <ThemeProvider>
        <body
          className="antialiased font-sans"
          data-sidebar={isNavOpen ? "true" : "false"}
        >
          <Header onToggleNav={toggleNav} isOpen={isNavOpen} />
          <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[12.5rem_minmax(0,1fr)]">
            <Nav isOpen={isNavOpen} />
            <main className="lg:col-start-2 pt-header px-4">{children}</main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
