/**
 * /about-us/services — Services page
 * Accessible from the "Our Services" link in the About Us navbar dropdown.
 */

import PageBanner from "@/components/ui/PageBanner";
import WelcomeBanner from "@/components/career/WelcomeBanner";
import JoinTeamSection from "@/components/career/JoinTeamSection";
import RecruitmentGrid from "@/components/career/RecruitmentGrid";
import FaqSection from "@/components/about-us/lastsection";

export const metadata = {
    title: "Career at SPH | Study Palace Hub",
    description:
        "Explore the comprehensive Career oppurtunities at Study Palace Hub.",
};

export default function ServicesPage() {
    return (
        <div className="flex flex-col" style={{ backgroundColor: "#ffffff" }}>
            {/* ── Banner ── */}
            <PageBanner
                title="Career - Study Palace Hub Pvt Ltd"
                subtitle="Celebrate individuals who have made a meaningful difference. Fill out the nomination form to bestow a prestigious title. Acknowledge exceptional leaders for their societal contributions. Nominate someone today!"
                backgroundImage="/home/about-graduation.jpg"
                overlayOpacity={0.5}
            />
            
            {/* 2nd component of the page */}
            <WelcomeBanner />

            {/* 3rd component of the page */}
            <JoinTeamSection />

            {/* 4th component — Our Recruitment */}
            <RecruitmentGrid />
            <FaqSection />
        </div>
    );
}
