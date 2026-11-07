/**
 * /gallery/images/[slug] — Individual event gallery page
 * e.g. /gallery/images/event-2025
 *
 * Opened when user clicks "View Gallery" on any event card.
 * Sections: PageBanner → EventDescription → EventGalleryGrid → EventContactForm
 */

import PageBanner from "@/components/ui/PageBanner";
import EventDescription from "@/components/images/EventDescription";
import EventGalleryGrid from "@/components/images/EventGalleryGrid";
import EventContactForm from "@/components/images/EventContactForm";

// Format slug → display title: "event-2025" → "Event 2025"
function formatTitle(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = formatTitle(slug);
  return {
    title: `${title} Gallery | Study Palace Hub`,
    description: `Explore the moments and highlights from the ${title} organized by Study Palace Hub.`,
  };
}

export default async function EventGalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const displayTitle = formatTitle(slug);

  return (
    <div className="flex flex-col @container" style={{ backgroundColor: "#e8f0f9" }}>

      {/* ── Section 1: Banner ── */}
      <PageBanner
        title={displayTitle}
        subtitle="Explore the moments and highlights from this event"
        backgroundImage="/home/about-graduation.jpg"
        overlayOpacity={0.5}
      />

      {/* ── Section 2: Event description / highlights ── */}
      <EventDescription />

      {/* ── Section 3: Photo grid ── */}
      <EventGalleryGrid />

      {/* ── Section 4: Contact / lead-gen form ── */}
      <EventContactForm />

    </div>
  );
}
