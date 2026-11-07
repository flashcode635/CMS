import PageBanner from "@/components/ui/PageBanner";
import HeadingOfCard from "@/components/ui/HeadingOfCard";
import AboutImageSection from "@/components/about-us/AboutImageSection";
import AboutTextContent from "@/components/about-us/AboutTextContent";
import MissionCoreValues from "@/components/about-us/MissionCoreValues";
import QuoteBanner from "@/components/about-us/QuoteBanner";
import NationalPresence from "@/components/about-us/NationalPresence";
import LocationMap from "@/components/about-us/LocationMap";
import ContactSection from "@/components/about-us/ContactSection";
import MeetOurTeam from "../homepage/MeetOurTeam";
import FaqSection from "./lastsection";
import LocationPin from "./LocationMap";
import ExpertCounsellingSection from "../homepage/ExpertCounsellingSection";
export const metadata = {
  title: "About Us | My Study Hub",
  description: "Learn more about My Study Hub and our mission to help students study MBBS abroad.",
};

export default function AboutUsPage() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "#e1f0f9", width: "100%" }}>
      {/* ── Page Banner ── */}
      <PageBanner
        title="About Us"
        subtitle="Learn more about who we are"
        backgroundImage="/home/about-graduation.jpg"
        overlayOpacity={0.5}
      />

      {/* ── Section 2: Know More About Us ── */}
      <HeadingOfCard type="bold" title="Know More About Us" description={
        (
          <>
            <div
          className="flex flex-col text-[#606c83]"
          style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 300 }}
        >
          
          <p className="text-base flex justify-start items-end sm:text-lg leading-relaxed">
            <span
              className="float-left font-normal text-[2rem] sm:text-[2.3rem] leading-none "
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              W
            </span>
            elcome to My Study Hub, a premier Medical Education Consultancy
            in Delhi, India. Our mission is to assist 
          </p>

       
          <p className="text-base sm:text-lg leading-relaxed">
            aspiring medical students
            in realizing their dreams of studying MBBS Abroad by providing
            exceptional guidance and support throughout the entire admission
            process.
            <br/>
            <br/>

            At My Study Hub, we recognize that the decision to study abroad
            can be daunting, particularly for those pursuing a career in
            medicine. That&apos;s why we have a dedicated team of experienced
            counselors and professionals committed to making the process as
            smooth and stress-free as possible for our clients.
          </p>
        </div>
          </>
        )
      }  />

      {/* ── Section 3: About Image with floating cards ── */}
      <AboutImageSection />

      {/* ── Section 4: How Can We Help / What Makes Us Ideal ── */}
      <AboutTextContent />

      {/* ── Section 5: Our Mission & Core Values ── */}
      <MissionCoreValues />

      {/* ── Section 6: Quote Banner ── */}
      <QuoteBanner />

      {/* ── Section 7:  Meet Our Team ── */}
      <MeetOurTeam />

      {/* ── Section 8: Our National Presence ── */}
      <NationalPresence />

      {/* ── Section 9: Office locations map ── */}
     <ExpertCounsellingSection type="location" />
      {/* ── Section 10: Get In Touch / Contact + Form ── */}
      <FaqSection />

    </div>
  );
}
