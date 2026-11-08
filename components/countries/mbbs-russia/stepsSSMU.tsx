/**
 * "Documents Required" block for Samara State Medical University (SSMU).
 *
 * Layout: organic, half-pill shaped photos stacked on the left; on the right a
 * green accent bar + gradient heading, two intro paragraphs, and a two-column
 * grid of white document cards (the final card spans both columns).
 *
 * The photos are stand-ins: the design's stethoscope / classroom / desk shots
 * are not in `public/`, so the closest existing assets are imported below.
 * Swap the three imports (and nothing else) when the final photos are added.
 */

import {
  Activity,
  Camera,
  ClipboardCheck,
  Copy,
  FileText,
  Mail,
  Stamp,
  type LucideIcon,
} from "lucide-react";

import stethoscope from "@/public/bg-doctor.jpg";
import classroom from "@/public/about-us/front-image.jpg";
import desk from "@/public/contact-us/chairs.jpg";

import { COUNTRY_CONTENT } from "@/lib/constants";
import type { DocumentItem } from "@/types/interfaces";

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

export type StepsSSMUProps = {
  /** Gradient heading. */
  heading?: string;
  /** The two intro paragraphs under the heading. */
  intro?: string[];
  /** Document card labels (icon, red tone, and wide flag are presentation). */
  documents?: DocumentItem[];
};

/* Icons are presentation, not copy — paired with the constants list by index. */
const REQUIRED_DOCUMENT_ICONS: LucideIcon[] = [
  FileText,
  FileText,
  Camera,
  ClipboardCheck,
  Mail,
  Stamp,
  Activity,
  Copy,
  Stamp,
  Copy,
  FileText,
];

const SECTION_BG =
  "linear-gradient(115deg, var(--color-surface-alt) 0%, var(--color-surface) 45%, var(--color-surface-alt) 100%)";

const PHOTO_SHAPE = "rounded-[1.5rem_999px_999px_1.5rem]";

export default function StepsSSMU({
  heading = RUSSIA.documents?.heading ?? "",
  intro = RUSSIA.documents?.intro ?? [],
  documents = RUSSIA.documents?.items ?? [],
}: StepsSSMUProps) {
  return (
    <section
      aria-labelledby="ssmu-documents-heading"
      className="relative w-full overflow-hidden py-10 @min-[640px]:py-14 @min-[1024px]:py-16"
      style={{ backgroundColor: "var(--color-surface)", backgroundImage: SECTION_BG }}
    >
            <div className="pointer-events-none absolute inset-y-12 inset-x-0 z-0 flex flex-col gap-4">
            <div
                aria-hidden="true"
                className="flex-1 ml-[32%] rounded-[999px_0_0_999px] bg-white/25 blur-[2px] @min-[1024px]:ml-[35%] @min-[1024px]:bg-white/30"
            />
            <div
                aria-hidden="true"
                className="flex-1 ml-[38%] rounded-[999px_0_0_999px] bg-white/20 blur-[2px] @min-[1024px]:ml-[39%] @min-[1024px]:bg-white/25"
            />
            <div
                aria-hidden="true"
                className="flex-1 ml-[29%] rounded-[999px_0_0_999px] bg-white/15 blur-[2px] @min-[1024px]:ml-[33%] @min-[1024px]:bg-white/20"
            />
            </div>
      <div className="relative z-10 mx-auto w-full max-w-350 px-4 @min-[640px]:px-6 @min-[1024px]:pr-8 @min-[1024px]:pl-0">
        <div className="flex flex-col gap-8 @min-[1024px]:flex-row @min-[1024px]:items-start @min-[1024px]:gap-[7%] @min-[1280px]:gap-[8%]">
          {/* ── Left: stacked photos (full-bleed to the section edge on desktop) ── */}
          <div className="w-full shrink-0 @min-[1024px]:w-[36%] @min-[1280px]:w-[35%]">
            <div className="grid grid-cols-2 gap-2 @min-[640px]:gap-3 @min-[1024px]:grid-cols-1">
              <div
                className={`col-span-2 overflow-hidden @min-[1024px]:col-span-1 @min-[1024px]:w-[80%] ${PHOTO_SHAPE}`}
              >
                <img
                  src={stethoscope.src}
                  alt="Stethoscope resting on a doctor's coat"
                  className="h-28 w-full object-cover @min-[1024px]:h-46 @min-[1024px]:aspect-3/4"
                  loading="lazy"
                />
              </div>

              <div
                className={`overflow-hidden @min-[1024px]:mt-1 @min-[1024px]:w-[112%] ${PHOTO_SHAPE}`}
              >
                <img
                  src={classroom.src}
                  alt="Medical students in a classroom discussion"
                  className="h-32 w-full object-cover @min-[640px]:h-20 @min-[1024px]:h-62 @min-[1024px]:aspect-6/7"
                  loading="lazy"
                />
              </div>

              <div
                className={`overflow-hidden @min-[1024px]:mt-1 @min-[1024px]:w-[74%] ${PHOTO_SHAPE}`}
              >
                <img
                  src={desk.src}
                  alt="Rows of empty lecture hall chairs"
                  className="h-32 w-full object-cover @min-[640px]:h-40 @min-[1024px]:h-auto @min-[1024px]:aspect-4/3"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* ── Right: heading + documents ── */}
          <div className="w-full">
            <div className="mb-6 @min-[640px]:mb-8">
              <div className="flex items-stretch gap-3 @min-[640px]:gap-4">
                <span
                  aria-hidden="true"
                  className="w-1.25 shrink-0 rounded-full bg-brand-forest"
                />
                <h2
                  id="ssmu-documents-heading"
                  className="font-['Inter',sans-serif] text-[26px] leading-[1.15] font-semibold tracking-[-0.01em] @min-[640px]:text-[32px] @min-[1024px]:text-[36px] @min-[1280px]:text-[40px]"
                  style={{
                    backgroundImage:
                      "linear-gradient(149.75deg, var(--color-brand-forest) 12.7%, var(--color-brand-forest-deep) 87.2%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  {heading}
                </h2>
              </div>

              <div className="mt-4 pl-4.25 @min-[640px]:pl-5.25">
                {intro.map((paragraph, i) => (
                  <p
                    key={i}
                    className={`max-w-190 font-['Inter',sans-serif] text-[13px] leading-[1.55] text-body @min-[640px]:text-sm ${i > 0 ? "mt-2" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Mobile: horizontal swipe-row of document cards; sm+ keeps the
                original 2-col grid. */}
            <ul className="flex flex-row overflow-x-auto @min-[640px]:grid @min-[640px]:grid-cols-2 gap-2.5 @min-[640px]:gap-3">
              {documents.map(({ label, tone, wide }, index) => {
                const Icon = REQUIRED_DOCUMENT_ICONS[index] ?? FileText;
                return (
                <li
                  key={label}
                  className={`flex w-full shrink-0 @min-[640px]:w-auto items-center gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 shadow-md shadow-black/5 @min-[640px]:px-5 ${
                    wide ? "@min-[640px]:col-span-2" : ""
                  }`}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-alt">
                    <Icon
                      aria-hidden="true"
                      className={`h-5 w-5 ${
                        tone === "red" ? "text-red-500" : "text-brand-forest-deep"
                      }`}
                      strokeWidth={1.9}
                    />
                  </span>
                  <span className="font-['Inter',sans-serif] text-[12.5px] leading-[1.4] font-medium text-ink @min-[640px]:text-[13.5px]">
                    {label}
                  </span>
                </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
