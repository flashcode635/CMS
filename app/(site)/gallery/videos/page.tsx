/**
 * /gallery/videos — Gallery Videos page
 * Accessible from "Videos" in the Gallery navbar dropdown.
 */

import PageBanner from "@/components/ui/PageBanner";
import VideoGrid from "@/components/videos/VideoGrid";

export const metadata = {
  title: "Gallery — Videos | My Study Hub",
  description:
    "Watch our video highlights from events, seminars, fresher's parties, and academic fests at My Study Hub.",
};

export default function GalleryVideosPage() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* ── Section 1: Banner ── */}
      <PageBanner
        title="Gallery"
        subtitle="Watch our memorable moments from events, seminars, and academic fests"
        backgroundImage="/home/about-graduation.png"
        overlayOpacity={0.5}
      />

      {/* ── Section 2: Featured video + grid ── */}
      <VideoGrid />
    </div>
  );
}
