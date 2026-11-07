import PageBanner from "@/components/ui/PageBanner";
import UpcomingEventsGrid from "@/components/collections/UpcomingEventsGrid";
import PreviousEventsSection from "@/components/collections/PreviousEventsSection";

export const metadata = {
  title: "Collections & Events | My Study Hub",
  description: "Explore our collections, webinars, and upcoming events.",
};

export default function CollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F7F4EE" }}>
      <PageBanner
        title="Events & Collections"
        subtitle="Stay updated with our latest webinars, educational fairs, and events"
        backgroundImage="/home/about-graduation.png"
        overlayOpacity={0.6}
      />
      <div className="py-12">
        <UpcomingEventsGrid />
        <PreviousEventsSection />
      </div>
    </div>
  );
}
