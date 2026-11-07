
import PageBanner from "@/components/ui/PageBanner";
import UpcomingEventsGrid from "@/components/collections/UpcomingEventsGrid";
import PreviousEventsSection from "@/components/collections/PreviousEventsSection";

export const metadata = {
    title: "Upcoming Events | My Study Hub",
    description:
        "Explore upcoming MBBS Admission Gateway events hosted by My Study Hub across India.",
};

export default function UpcomingEventPage() {
    return (
        <div
            className="flex flex-col"
            style={{
                background:
                    "linear-gradient(90deg, #EDF3EF 0%, #EFE9DE 100%)",
            }}
        >
            {/* ── Banner ── */}
            <PageBanner
                title="Upcoming Events"
                subtitle="Join us at an MBBS Admission Gateway seminar near you. Meet our counsellors, explore top universities, and take the first step towards your medical career abroad."
                backgroundImage="/home/about-graduation.png"
                overlayOpacity={0.5}
            />

            {/* ── Upcoming Events Grid ── */}
            <UpcomingEventsGrid />

            {/* ── Previous Events (Past Seminars) ── */}
            <PreviousEventsSection />
        </div>
    );
}
