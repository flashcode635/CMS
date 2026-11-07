import "./globals.css";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Typography: Inter (UI/body) + Playfair Display (headings) are imported once
// at the top of globals.css and exposed through the --font-sans / --font-serif
// theme tokens. Keep component-level font stacks limited to those two families.
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
