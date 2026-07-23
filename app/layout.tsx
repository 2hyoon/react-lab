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
          suppressHydrationWarning
        >
          {/*
            Runs before first paint (blocking, as the first child of <body>) so the
            correct theme class is on <body> immediately — this is what prevents the
            light/dark flash (FOUC) for returning users. It is a raw string with no
            bundler or TypeScript, so it can't use the Theme enum; the "dark"/"light"
            literals must stay in sync with it.
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                let stored = null;
                // Only localStorage can throw (e.g. privacy mode); wrap just the read.
                try {
                  stored = window.localStorage.getItem("theme");
                } catch {}
                const theme =
                  stored === "dark" || stored === "light"
                    ? stored
                    : window.matchMedia("(prefers-color-scheme: dark)").matches
                      ? "dark"
                      : "light";
                document.body.classList.add(theme);
              `,
            }}
          />
          <Header onToggleNav={toggleNav} isOpen={isNavOpen} />
          <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-[12.5rem_minmax(0,1fr)]">
            <Nav isOpen={isNavOpen} />
            <main className="lg:col-start-2 pt-header px-4 lg:px-8">
              {children}
            </main>
          </div>
        </body>
      </ThemeProvider>
    </html>
  );
}
