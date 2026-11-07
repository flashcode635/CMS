"use client";

import AdvancedTrainingSection from "./advancedTraining";

type WhyChooseReason = {
    title: string;
    description: string;
};

type WhyChooseUsProps = {
    /** Anchor id for the sub-nav (WITHOUT the leading "#" — e.g. "why-choose-us"). */
    anchorId?: string;
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part in green (before the university name). */
    titleGreen?: string;
    /** Heading part in blue (the university name part). */
    titleBlue?: string;
    /** Centered subtitle under the heading (two lines in the design). */
    subtitle?: string;
    /** Six numbered reason cards. Numbers are derived from the array order. */
    reasons?: WhyChooseReason[];
};

export const DEFAULT_CONTENT: Required<WhyChooseUsProps> = {
    anchorId: "why-choose-us",
    sectionLabel: "Why choose this university",
    titleGreen: "Why Choose",
    titleBlue: "Samara State Medical University?",
    subtitle:
        "Choosing the right university is a crucial decision for every medical aspirant. Here are compelling reasons to study at SamSMU.",
    reasons: [
        {
            title: "Globally Recognized Degree",
            description:
                "Recognized by major medical bodies such as WHO and NMC, making its degree valid for practicing in India after qualifying licensing exams like FMGE/NExT.",
        },
        {
            title: "Affordable MBBS Fees",
            description:
                "Compared to private medical colleges in India, the fees are much more affordable, making it an excellent option for middle-class families.",
        },
        {
            title: "English Medium Curriculum",
            description:
                "The MBBS program is offered in English, which ensures that international students can easily understand and adapt to the course.",
        },
        {
            title: "Advanced Infrastructure",
            description:
                "Equipped with modern laboratories, digital classrooms, and simulation-based training facilities for hands-on experience.",
        },
        {
            title: "Indian Student-Friendly",
            description:
                "Significant number of Indian students, availability of Indian food, and cultural inclusivity adds to the comfort.",
        },
        {
            title: "Safe Living Environment",
            description:
                "Samara is considered a safe city for international students, with good public transport and a peaceful environment.",
        },
    ],
};

export default function WhyChooseUsSection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    subtitle = DEFAULT_CONTENT.subtitle,
    reasons = DEFAULT_CONTENT.reasons,
}: WhyChooseUsProps) {
    return (
        <>
            <section
                id={anchorId}
                aria-label={sectionLabel}
                className="bg-[linear-gradient(120deg,#EDF3EF_0%,#EDF3EF_50%,#EFE9DE_100%)] py-16 @min-[1024px]:py-24"
            >
                <div className="mx-auto max-w-6xl px-4 @min-[640px]:px-6">
                    {/* md+ pe single-line gradient (design) — mobile pe natural wrap, warna long
                        university names canvas se bahar nikal jaate hain */}
                    <h2 className="text-center text-[clamp(1.25rem,4vw,1.875rem)] font-semibold leading-tight @min-[768px]:whitespace-nowrap">
                        <span className="inline-block bg-linear-to-r from-brand-emerald-deep to-brand-navy bg-clip-text text-transparent">
                            {titleGreen} {titleBlue}
                        </span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-muted">
                        {subtitle}
                    </p>

                    <div className="mt-12 grid grid-cols-1 gap-5 @min-[640px]:grid-cols-2 @min-[1024px]:grid-cols-3">
                        {reasons.map((reason, index) => (
                            <div
                                key={reason.title}
                                className="relative rounded-xl bg-white p-5 pl-7 shadow-sm"
                            >
                                <div
                                    aria-hidden="true"
                                    className="absolute bottom-3 left-0 top-3 w-1 rounded-r-full bg-brand-emerald"
                                />
                                <h3 className="text-base font-semibold text-[#1C2B25]">
                                    {index + 1}. {reason.title}
                                </h3>
                                <p className="mt-3 text-xs leading-relaxed text-muted">
                                    {reason.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
              <AdvancedTrainingSection />  
            </section>
        </>
    );
}
