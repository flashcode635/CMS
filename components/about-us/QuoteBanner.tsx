/**
 * QuoteBanner — Figma node 7:439
 *
 * Layout:
 *  - open.svg  → absolute, top-left corner, partially overflows
 *  - closed.svg → absolute, bottom-right corner, partially overflows
 *  - Quote text → centered over the whole block, with padding so it
 *    doesn't clash with the quote marks
 */

import Image from "next/image";

export default function QuoteBanner() {
  return (
    <section className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10 lg:py-14">
      {/* Outer wrapper — relative so absolute children anchor to it */}
      <div className="relative w-full max-w-361 mx-auto">

        {/* ── Opening quotes — top-left, partially sticking out ── */}
        <div className="absolute top-0 left-0 z-10">
          <Image
            src="/home/open.svg"
            alt=""
            width={140}
            height={125}
            aria-hidden
            unoptimized
          />
        </div>

        {/* ── Closing quotes — bottom-right, partially sticking out ── */}
        <div className="absolute bottom-0 right-0 z-10">
          <Image
            src="/home/closed.svg"
            alt=""
            width={138}
            height={126}
            aria-hidden
            unoptimized
          />
        </div>

        {/* ── Quote text — centred, padded away from corners ── */}
        <p
          className="relative z-20 text-center w-full
                     px-[clamp(80px,12vw,200px)]
                     py-[clamp(48px,7vw,96px)]"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "clamp(22px, 3.33vw, 64px)",
            lineHeight: 1.5,
            color: "var(--color-ink)",
          }}
        >
          The biggest adventure you can take is to live the life of your dreams.
        </p>

      </div>
    </section>
  );
}
