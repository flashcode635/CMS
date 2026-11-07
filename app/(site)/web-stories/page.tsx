import MBBSAbroadHero from "@/components/homepage/MBBSAbroadHero";
import PageBanner from "@/components/ui/PageBanner";
import WebStoriesCarousel from "@/components/web-stories/WebStoriesCarousel";
import WebStoriesViewer from "@/components/web-stories/WebStoriesViewer";

export const metadata = {
  title: "Web Stories | My Study Hub",
  description: "Visual web stories about MBBS abroad, university reviews, and student experiences.",
};

export default function WebStoriesPage() {
  return (
    <div className="flex flex-col min-h-screen @container" style={{ backgroundColor: "#f8fafc" }}>
      <PageBanner
        title="Web Stories"
        subtitle="Explore quick visual stories and updates about medical education abroad"
        backgroundImage="/home/about-graduation.jpg"
        overlayOpacity={0.6}
      />
        <WebStoriesViewer />
      <div className="max-w-7xl mx-auto px-4 py-16 w-full bg-brand-sky">
        <WebStoriesCarousel />
      </div>

      <MBBSAbroadHero/>
    </div>
  );
}
