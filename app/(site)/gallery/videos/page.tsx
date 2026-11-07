/**
 * /gallery/videos — Gallery Videos page
 * Accessible from "Videos" in the Gallery navbar dropdown.
 */

import PageBanner from "@/components/ui/PageBanner";
import VideoGrid from "@/components/videos/VideoGrid";

export const metadata = {
  title: "Gallery — Videos | Study Palace Hub",
  description:
    "Watch our video highlights from events, seminars, fresher's parties, and academic fests at Study Palace Hub.",
};

export default function GalleryVideosPage() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "#e8f0f9" }}>
      {/* ── Section 1: Banner ── */}
      <PageBanner
        title="Gallery"
        subtitle="Watch our memorable moments from events, seminars, and academic fests"
        backgroundImage="/home/about-graduation.jpg"
        overlayOpacity={0.5}
      />

      {/* ── Section 2: Featured video + grid ── */}
      <VideoGrid />
    </div>
  );
}
