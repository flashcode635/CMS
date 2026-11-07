import PageBanner from "@/components/ui/PageBanner";
import BrochuresIntro from "@/components/brochures/BrochuresIntro";
import BrochuresGrid from "@/components/brochures/BrochuresGrid";
import { DUMMY_BROCHURES } from "@/lib/constants";
export const metadata = {
    title: "Brochures | My Study Hub",
    description:
        "Download official brochures, prospectuses, and admission guides for studying MBBS abroad with My Study Hub.",
};

// ── Dummy data — replace with real API fetch when backend is ready ────────────
// Shape each object must match when switching to real API:
// { id, title, description, coverImage, fileUrl, fileName, year }


// TODO: Replace this with a real API fetch when the backend is ready.
// Example replacement:
//
// async function getBrochures() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brochures`, {
//         next: { revalidate: 300 },
//     });
//     const data = await res.json();
//     return Array.isArray(data) ? data : (data.brochures ?? []);
// }
async function getBrochures() {
    return DUMMY_BROCHURES;
}

export default async function BrochuresPage() {
    const brochures = await getBrochures();

    return (
        <div className="flex flex-col" style={{ backgroundColor: "#e8f2f4" }}>
            {/* ── Banner ── */}
            <PageBanner
                title="Brochures"
                subtitle="Download all official My Study Hub brochures and get complete information about studying MBBS abroad."
                backgroundImage="/home/about-graduation.jpg"
                overlayOpacity={0.5}
            />

            {/* ── Intro (text + collage) ── */}
            <BrochuresIntro />

            {/* ── Brochures grid — data from backend ── */}
            <BrochuresGrid brochures={brochures} />
        </div>
    );
}
