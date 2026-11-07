import Image from "next/image";

// ─────────────────────────────────────────────────────────────────────────────
// Shared colour tokens
// ─────────────────────────────────────────────────────────────────────────────
const GRAD  = "linear-gradient(115.73deg,#0E8F5B 12.704%,#0B3B2E 87.17%)";
const GRAD2 = "linear-gradient(165deg,#0E8F5B 12.704%,#0B3B2E 87.17%)";
const GRAD3 = "linear-gradient(153deg,#0E8F5B 12.704%,#0B3B2E 87.17%)";
const LINE  = "#0E8F5B";           // vertical / horizontal connector colour

// ─────────────────────────────────────────────────────────────────────────────
// Double-check icon  (line-md:check-all)
// ─────────────────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M1.5 12.5L7 18L14 8.5"  stroke="#0E8F5B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M8   12.5L13.5 18L20.5 8.5" stroke="#0B3B2E" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Photo with stacked gradient shadow
// shadowRight=true  → shadow peeks bottom-RIGHT  (Vision row)
// shadowRight=false → shadow peeks bottom-LEFT   (Mission / Goals rows)
// ─────────────────────────────────────────────────────────────────────────────
interface StackedPhotoProps {
  alt: string;
  shadowRight?: boolean;
}

function StackedPhoto({ alt, shadowRight = false }: StackedPhotoProps) {
  return (
    <div style={{ position: "relative", width: "clamp(280px,38vw,562px)", height: "clamp(210px,29vw,424px)", flexShrink: 0 }}>
      {/* gradient shadow rect */}
      <div style={{
        position: "absolute",
        // shadow offset direction
        top:    shadowRight ? "6%"  : "6%",
        left:   shadowRight ? "4.5%" : "-4.5%",
        right:  shadowRight ? "-4.5%" : "4.5%",
        bottom: "-6%",
        backgroundImage: GRAD,
        borderRadius: 14,
        zIndex: 0,
      }} aria-hidden />
      {/* photo — always fills the container, sits on top */}
      <div style={{ position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden", zIndex: 1 }}>
        <Image
          src="/home/about-graduation.png"
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width:768px) 90vw, 40vw"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Text content block
// ─────────────────────────────────────────────────────────────────────────────
interface ContentBlockProps {
  title: string;
  grad: string;
  quote: string;
  subHead: string;
  bullets: string[];
  right?: boolean;
}

function ContentBlock({ title, grad, quote, subHead, bullets, right = false }: ContentBlockProps) {
  return (
    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16, alignItems: right ? "flex-end" : "flex-start" }}>

      {/* two short horizontal lines — bridge from vertical centre line */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: right ? "flex-end" : "flex-start" }}>
        <div style={{ width: 162, height: 3, borderRadius: 99, background: `linear-gradient(${right ? "270deg" : "90deg"},#0E8F5B,#0B3B2E)` }} />
        <div style={{ width: 108, height: 3, borderRadius: 99, background: `linear-gradient(${right ? "270deg" : "90deg"},#0E8F5B,#0B3B2E)`, opacity: 0.55 }} />
      </div>

      {/* gradient heading */}
      <h3 style={{
        fontFamily: "'Inter',sans-serif",
        fontWeight: 500,
        fontSize: "clamp(36px,4.17vw,64px)",
        lineHeight: 1,
        margin: 0,
        backgroundImage: grad,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        textAlign: right ? "right" : "left",
      }}>
        {title}
      </h3>

      {/* italic quote */}
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontWeight: 300,
        fontSize: "clamp(13px,0.9vw,16px)",
        color: "#66716A",
        lineHeight: "1.7",
        margin: 0,
        textAlign: right ? "right" : "left",
      }}>
        {quote}
      </p>

      {/* sub-heading */}
      <p style={{
        fontFamily: "'Inter',sans-serif",
        fontWeight: 600,
        fontSize: "clamp(14px,1.04vw,18px)",
        color: "#4A554F",
        lineHeight: "1.5",
        margin: 0,
        textAlign: right ? "right" : "left",
      }}>
        {subHead}
      </p>

      {/* bullet list */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
        {bullets.map((txt: string, i: number) => (
          <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: right ? "flex-end" : "flex-start" }}>
            {!right && <CheckIcon />}
            <span style={{
              fontFamily: "'Inter',sans-serif",
              fontWeight: 300,
              fontSize: "clamp(13px,0.9vw,16px)",
              color: "#66716A",
              lineHeight: "1.65",
              textAlign: right ? "right" : "left",
            }}>
              {txt}
            </span>
            {right && <CheckIcon />}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Row data
// ─────────────────────────────────────────────────────────────────────────────
const ROWS = [
  {
    id:      "mission",
    imgLeft: true,
    title:   "Our Mission",
    grad:    GRAD2,
    quote:   `"To guide students seamlessly through the MBBS abroad journey with expert counseling, transparent processes, and unwavering support, ensuring admission to top accredited universities."`,
    subHead: "Guiding Your MBBS Abroad Journey:",
    bullets: [
      "Offer expert and personalized counseling for MBBS admissions abroad.",
      "Simplify the admission process with transparent and hassle-free guidance.",
      "Ensure students secure seats in top-ranked, MCI/WHO-recognized universities.",
      "Provide end-to-end support, from application to visa processing and travel.",
      "Assist with document preparation, university selection, and fee payment.",
      "Conduct pre-departure orientations for cultural and academic readiness.",
      "Maintain long-term support for students during their academic journey.",
    ],
  },
  {
    id:      "vision",
    imgLeft: false,
    title:   "Our Vision",
    grad:    GRAD3,
    quote:   `"To empower aspiring medical students by providing access to world-class education and transforming dreams of becoming global healthcare professionals into reality."`,
    subHead: "Empowering Future Healthcare Leaders:",
    bullets: [
      "To empower aspiring medical students.",
      "Fostering global partnerships.",
      "Empower aspiring medical students to achieve their dreams.",
      "Provide access to globally recognized and accredited medical universities.",
      "Transform aspirations of becoming healthcare professionals into successful realities.",
      "Foster a generation of skilled, compassionate, and globally competent doctors.",
      "Bridge the gap between students and world-class medical education.",
    ],
  },
  {
    id:      "goals",
    imgLeft: true,
    title:   "Our Goals",
    grad:    GRAD2,
    quote:   `"To become the most trusted consultancy for MBBS abroad, helping students achieve academic excellence, cultural adaptability, and successful medical careers worldwide."`,
    subHead: "Building Trust, Ensuring Success:",
    bullets: [
      "Foster cultural adaptability and successful medical careers worldwide.",
      "Become the most trusted and reliable MBBS abroad consultancy.",
      "Help students achieve academic excellence and professional growth.",
      "Build strong relationships with students and parents through transparency.",
      "Expand services to cover more countries and universities globally.",
      "Prepare students for licensing exams like FMGE, USMLE, and PLAB.",
      "Contribute to the global healthcare sector by nurturing skilled doctors.",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
export default function MissionCoreValues() {
  return (
    <section style={{ width: "100%", padding: "clamp(48px,6vw,96px) clamp(24px,5vw,120px)" }}>
      <div style={{ maxWidth: 1680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 80 }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "clamp(32px,4.17vw,64px)",
            lineHeight: 1.2,
            margin: 0,
            backgroundImage: "linear-gradient(170deg,#0E8F5B 12.704%,#0B3B2E 87.17%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}>
            Our Mission &amp; Core Values
          </h2>
          <p style={{
            fontFamily: "Inter,sans-serif",
            fontWeight: 400,
            fontSize: "clamp(14px,1.11vw,21px)",
            color: "#66716A",
            lineHeight: 1.5,
            maxWidth: 680,
            margin: 0,
          }}>
            Uncover more additional about us and how we help make your dreams a reality.
          </p>
        </div>

        {/* ── Rows with centre vertical line ── */}
        <div style={{ position: "relative" }}>

          {/* vertical green line through the centre */}
          <div aria-hidden style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            transform: "translateX(-50%)",
            background: LINE,
            zIndex: 0,
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 96, position: "relative", zIndex: 1 }}>
            {ROWS.map((row) => (
              <div
                key={row.id}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 0,
                }}
              >
                {/* LEFT HALF — always paddingRight: 48 to clear the center line */}
                <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 48 }}>
                  {row.imgLeft
                    ? <StackedPhoto alt={row.title} shadowRight={false} />
                    : <ContentBlock
                        title={row.title}
                        grad={row.grad}
                        quote={row.quote}
                        subHead={row.subHead}
                        bullets={row.bullets}
                        right={true}
                      />
                  }
                </div>

                {/* RIGHT HALF — always paddingLeft: 48 to clear the center line */}
                <div style={{ flex: 1, paddingLeft: 48 }}>
                  {row.imgLeft
                    ? <ContentBlock
                        title={row.title}
                        grad={row.grad}
                        quote={row.quote}
                        subHead={row.subHead}
                        bullets={row.bullets}
                        right={false}
                      />
                    : <StackedPhoto alt={row.title} shadowRight={true} />
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
