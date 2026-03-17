"use client";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/src/components/layout/nav";
import Header from "@/src/components/layout/header";
import { ThemeProvider } from "@/src/hooks/themeContext";
import { useState } from "react";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
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
    <html lang="en" className={spaceMono.variable}>
      <ThemeProvider>
        <body
          className="antialiased bg-gray-900 font-sans"
          data-sidebar={isNavOpen ? "true" : "false"}
        >
          <Header onToggleNav={toggleNav} isOpen={isNavOpen} />
          <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[200px_2.5rem_minmax(0,1fr)_2.5rem]">
            <Nav isOpen={isNavOpen} />
            <main className="lg:col-start-3 pt-12">{children}</main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
