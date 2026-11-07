/**
 * /gallery/images — Gallery Images page
 * Accessible from "Images" in the Gallery navbar dropdown.
 */

import PageBanner from "@/components/ui/PageBanner";
import GalleryGrid from "@/components/images/GalleryGrid";
import MBBSAbroadHero from "@/components/homepage/MBBSAbroadHero";

export const metadata = {
  title: "Gallery — Images | My Study Hub",
  description:
    "Explore our gallery of events, seminars, academic fests, and Events at My Study Hub.",
};

export default function GalleryImagesPage() {
  return (
    <div className="flex flex-col @container" style={{ backgroundColor: "#F7F4EE" }}>
      {/* ── Section 1: Banner ── */}
      <PageBanner
        title="Seminars, Academic Fests & Events at My Study Hub in pictures"
        subtitle="Explore our memorable moments from events, seminars, and academic fests. Celebrate inspiration, learning of students. Look at community workshops and events through our gallery. "
        backgroundImage="/home/about-graduation.png"
        overlayOpacity={0.5}
      />

      {/* ── Section 2: Filter + Grid ── */}
      <GalleryGrid />
      
      
    </div>
  );
}
