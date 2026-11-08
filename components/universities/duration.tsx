"use client";

type DurationStage = {
    duration: string;
    title: string;
    description: string;
    label: string;
    color: string;
};

type DurationProps = {
    anchorId?: string;
    sectionLabel?: string;
    titleGreen?: string;
    titleBlue?: string;
    totalLabel?: string;
    totalDuration?: string;
    totalUnit?: string;
    cardTitle?: string;
    cardIntro?: string;
    stages?: DurationStage[];
};

export const DEFAULT_CONTENT: Required<DurationProps> = {
    anchorId: "mbbs-duration",
    sectionLabel: "Duration of MBBS at Samara State Medical University",
    titleGreen: "Duration Of MBBS At",
    titleBlue: "Samara State Medical University",
    totalLabel: "Total Duration",
    totalDuration: "6",
    totalUnit: "Years",
    cardTitle: "Duration of MBBS at Samara State University, Russia",
    cardIntro:
        "The total duration of the MBBS course at Samara State Medical University is 6 years.",
    stages: [
        {
            duration: "5 YEARS",
            title: "Theoretical + practical medical training",
            description: "Academic study",
            label: "Academic study",
            color: "var(--color-brand-forest-deep)",
        },
        {
            duration: "1 YEAR",
            title: "Clinical practice",
            description: "Compulsory internship",
            label: "Compulsory internship",
            color: "var(--color-brand-champagne)",
        },
    ],
};

export default function DurationSection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    totalLabel = DEFAULT_CONTENT.totalLabel,
    totalDuration = DEFAULT_CONTENT.totalDuration,
    totalUnit = DEFAULT_CONTENT.totalUnit,
    cardTitle = DEFAULT_CONTENT.cardTitle,
    cardIntro = DEFAULT_CONTENT.cardIntro,
    stages = DEFAULT_CONTENT.stages,
}: DurationProps) {
    return (
        <section
            id={anchorId || undefined}
            aria-label={sectionLabel}
            className="bg-[linear-gradient(115deg,var(--color-surface-alt)_0%,var(--color-surface-alt)_48%,var(--color-surface-alt)_100%)] py-14 @min-[640px]:py-16 @min-[1024px]:py-20"
        >
            <div className="mx-auto max-w-6xl px-5 @min-[640px]:px-8">
                <h2 className="flex items-center gap-4 text-2xl font-medium leading-tight @min-[640px]:text-3xl @min-[1024px]:text-4xl">
                    <span
                        aria-hidden="true"
                        className="h-14 w-1 flex-none rounded-full bg-brand-forest @min-[640px]:h-16"
                    />
                    <span>
                        <span className="text-brand-forest">{titleGreen}</span>
                        <br />
                        <span className="text-brand-royal">{titleBlue}</span>
                    </span>
                </h2>

                <div className="mx-auto mt-10 flex max-w-3xl flex-col overflow-hidden rounded-xl ring-1 ring-white/60 shadow-lg shadow-brand-forest-deep/20 @min-[640px]:flex-row">
                    <div className="flex min-h-56 w-full flex-col justify-center bg-[linear-gradient(135deg,var(--color-brand-forest)_0%,var(--color-brand-forest)_34%,var(--color-brand-royal)_100%)] px-7 py-7 text-white @min-[640px]:min-h-64 @min-[640px]:w-[34%] @min-[640px]:px-6">
                        <p className="text-xs font-medium @min-[640px]:text-sm">{totalLabel}</p>
                        <div className="mt-1 flex items-end gap-3">
                            <span className="text-8xl font-light leading-none tracking-tight @min-[640px]:text-9xl">
                                {totalDuration}
                            </span>
                            <span className="mb-2 text-sm @min-[640px]:text-base">{totalUnit}</span>
                        </div>
                    </div>

                    <div className="w-full bg-[linear-gradient(135deg,var(--color-ink)_0%,var(--color-ink)_52%,var(--color-ink)_100%)] px-5 py-5 text-white @min-[640px]:w-[66%] @min-[640px]:px-7 @min-[640px]:py-6">
                        <h3 className="max-w-md font-sub text-base font-semibold leading-tight @min-[640px]:text-lg">
                            {cardTitle}
                        </h3>
                        <p className="mt-2 text-[9px] text-brand-champagne-soft/70 @min-[640px]:text-[10px]">
                            {cardIntro}
                        </p>

                        <div className="mt-5">
                            {stages.map((stage, index) => (
                                <div
                                    key={`${stage.duration}-${stage.title}`}
                                    className={`grid grid-cols-[8px_1fr_auto] items-center gap-3 py-3 ${
                                        index > 0
                                            ? "border-t border-white/15"
                                            : ""
                                    }`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="h-5 w-1 rounded-full"
                                        style={{ backgroundColor: stage.color }}
                                    />
                                    <div>
                                        <p
                                            className="text-[9px] font-medium"
                                            style={{ color: stage.color }}
                                        >
                                            {stage.duration}
                                        </p>
                                        <p className="mt-1 text-[9px] text-brand-champagne-soft/70">
                                            {stage.title}
                                        </p>
                                    </div>
                                    <p className="text-right text-[8px] text-brand-champagne-soft/60">
                                        {stage.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
