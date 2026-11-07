import PageBanner from "@/components/ui/PageBanner";
import type { ReactNode } from "react";
import { CARD_GRADIENTS, COUNTRY_CONTENT } from "@/lib/constants";
import type { FactItem } from "@/types/interfaces";
import {
  Users,
  Banknote,
  MapPin,
  Globe,
  Clock,
  Sun,
  GraduationCap,
  Languages,
  type LucideIcon,
} from "lucide-react";

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

export type AboutCountryProps = {
  /** PageBanner title ("About Russia"). */
  heading?: string;
  /** PageBanner subtitle. */
  subtitle?: string;
  /** The summary paragraphs in the white card (JSX allowed). */
  paragraphs?: ReactNode[];
  /** Fact cards (icon + wide flag are presentation). */
  facts?: FactItem[];
};

const CARD_STYLE = "bg-white rounded-2xl shadow-md";
const GRADIENT_ID = "card-icon-gradient";

/* Icons are presentation, not copy — paired with the constants list by index. */
const FACT_ICONS: LucideIcon[] = [
  Users,
  Banknote,
  MapPin,
  Globe,
  Clock,
  Sun,
  GraduationCap,
  Languages,
];

// CARD_GRADIENTS (CSS string) ko parse karke SVG gradient banata hai, icon ke 24x24 space mein
function GradientDefs() {
  const angle = parseFloat(CARD_GRADIENTS.match(/([\d.]+)deg/)?.[1] ?? "180");
  const stops = [...CARD_GRADIENTS.matchAll(/(rgb\([^)]+\))\s+([\d.]+)%/g)];

  const rad = (angle * Math.PI) / 180;
  const dx = (Math.sin(rad) / 2) * 24;
  const dy = (-Math.cos(rad) / 2) * 24;

  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient
          id={GRADIENT_ID}
          gradientUnits="userSpaceOnUse"
          x1={12 - dx}
          y1={12 - dy}
          x2={12 + dx}
          y2={12 + dy}
        >
          {stops.map(([, color, offset]) => (
            <stop key={offset} offset={`${offset}%`} stopColor={color} />
          ))}
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function AboutRussia({
  heading = RUSSIA.about?.heading ?? "",
  subtitle = RUSSIA.about?.subtitle ?? "",
  paragraphs = RUSSIA.about?.paragraphs ?? [],
  facts = RUSSIA.about?.facts ?? [],
}: AboutCountryProps) {
  return (
    <>
      <GradientDefs />

      <PageBanner
        title={heading}
        subtitle={subtitle}
        backgroundImage="/home/blog-graduation.jpg"
        overlayOpacity={0.5}
      />

      <section className="relative z-10 -mt-20 @min-[768px]:-mt-28 px-4 @min-[768px]:px-8 @min-[1024px]:px-19 pb-12">
        <div className="container mx-auto">
          <div className={`${CARD_STYLE} p-6 @min-[768px]:p-8 mb-6 text-sm leading-6 text-body space-y-4`}>
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Mobile: horizontal swipe-row of fact cards; md+/lg+ keep the
              original 2/3-col grids. */}
          <div className="flex flex-row overflow-x-auto @min-[768px]:grid @min-[768px]:grid-cols-2 @min-[1024px]:grid-cols-3 gap-4">
            {facts.map(({ id, label, value, wide }, index) => {
              const Icon = FACT_ICONS[index] ?? Users;
              return (
              <div key={id} className={`${CARD_STYLE} p-5 w-full shrink-0 @min-[768px]:w-auto ${wide ? "@min-[1024px]:col-span-2" : ""}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="py-1 px-2.5 text-[10px] font-medium uppercase tracking-wide text-brand-blue bg-brand-sky/10 rounded-full">
                    {label}
                  </span>
                  <Icon className="w-6 h-6" stroke={`url(#${GRADIENT_ID})`} />
                </div>
                <p className="text-lg font-semibold text-ink">{value}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}