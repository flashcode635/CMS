"use client";

import bgDoctorImg from "@/public/bg-doctor.jpg";
import { BookOpen, CalendarCheck, Globe, Play, Target, type LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import type { ReactNode } from "react";

type FmgeFeature = {
    label: string;
    icon: ReactNode;
};

type FmgeClassesProps = {
    /** Anchor id for the sub-nav (WITHOUT the leading "#" — e.g. "fmge-classes"). */
    anchorId?: string;
    /** Accessible label for the section (visually hidden). */
    sectionLabel?: string;
    /** Blue heading next to the green bar. */
    title?: string;
    /** Intro paragraph under the heading. */
    intro?: string;
    /** Light feature rows (icon + label bars). */
    features?: FmgeFeature[];
    /** Italic quote in the tinted box with green bar. */
    quote?: string;
    /** YouTube watch/embed URL; when empty a placeholder thumbnail is shown. */
    videoUrl?: string;
    /** Title of the video (used for the iframe title + caption link). */
    videoTitle?: string;
    /** Small caption under the video card. */
    videoCaption?: string;
    /* --- Bottom block --- */
    pathwaysTitle?: string;
    pathwaysParagraphs?: string[];
    /** Brand line under the paragraphs (uppercase label + icon). */
    standardsLabel?: string;
    standardsIcon?: ReactNode;
    /** Thumbnail shown when videoUrl is empty. */
    videoPoster?: StaticImageData | string;
};

const featureIcon = (Icon: LucideIcon) => <Icon className="h-4 w-4 text-teal-500" aria-hidden="true" />;

export const DEFAULT_CONTENT: Required<FmgeClassesProps> = {
    anchorId: "fmge-classes",
    sectionLabel: "FMGE Classes",
    title: "FMGE Classes at Samara State Medical University",
    intro: "FMGE Classes at Samara State Medical University help Indian students pursuing MBBS in Russia prepare effectively for the FMGE exam.",
    features: [
        { label: "FMGE focused syllabus", icon: featureIcon(BookOpen) },
        { label: "Weekly & Monthly mock tests", icon: featureIcon(CalendarCheck) },
        { label: "Revision & exam strategy", icon: featureIcon(Target) },
    ],
    quote: "Structured guidance for better FMGE results.",
    videoUrl: "https://www.youtube.com/embed/GQE1qhbj-ag?rel=0&modestbranding=1", // TODO: paste the real YouTube watch/embed URL here (or pass via prop on the page)
    videoTitle: "FMGE Classes at Samara State Medical University",
    videoCaption: "FMGE Classes at Samara State Medical University",
    videoPoster: bgDoctorImg,
    pathwaysTitle: "Global Career Pathways",
    pathwaysParagraphs: [
        "Furthermore, the WFME accreditation qualifies graduates to pursue the Educational Commission for Foreign Medical Graduates (ECFMG) certification, which is a prerequisite for medical careers in the USA and Canada. Accreditation also emphasizes the importance of qualifying your qualifications recognized in various countries.",
        "Graduates can also potentially apply for United States Medical Licensing Examination USMLE, which is a crucial step for medical license in the USA.",
    ],
    standardsLabel: "International standards",
    standardsIcon: (
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-teal-500 text-white">
            <Globe className="h-4 w-4" aria-hidden="true" />
        </span>
    ),
};

export default function FmgeClassesSection({
    anchorId = DEFAULT_CONTENT.anchorId,
    sectionLabel = DEFAULT_CONTENT.sectionLabel,
    title = DEFAULT_CONTENT.title,
    intro = DEFAULT_CONTENT.intro,
    features = DEFAULT_CONTENT.features,
    quote = DEFAULT_CONTENT.quote,
    videoUrl = DEFAULT_CONTENT.videoUrl,
    videoTitle = DEFAULT_CONTENT.videoTitle,
    videoCaption = DEFAULT_CONTENT.videoCaption,
    videoPoster = DEFAULT_CONTENT.videoPoster,
    pathwaysTitle = DEFAULT_CONTENT.pathwaysTitle,
    pathwaysParagraphs = DEFAULT_CONTENT.pathwaysParagraphs,
    standardsLabel = DEFAULT_CONTENT.standardsLabel,
    standardsIcon = DEFAULT_CONTENT.standardsIcon,
}: FmgeClassesProps) {
    const embedSrc = videoUrl
        ? videoUrl.replace("watch?v=", "embed/")
        : "";

    return (
        <section
            id={anchorId}
            aria-label={sectionLabel}
            className="bg-white py-16 @min-[1024px]:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 @min-[640px]:px-6 @min-[1024px]:px-25">
                {/* Top: left copy + right video card */}
                <div className="grid grid-cols-1 gap-12 @min-[1024px]:grid-cols-[5fr_6fr] @min-[1024px]:gap-16">
                    {/* Left: heading, intro, features, quote */}
                    <div>
                        <div className="flex gap-4">
                            <div
                                aria-hidden="true"
                                className="w-1.5 flex-none rounded-full bg-green-600"
                            />
                            <h2 className="text-2xl font-semibold leading-snug text-blue-600 @min-[1024px]:text-3xl">
                                {title}
                            </h2>
                        </div>

                        <p className="mt-6 text-xs leading-relaxed text-slate-500 @min-[1024px]:pl-5.5">
                            {intro}
                        </p>

                        <div className="mt-6 space-y-3 @min-[1024px]:pl-5.5">
                            {features.map((feature) => (
                                <div
                                    key={feature.label}
                                    className="flex items-center gap-3 rounded-lg bg-[#eef0f7] px-4 py-3"
                                >
                                    {feature.icon}
                                    <span className="text-xs font-medium text-slate-700">
                                        {feature.label}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#eaf1fd] p-4 @min-[1024px]:ml-5.5">
                            <div
                                aria-hidden="true"
                                className="h-full w-1 flex-none rounded-full bg-green-600"
                            />
                            <p className="text-sm font-medium italic text-blue-600">
                                &ldquo;{quote}&rdquo;
                            </p>
                        </div>
                    </div>

                    {/* Right: video card (placeholder until videoUrl is set) */}
                    <div className="self-center overflow-hidden rounded-2xl bg-white shadow-lg">
                        {embedSrc ? (
                            <iframe
                                src={embedSrc}
                                title={videoTitle}
                                className="aspect-video w-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : (
                            <div className="relative aspect-video">
                                <Image
                                    src={videoPoster}
                                    alt={videoTitle}
                                    className="h-full w-full object-cover"
                                    placeholder="blur"
                                />
                                {/* TODO: replace with a real YouTube embed once videoUrl is provided */}
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-black/20"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="flex h-12 w-16 items-center justify-center rounded-[10px] bg-[#ff0000] shadow-md">
                                        <Play
                                            className="h-6 w-6 fill-white text-white"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-2 px-4 py-3">
                            <div
                                aria-hidden="true"
                                className="w-1 flex-none rounded-full bg-green-600"
                            />
                            <p className="text-sm font-medium text-blue-600">
                                {videoCaption}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom: career pathways block */}
                <div className="mt-12">
                    <h3 className="text-lg font-semibold text-green-600">
                        {pathwaysTitle}
                    </h3>
                    <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-500">
                        {pathwaysParagraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                        ))}
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                        {standardsIcon}
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600">
                            {standardsLabel}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
