/**
 * Duration breakdown for the MBBS programme at Samara State Medical University
 * (SSMU). Dark section: total duration number on the left, gradient heading on
 * the right, and one card per study stage with a progress bar showing how much
 * of the total course each stage covers.
 *
 * Layout and colours follow the design: green (#00923F) → blue (#3163FF)
 * gradient accents, cards on a translucent surface over a #000B1A canvas.
 */

const BRAND_GREEN = "#00923F";
const BRAND_BLUE = "#3163FF";
const INTERNSHIP_ORANGE = "#FF7A1A";

import { COUNTRY_CONTENT } from "@/lib/constants";
import type { DurationStageItem } from "@/types/interfaces";

type SSMUDurationsProps = {
  university?: string;
  totalYears?: number;
  stages?: DurationStageItem[];
};

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

/* Stage accent colours are presentation, not copy — assigned here by index. */
const STAGE_COLORS = [BRAND_BLUE, INTERNSHIP_ORANGE];

export default function SSMUDurations({
  university = RUSSIA.durations?.university ?? "This University",
  totalYears = RUSSIA.durations?.totalYears ?? 6,
  stages = RUSSIA.durations?.stages ?? [],
}: SSMUDurationsProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-14 @min-[640px]:py-16 @min-[1024px]:py-20 px-5 @min-[640px]:px-8 @min-[1024px]:px-32 @min-[1280px]:px-40"
      style={{ backgroundColor: "#000B1A" }}
      aria-label={`Duration of MBBS at ${university}`}
    >
      {/* Corner decorations: cross cluster + dot grid, mirrored bottom-right.
          Kept off phones/tablets so they never sit on top of the copy. */}
      <CrossCluster className="hidden @min-[1024px]:block absolute left-4 @min-[1280px]:left-10 top-4 w-20 @min-[1280px]:w-28 pointer-events-none select-none" />
      <CrossCluster className="hidden @min-[1024px]:block absolute right-4 @min-[1280px]:right-10 bottom-4 w-20 @min-[1280px]:w-28 rotate-180 pointer-events-none select-none" />

      <div className="relative z-10 mx-auto w-full" style={{ maxWidth: 960 }}>
        {/* ── Top block: total duration + heading ── */}
        <div className="flex flex-col @min-[1024px]:flex-row @min-[1024px]:items-center gap-8 @min-[1024px]:gap-12 @min-[1280px]:gap-16">
          {/* Total duration */}
          <div className="flex shrink-0 flex-col items-start @min-[1024px]:w-55 @min-[1280px]:w-62.5">
            <span
              className="text-white font-medium text-[15px] @min-[640px]:text-[16px] leading-normal"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Total Duration
            </span>

            <span
              className="block font-normal leading-[0.95] tracking-tight select-none"
              style={{
                fontFamily: "'Hanken Grotesk', sans-serif",
                fontSize: "clamp(110px, 12cqw, 168px)",
                backgroundImage: `linear-gradient(158deg, ${BRAND_GREEN} 8%, #0F7F9B 46%, ${BRAND_BLUE} 92%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {totalYears}
            </span>

            <span
              className="text-white font-bold text-[16px] @min-[640px]:text-[18px] leading-normal pl-1"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Years
            </span>
          </div>

          {/* Heading + description */}
          <div className="flex min-w-0 flex-1 items-stretch gap-4 @min-[640px]:gap-6 @min-[1024px]:gap-8">
            <div
              className="w-0.5 shrink-0 rounded-full"
              style={{ backgroundColor: BRAND_GREEN }}
              aria-hidden="true"
            />

            <div className="flex min-w-0 flex-col gap-5 @min-[640px]:gap-6">
              <h2
                className="m-0 font-medium tracking-tight text-[26px] @min-[640px]:text-[34px] @min-[1024px]:text-[40px] @min-[1280px]:text-[44px] leading-[1.18]"
                style={{
                  fontFamily: "'Hanken Grotesk', sans-serif",
                  backgroundImage:
                    "linear-gradient(100deg, #00923F 4%, #0A8674 46%, #3163FF 92%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Duration Of MBBS At{" "}
                <span className="block">{university}</span>
              </h2>

              <p
                className="m-0 text-[13px] @min-[640px]:text-[14px] leading-[1.6] font-normal"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#B7C2D2",
                }}
              >
                The total duration of the MBBS course at {university} is{" "}
                {totalYears} years.
              </p>
            </div>
          </div>
        </div>

        {/* ── Stage cards ──
            Mobile: horizontal swipe-row; md: stacked; lg: 2-col grid ── */}
        <div className="mt-12 @min-[640px]:mt-14 @min-[1024px]:mt-16 flex flex-row overflow-x-auto @min-[768px]:flex-col @min-[768px]:overflow-x-visible @min-[1024px]:grid @min-[1024px]:grid-cols-2 gap-5 @min-[1024px]:gap-6">
          {stages.map((stage, index) => {
            const color = STAGE_COLORS[index % STAGE_COLORS.length];
            const percent = Math.min(
              100,
              Math.round((stage.years / totalYears) * 100)
            );

            return (
              <div
                key={stage.badge}
                className="flex w-full shrink-0 flex-col gap-3 rounded-2xl border px-5 py-5 @min-[640px]:px-6 @min-[640px]:py-6"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.035)",
                  borderColor: "rgba(255, 255, 255, 0.09)",
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] @min-[640px]:text-[11px] font-semibold uppercase tracking-wider text-white"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      backgroundColor: color,
                    }}
                  >
                    {stage.badge}
                  </span>

                  <span
                    className="text-right text-[12px] @min-[640px]:text-[13px] font-semibold text-white leading-snug"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stage.title}
                  </span>
                </div>

                <p
                  className="m-0 text-[12px] @min-[640px]:text-[12.5px] leading-normal font-normal"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#9BA7B8",
                  }}
                >
                  {stage.description}
                </p>

                <div
                  className="h-1.5 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  role="progressbar"
                  aria-valuenow={stage.years}
                  aria-valuemin={0}
                  aria-valuemax={totalYears}
                  aria-label={`${stage.title}: ${stage.years} of ${totalYears} years`}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>

                <span
                  className="text-[10px] @min-[640px]:text-[10.5px] font-normal"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#7C8AA0",
                  }}
                >
                  {stage.years} / {totalYears} years
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Outline path for a thick plus/cross centred on (0, 0), drawn as the 12-point
 * boundary of the shape (with the four concave notches). Consumers position it
 * with `transform="translate(x y) rotate(45)"`.
 */
function crossOutlinePath(halfArm: number, halfThickness: number) {
  const a = halfArm;
  const t = halfThickness;
  const points: Array<[number, number]> = [
    [a, -t],
    [t, -t],
    [t, -a],
    [-t, -a],
    [-t, -t],
    [-a, -t],
    [-a, t],
    [-t, t],
    [-t, a],
    [t, a],
    [t, t],
    [a, t],
  ];

  return (
    points
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
      .join(" ") + " Z"
  );
}

const CROSS_OUTLINE = crossOutlinePath(38, 19);

/**
 * Decorative corner ornament: a solid cross made of two overlapping greys, two
 * thin outlined crosses interlaced behind it, and a 4 x 8 dot grid below.
 */
function CrossCluster({ className }: { className?: string }) {
  const armLight = "#6A7280";
  const armDark = "#4C5461";
  const outline = "#6A7280";

  return (
    <svg
      viewBox="0 0 140 352"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Thin outlined crosses, drawn first so the solid cross sits on top */}
      <g
        stroke={outline}
        strokeWidth="2"
        strokeLinejoin="miter"
        opacity="0.55"
      >
        <path d={CROSS_OUTLINE} transform="translate(54 112) rotate(45)" />
        <path d={CROSS_OUTLINE} transform="translate(76 118) rotate(45)" />
      </g>

      {/* Solid cross: dark copy behind, lighter copy offset up-left on top */}
      <g transform="rotate(45 66 58)">
        <rect x="24" y="45" width="84" height="26" rx="2" fill={armDark} />
      </g>
      <g transform="rotate(-45 66 58)">
        <rect x="24" y="45" width="84" height="26" rx="2" fill={armDark} />
      </g>
      <g transform="rotate(45 60 51)">
        <rect x="18" y="38" width="84" height="26" rx="2" fill={armLight} />
      </g>
      <g transform="rotate(-45 60 51)">
        <rect x="18" y="38" width="84" height="26" rx="2" fill={armLight} />
      </g>
      {/* Dot grid */}
      <g fill={outline} opacity="0.5">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={22 + col * 28}
              cy={172 + row * 24}
              r="3.1"
            />
          ))
        )}
      </g>
    </svg>
  );
}
