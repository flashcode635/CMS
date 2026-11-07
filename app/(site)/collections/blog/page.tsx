import PageBanner from "@/components/ui/PageBanner";
import BlogsGrid from "@/components/blog-details/BlogsGrid";
import MBBSAbroadHero from "@/components/homepage/MBBSAbroadHero";

export const metadata = {
    title: "Blog | My Study Hub",
    description:
        "Read the latest blogs and articles about studying abroad, visa guides, scholarships, student life, and more from My Study Hub.",
};

export default function BlogPage() {
    return (
        <div className="flex flex-col @container" style={{ backgroundColor: "#f6f7fb" }}>
            {/* ── Banner ── */}
            <PageBanner
                title="Blog"
                subtitle="Insights, guides, and stories to help you navigate your journey of studying abroad."
                backgroundImage="/home/about-graduation.jpg"
                overlayOpacity={0.5}
            />

            {/* ── Blogs grid (featured + cards) ── */}
            <BlogsGrid />
         <MBBSAbroadHero/>

        </div>
    );
}
