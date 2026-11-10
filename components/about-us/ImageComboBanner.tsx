import Image from "next/image";

/* ──────────────────────────────────────────────────────────────────────────
   GEOMETRY — one table, every height/width in viewport units (vw).

   height   Height of the whole section (≈ width ÷ 1.876, the ratio of the
            reference silhouette; change it freely, the frame follows).
   bgInset  How much shorter the library photo behind the frame is, per side
            (vh). It floats slightly inside the section so the white frame
            overhangs it a touch. Set to 0vh to make it full-height again.
   width    Width of the framed photo; the leftover shows the green/blue strips.
   frame    Thickness of the white band around the photo.
   badge*   Glass badge geometry (badgeW = badge width, tile = gradient square).
   ────────────────────────────────────────────────────────────────────────── */
type ScaleRow = {
  height: string;
  width: string;
  frame: string;
  badgeW: string;
  tile: string;
  pad: string;
  gap: string;
  radius: string;
  title: string;
  subtitle: string;
};

const SCALE: Record<"base" | "md" | "lg", ScaleRow> = {
  base: { height: "46.9vw", width: "88vw", frame: "2.2vw", badgeW: "34vw", tile: "9vw", pad: "1.1vw", gap: "2vw", radius: "2.6vw", title: "2.9vw", subtitle: "2.4vw" },
  md: { height: "41.6vw", width: "78vw", frame: "1.8vw", badgeW: "22vw", tile: "5vw", pad: "0.8vw", gap: "1.2vw", radius: "1.6vw", title: "1.5vw", subtitle: "1.2vw" },
  lg: { height: "38.06vw", width: "71.4vw", frame: "1.5vw", badgeW: "17vw", tile: "4.2vw", pad: "0.55vw", gap: "0.8vw", radius: "1vw", title: "1.05vw", subtitle: "0.82vw" },
};

/* ──────────────────────────────────────────────────────────────────────────
   CURVES — every rounded shape in the banner. Percentages of the box, so the
   silhouette is identical at every width.

   x / y are the four corners of the white frame in CSS order
   (top-left, top-right, bottom-right, bottom-left). To make the frame
   symmetric, give mirrored corners the same value; for square ends set all
   four to 0%.
   ────────────────────────────────────────────────────────────────────────── */
const CURVE = {
  x: { topLeft: "3%", topRight: "32%", bottomRight: "3%", bottomLeft: "32%" },
  y: { topLeft: "6%", topRight: "54%", bottomRight: "6%", bottomLeft: "64%" },
  /** Gradient tile inside the glass badge: corner radius ÷ tile size. */
  tile: "0.24",
  /** Glass badge corner radius per breakpoint (vw, tuned in SCALE.radius). */
};

const FRAME_RADIUS =
  `${CURVE.x.topLeft} ${CURVE.x.topRight} ${CURVE.x.bottomRight} ${CURVE.x.bottomLeft} / ` +
  `${CURVE.y.topLeft} ${CURVE.y.topRight} ${CURVE.y.bottomRight} ${CURVE.y.bottomLeft}`;

/** Background photo sits this much lower at the top and bottom (vh). */
const BG_INSET = "1vh";

/** Space between the two text lines inside a glass badge. */
const BADGE_LINE_GAP = "0.2vw";

const decls = (s: ScaleRow) =>
  `--icb-h:${s.height};--icb-w:${s.width};--icb-f:${s.frame};` +
  `--icb-bw:${s.badgeW};--icb-bt:${s.tile};--icb-bp:${s.pad};` +
  `--icb-bg:${s.gap};--icb-br:${s.radius};--icb-b1:${s.title};--icb-b2:${s.subtitle};`;

const SHARED = `--icb-bi:${BG_INSET};--icb-bc:${CURVE.tile};`;

const BANNER_CSS =
  `.icb{${decls(SCALE.base)}${SHARED}}` +
  `@media(min-width:768px){.icb{${decls(SCALE.md)}}}` +
  `@media(min-width:1024px){.icb{${decls(SCALE.lg)}}}`;

const SIDE_WASH_LEFT =
  "linear-gradient(90deg, color-mix(in srgb, var(--color-brand-royal) 97%, transparent) 0%, color-mix(in srgb, var(--color-brand-forest) 92%, transparent) 12%, " +
  "color-mix(in srgb, var(--color-brand-forest) 64%, transparent) 24%, color-mix(in srgb, var(--color-brand-forest) 30%, transparent) 34%, transparent 46%)";

const SIDE_WASH_RIGHT =
  "linear-gradient(270deg, color-mix(in srgb, var(--color-brand-forest-deep) 97%, transparent) 0%, color-mix(in srgb, var(--color-brand-champagne) 92%, transparent) 12%, " +
  "color-mix(in srgb, var(--color-brand-champagne) 64%, transparent) 24%, color-mix(in srgb, var(--color-brand-champagne) 30%, transparent) 34%, transparent 46%)";

function CircleTick() {
  return (
    <svg viewBox="0 0 38 38" fill="none" aria-hidden className="h-full w-full">
      <circle cx="19" cy="19" r="16" stroke="white" strokeWidth="2" opacity="0.7" />
      <path
        d="M12 19.5L17.2 24.7L26.8 14.6"
        stroke="white"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GlassBadge({
  title,
  subtitle,
  style,
}: {
  title: string;
  subtitle: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="absolute z-10 flex items-center"
      style={{
        width: "var(--icb-bw)",
        padding: "var(--icb-bp)",
        gap: "var(--icb-bg)",
        borderRadius: "var(--icb-br)",
        background: "color-mix(in srgb, var(--color-brand-forest-deep) 30%, transparent)",
        backdropFilter: "blur(16px) saturate(1.4)",
        WebkitBackdropFilter: "blur(16px) saturate(1.4)",
        border: "1px solid color-mix(in srgb, white 42%, transparent)",
        boxShadow:
          "0 10px 26px color-mix(in srgb, var(--color-brand-forest-deep) 30%, transparent), 0 0 0 1px color-mix(in srgb, white 12%, transparent), inset 0 1px 0 color-mix(in srgb, white 30%, transparent)",
        ...style,
      }}
    >
      {/* Gradient icon tile */}
      <span
        className="relative flex shrink-0 items-center justify-center"
        style={{
          width: "var(--icb-bt)",
          height: "var(--icb-bt)",
          borderRadius: "calc(var(--icb-bt) * var(--icb-bc))",
          backgroundImage: "linear-gradient(108.93deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)",
          boxShadow: "inset 0 1px 1px color-mix(in srgb, white 25%, transparent)",
        }}
      >
        <span className="block h-[64%] w-[64%]">
          <CircleTick />
        </span>
      </span>

      {/* Copy */}
      <span className="flex min-w-0 flex-col" style={{ gap: BADGE_LINE_GAP }}>
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-white"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: "var(--icb-b1)",
            lineHeight: 1.2,
            textShadow: "0 1px 2px color-mix(in srgb, var(--color-brand-forest-deep) 35%, transparent)",
          }}
        >
          {title}
        </span>
        <span
          className="overflow-hidden text-ellipsis whitespace-nowrap"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: "var(--icb-b2)",
            lineHeight: 1.25,
            color: "color-mix(in srgb, white 72%, transparent)",
          }}
        >
          {subtitle}
        </span>
      </span>
    </div>
  );
}

export default function ImageComboBanner({
  bgImage = "/about-us/bg-midsection.jpg",
  frontImage = "/about-us/front-image.jpg",
  badgeTitle = "Elite Colleges",
  badgeSubtitle = "Top Ranked Universities",
}: {
  bgImage?: string;
  frontImage?: string;
  badgeTitle?: string;
  badgeSubtitle?: string;
}) {
  return (
    <section
      className="icb relative w-full overflow-hidden"
      style={{ height: "var(--icb-h)" }}
    >
      <style>{BANNER_CSS}</style>

      {/* ================= BACKGROUND (library photo + colour washes) ============
          Inset by --icb-bi top and bottom, so the framed photo overhangs the
          photo band slightly instead of ending flush with it. */}
      <div
        className="absolute inset-0"
        style={{ inset: "var(--icb-bi) 0" }}
        aria-hidden
      >
        <Image
          src={bgImage}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: SIDE_WASH_LEFT }} />
        <div className="absolute inset-0" style={{ background: SIDE_WASH_RIGHT }} />
        <div className="absolute inset-0" style={{ background: "color-mix(in srgb, var(--color-brand-forest-deep) 24%, transparent)" }} />
      </div>

      {/* ================= FRAMED PHOTO =========================================
          Full section height (no padding); only the width is inset, which leaves
          the green/blue strips visible on either side. */}
      <div
        className="relative mx-auto h-full"
        style={{ width: "var(--icb-w)" }}
      >
        {/* white frame + photo share the curved ends */}
        <div
          className="absolute inset-0 overflow-hidden bg-white"
          style={{
            border: "var(--icb-f) solid var(--color-surface-alt)",
            borderRadius: FRAME_RADIUS,
            // boxShadow: "0 22px 55px color-mix(in srgb, var(--color-brand-forest-deep) 22%, transparent)"
          }}
        >
          <Image
            src={frontImage}
            alt="Medical students discussing a case around a table"
            fill
            sizes="(max-width: 768px) 88vw, (max-width: 1024px) 78vw, 72vw"
            className="object-cover object-center"
          />
        </div>

        {/* badges sit above the frame so they can bleed onto the white band */}
        <GlassBadge
          title={badgeTitle}
          subtitle={badgeSubtitle}
          style={{ top: "var(--icb-f)", left: "calc(var(--icb-f) * 0.35)" }}
        />
        <GlassBadge
          title={badgeTitle}
          subtitle={badgeSubtitle}
          style={{ bottom: "calc(var(--icb-f) * 0.9)", right: "calc(var(--icb-f) * 0.35)" }}
        />
      </div>
    </section>
  );
}
