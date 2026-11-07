import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// ALL project fonts loaded once here via next/font (zero render-blocking).
// Do NOT use @import url(...) inside <style> tags in any component — that
// causes duplicate network requests and blocks compilation + rendering.
// ─────────────────────────────────────────────────────────────────────────────

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StudyPalace",
  description: "Learn smarter with StudyPalace",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scrollbar-thin`}
    >
      <body className="min-h-full w-full flex flex-col scrollbar-thin">
        {children}
      </body>
    </html>
  );
}
