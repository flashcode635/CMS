import Image from "next/image";

/**
 * Hero banner for the Contact Us page.
 * Matches the Figma design:
 *  - Black background
 *  - Stethoscope background image (semi-transparent overlay)
 *  - "STUDY PALACE HUB" eyebrow in white spaced caps
 *  - "Contact Us" in large serif italic
 *  - "Grow Together in Excellence" subtitle
 */
export default function ContactHeroBanner() {
  return (
    <section
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{ height: "clamp(280px, 28vw, 420px)", background: "var(--color-brand-forest-deep)" }}
      aria-label="Contact Us banner"
    >
      {/* Stethoscope background photo */}
      <div
        className="absolute inset-0"
        style={{ opacity: 0.45 }}
        aria-hidden
      >
        <Image
          src="/bg-doctor.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Bottom fade so it blends into the mint section below */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "35%",
          background: "linear-gradient(to bottom, transparent, var(--color-brand-forest-deep))",
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center gap-3 text-center px-6"
      >
        {/* Eyebrow */}
        <p
          className="text-white font-semibold uppercase tracking-[0.22em]"
          style={{ fontSize: "clamp(10px, 0.95vw, 15px)", letterSpacing: "3.4px" }}
        >
          My Study Hub
        </p>

        {/* Main title */}
        <h1
          className="text-white"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            fontStyle: "normal",
            fontSize: "clamp(36px, 5.5vw, 88px)",
            lineHeight: 1.05,
            textShadow: "0 2px 16px color-mix(in srgb, black 50%, transparent)",
          }}
        >
          Contact Us
        </h1>

        {/* Subtitle */}
        <p
          className="text-white/75 font-normal"
          style={{ fontSize: "clamp(13px, 1vw, 18px)" }}
        >
          Grow Together in Excellence
        </p>
      </div>
    </section>
  );
}
