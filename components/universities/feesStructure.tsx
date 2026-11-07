"use client";

import { Info } from "lucide-react";

/**
 * FeeStructure — "University Fee <Year>" section:
 * mint→periwinkle band; green-bar heading, a row of dark navy per-year fee
 * cards (rows of label→value pairs + a TOTAL footer, first card highlightable),
 * then an "approx total" navy chip and a mess-charge note pill.
 *
 * CMS compatibility (same approach as the other university sections):
 *  - Every prop is optional with a default from `DEFAULT_CONTENT`, so a CMS can
 *    render it with plain JSON via `<FeeStructureSection {...cmsContent} />`.
 *  - Fees are plain strings ("4,50,000 RUB") — no parsing, formatting stays
 *    exactly what the CMS author wrote.
 *  - Cards render in array order; any number of years works. The highlighted
 *    (orange-bordered) card is driven by `highlight: true`, not by position.
 */

type FeeRow = {
    /** Row label, e.g. "Tuition Fee". Doubles as the React key. */
    label: string;
    /** Row value as display text, e.g. "25,000 RUB" or "—" for none. */
    value: string;
};

type FeeCard = {
    /** Big year label, e.g. "1st Year". */
    year: string;
    /** Optional small tag rendered above the card (e.g. "First Year"). */
    tag?: string;
    /** List of fee rows. */
    rows: FeeRow[];
    /** Total line, e.g. "5,07,000 RUB + 1400 USD". */
    total: string;
    /** Highlight the card (orange border + orange total), per the design's 1st card. */
    highlight?: boolean;
};

type FeeStructureProps = {
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Heading part in green (before the university name). */
    titleGreen?: string;
    /** Heading part in blue (the university name part). */
    titleBlue?: string;
    /** Per-year fee cards. */
    cards?: FeeCard[];
    /** Left label of the approx-total chip (uppercased by CSS). */
    approxLabel?: string;
    /** Right value of the approx-total chip. */
    approxTotal?: string;
    /** Text of the mess-charge note pill. */
    messChargeNote?: string;
};

export const DEFAULT_CONTENT: Required<FeeStructureProps> = {
    sectionLabel: "University fee structure",
    titleGreen: "Samara State",
    titleBlue: "Medical University Fee 2026",
    cards: [
        {
            year: "1st Year",
            tag: "First Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "22,000 RUB" },
                { label: "Medical & Visa", value: "25,000 RUB" },
                { label: "Admin Charges", value: "1400 USD" },
            ],
            total: "5,07,000 RUB + 1400 USD",
            highlight: true,
        },
        {
            year: "2nd Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "3rd Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "4th Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "5th Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "6th Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
    ],
    approxLabel: "Approx. 6 years",
    approxTotal: "27,57,000 RUB + 1400 USD",
    messChargeNote: "Mess Charge = 1200$ for 1st Year only",
};

export default function FeeStructureSection({
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    titleGreen = DEFAULT_CONTENT.titleGreen,
    titleBlue = DEFAULT_CONTENT.titleBlue,
    cards = DEFAULT_CONTENT.cards,
    approxLabel = DEFAULT_CONTENT.approxLabel,
    approxTotal = DEFAULT_CONTENT.approxTotal,
    messChargeNote = DEFAULT_CONTENT.messChargeNote,
}: FeeStructureProps) {
    return (
        <section
            aria-label={sectionLabel}
            className="bg-[linear-gradient(120deg,#EDF3EF_0%,#EDF3EF_50%,#EFE9DE_100%)] py-16 @min-[1024px]:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                <div className="flex gap-4">
                        <div
                            aria-hidden="true"
                            className="w-1.5 flex-none rounded-full bg-brand-emerald"
                        />
                        <h2 className="text-2xl font-semibold leading-snug @min-[1024px]:text-3xl">
                            <span className="text-brand-emerald-deep">{titleGreen}</span>{" "}
                            <span className="text-brand-emerald-deep">{titleBlue}</span>
                        </h2>
                    </div>

                    {/* Per-year fee cards — horizontally scrollable when they overflow */}
                    <div className="mt-10 flex gap-3 overflow-x-auto pb-3 pt-2 @min-[1024px]:grid @min-[1024px]:grid-cols-6 @min-[1024px]:gap-3 @min-[1024px]:overflow-visible @min-[1024px]:pb-0">
                        {cards.map((card) => (
                            <div
                                key={card.year}
                                className={`flex w-52 flex-none flex-col rounded-xl bg-[#072A21] p-4 text-white shadow-md @min-[1024px]:w-auto ${
                                    card.highlight
                                        ? "border-2 border-orange-400"
                                        : "border border-[#072A21]"
                                }`}
                            >
                                {card.tag && (
                                    <p className="text-[9px] font-semibold uppercase tracking-wide text-orange-400">
                                        {card.tag}
                                    </p>
                                )}
                                <p className="text-[9px] uppercase tracking-wide text-brand-champagne-soft/70">
                                    Year
                                </p>
                                <p className="text-sm font-bold">{card.year}</p>

                                <dl className="mt-3 space-y-2">
                                    {card.rows.map((row) => (
                                        <div
                                            key={row.label}
                                            className="flex items-baseline justify-between gap-2"
                                        >
                                            <dt className="text-[10px] text-brand-champagne-soft/70">
                                                {row.label}
                                            </dt>
                                            <dd className="text-[10px] font-semibold text-white">
                                                {row.value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>

                                <div className="mt-4 border-t border-white/15 pt-3">
                                    <p className="text-[9px] uppercase tracking-wide text-brand-champagne-soft/70">
                                        Total:
                                    </p>
                                    <p
                                        className={`mt-0.5 text-xs font-bold leading-snug ${
                                            card.highlight
                                                ? "text-orange-400"
                                                : "text-white"
                                        }`}
                                    >
                                        {card.total}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Approx-total chip + mess-charge note */}
                    <div className="mt-6 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-3 rounded-lg bg-[#072A21] py-3 pl-4 pr-5 shadow-md">
                            <div
                                aria-hidden="true"
                                className="h-9 w-1 flex-none rounded-full bg-brand-emerald"
                            />
                            <div>
                                <p className="text-[9px] font-semibold uppercase tracking-wide text-brand-champagne-soft/70">
                                    {approxLabel}
                                </p>
                                <p className="mt-0.5 text-sm font-bold text-white">
                                    {approxTotal}
                                </p>
                            </div>
                        </div>

                        <p className="inline-flex items-center gap-2 text-xs font-medium text-body">
                            <Info
                                aria-hidden="true"
                                className="h-4 w-4 text-orange-500"
                            />
                            {messChargeNote}
                        </p>
                    </div>
            </div>
        </section>
    );
}
