import image1 from "@/public/countries/logo.jpg";
import image2 from "@/public/home/blog-graduation.jpg";
import InfoCard,{  type InfoCardProps } from "@/components/ui/infoCard";
import Image from "next/image";
import { COUNTRY_CONTENT } from "@/lib/constants";

/* Fallback copy lives in lib/constants.tsx -> COUNTRY_CONTENT.russia */
const RUSSIA = COUNTRY_CONTENT.russia;

export type AdmissionProcessProps = {
  /** Gradient heading. */
  heading?: string;
  /** Numbered step cards passed to InfoCard. */
  steps?: InfoCardProps["card"][];
};

export default function AdmissionProcess({
  heading = RUSSIA.admissionHeading ?? "",
  steps = (RUSSIA.admissionSteps ?? []) as InfoCardProps["card"][],
}: AdmissionProcessProps) {
    return(
        <>
        

      <section
        className="relative overflow-hidden bg-cover bg-center bg-no-repeat! 
        min-h-[50vh]!"
        style={{ backgroundImage: `url(${image2.src})` }}
        >
        {/* gradient overlay, image ke upar */}
        <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-linear-to-l from-brand-forest-deep via-brand-forest-deep/95 to-brand-forest-deep/40"
        />
        <div className="relative z-10 left-5 top-5 h-20 w-20
         shrink-0 overflow-y-hidden rounded-full bg-white ring-2 ring-white/30">
           <Image src={image1} alt="SPH logo" className="h-full
            w-full object-cover" />
        </div>

        {/* content, overlay ke upar */}
        <div className="relative z-10 grid grid-cols-1
         @min-[768px]:grid-cols-2 p-10 @min-[640px]:p-14 @min-[640px]:pt-10 @min-[1024px]:p-16">
            <div className="col-span1 h-full flex flex-col justify-center items-start gap-4 "></div>
            <div className="col-span-1 flex flex-col justify-center items-start gap-4">
            <div className="flex items-stretch gap-3 @min-[640px]:gap-4">
                <span
                aria-hidden="true"
                className="w-1.25 shrink-0 rounded-full bg-brand-forest"
                />
                <h2
                id="ssmu-documents-heading"
                className="font-['Inter',sans-serif] text-[26px] leading-[1.15] tracking-[-0.01em] @min-[640px]:text-[30px] @min-[1024px]:text-[34px] @min-[1280px]:text-[36px]"
                style={{
                    backgroundImage:
                    "linear-gradient(149.75deg, var(--color-brand-forest) 12.7%, var(--color-brand-sky) 87.2%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                }}
                >
                {heading}
                </h2>
            </div>
            {/* Scroll area: starts at the first card (justify-start) so nothing is
                pushed above the top edge. Mobile: horizontal card row (flex-row);
                md+: the original capped vertical scroller (flex-col). The caps
                follow the card height: ~250-300px on phones, ~170px on desktop. */}
            <div className="bg-white rounded-lg shadow-md p-4 @min-[640px]:p-6 @min-[1024px]:p-8 mt-6 @min-[768px]:mt-0 w-full @min-[768px]:max-w-140 gap-4 flex flex-row @min-[768px]:flex-col items-stretch justify-start
             min-h-70 overflow-x-auto @min-[768px]:overflow-x-auto @min-[768px]:overflow-y-auto @min-[768px]:max-h-[46vh] @min-[1024px]:max-h-[30vh] @min-[1024px]:min-h-65
             scrollbar-gutter-stable">
                {steps.map((card, i) => (
                    <div key={i} className="flex w-full shrink-0 flex-col justify-center items-center @min-[768px]:w-auto">

                        <InfoCard lgw={false} card={card} />
                    </div>
                ))}
            </div>
          </div>
        </div>
        </section>
        </>
    )
}