import "./globals.css";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Typography — 3-tier system, imported once at the top of globals.css:
//   Tier 1 heading  → Fraunces       (--font-heading)  page main headings, display
//   Tier 2 sub-head → Space Grotesk  (--font-sub)      section/card/column titles
//   Tier 3 body     → Inter          (--font-body)     paragraphs, labels, UI
// Legacy aliases --font-sans / --font-serif map to the body / heading tiers.
// Keep component-level font stacks limited to these three families.
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = {
  title: "My Study Hub",
  description: "Learn smarter with My Study Hub",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className="h-full antialiased scrollbar-thin"
    >
      <body className="min-h-full w-full flex flex-col scrollbar-thin">
        {children}
      </body>
    </html>
  );
}
