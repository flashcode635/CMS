/**
 * WhyPartnerWithUs — Figma node 271:970
 * Partner With Us page — 2nd component
 *
 * Centered section:
 *  - Gradient Inter ExtraBold heading "Why Partner With Us?"
 *  - Drop-cap "W" intro paragraph in Lexend Light
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
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(28px, 3.33vw, 48px)",
            lineHeight: "1.3",
            backgroundImage:
              "linear-gradient(165.04deg, #00923F 12.704%, #3163FF 87.17%)",
          }}
        >
          Why Partner With Us?
        </h2>

        {/* ── Body with drop-cap W ── */}
        <p
          className="text-[#606c83] text-center"
          style={{
            fontFamily: "'Lexend', sans-serif",
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
              fontFamily: "Inter, sans-serif",
              fontWeight: 300,
              fontSize: "clamp(24px, 2.22vw, 32px)",
              color: "#606c83",
              lineHeight: "48px",
            }}
          >
            W
          </span>
          elcome to Study Palace Hub, your gateway to pursuing an MBBS
          education overseas! We invite you to become a valued partner in
          our mission to assist aspiring medical students in achieving their
          dreams of studying abroad. Partnering with Study Palace Hub for
          MBBS overseas opens up a world of opportunities for{" "}
          <strong
            style={{
              fontFamily: "'Lexend', sans-serif",
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
