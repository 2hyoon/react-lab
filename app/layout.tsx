import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/hooks/ThemeContext";
import Shell from "@/src/components/layout/Shell";

// `template` is applied to child pages only; `default` covers pages that set no
// title of their own — including the home page, which exports no metadata.
export const metadata: Metadata = {
  title: {
    default: "React Lab",
    template: "%s | React Lab",
  },
};

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
  return (
    <html lang="en" className={gaistMono.variable}>
      <ThemeProvider>
        <body className="antialiased font-sans" suppressHydrationWarning>
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
          <Shell>{children}</Shell>
        </body>
      </ThemeProvider>
    </html>
  );
}
