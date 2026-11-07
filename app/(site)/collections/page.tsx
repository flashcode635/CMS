import PageBanner from "@/components/ui/PageBanner";
import UpcomingEventsGrid from "@/components/collections/UpcomingEventsGrid";
import PreviousEventsSection from "@/components/collections/PreviousEventsSection";

export const metadata = {
  title: "Collections & Events | StudyPalace Hub",
  description: "Explore our collections, webinars, and upcoming events.",
};

export default function CollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#f8fafc" }}>
      <PageBanner
        title="Events & Collections"
        subtitle="Stay updated with our latest webinars, educational fairs, and events"
        backgroundImage="/home/about-graduation.jpg"
        overlayOpacity={0.6}
      />
      <div className="py-12">
        <UpcomingEventsGrid />
        <PreviousEventsSection />
      </div>
    </div>
  );
}
