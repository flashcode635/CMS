/**
 * WhyPartnerWithUs — Figma node 271:970
 * Partner With Us page — 2nd component
 *
 * Centered section:
 *  - Gradient Inter ExtraBold heading "Why Partner With Us?"
 *  - Drop-cap "W" intro paragraph in Inter Light
 *  - "collaboration and mutual growth" bolded inline
 */

export default function WhyPartnerWithUs() {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 py-12 lg:py-16">
      <div className="max-w-300 mx-auto flex flex-col items-center gap-4 text-center">

        {/* ── Gradient heading ── */}
        <h2
          className="font-extrabold bg-clip-text text-transparent"
          style={{
            fontFamily: "var(--font-sub)",
            fontSize: "clamp(28px, 3.33vw, 48px)",
            lineHeight: "1.3",
            backgroundImage:
              "linear-gradient(165.04deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
          }}
        >
          Why Partner With Us?
        </h2>

        {/* ── Body with drop-cap W ── */}
        <p
          className="text-body text-center"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: "clamp(14px, 1.04vw, 18px)",
            lineHeight: "27px",
            maxWidth: "1156px",
          }}
        >
          {/* Drop-cap W — larger, floats left */}
          <span
            className="float-left mr-0.5 mt-1 leading-none"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: "clamp(24px, 2.22vw, 32px)",
              color: "var(--color-body)",
              lineHeight: "48px",
            }}
          >
            W
          </span>
          elcome to My Study Hub, your gateway to pursuing an MBBS
          education overseas! We invite you to become a valued partner in
          our mission to assist aspiring medical students in achieving their
          dreams of studying abroad. Partnering with My Study Hub for
          MBBS overseas opens up a world of opportunities for{" "}
          <strong
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
            }}
          >
            collaboration and mutual growth
          </strong>
          .
        </p>

      </div>
    </section>
  );
}
