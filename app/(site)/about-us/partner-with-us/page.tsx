/**
 * /about-us/partner-with-us
 * Accessible from "Partner With Us" in the About Us navbar dropdown.
 */

import PageBanner from "@/components/ui/PageBanner";
import WhyPartnerWithUs from "@/components/partner-with-us/WhyPartnerWithUs";
import PartnerBenefits from "@/components/partner-with-us/PartnerBenefits";
import PartnershipScope from "@/components/partner-with-us/PartnershipScope";
import BenefitsGallery from "@/components/partner-with-us/BenefitsGallery";
import PartnerContactSection from "@/components/partner-with-us/PartnerContactSection";
import ExclusiveUniversities from "@/components/partner-with-us/ExclusiveUniversities";
import FaqSection from "@/components/about-us/lastsection";

export const metadata = {
  title: "Partner With Us | My Study Hub",
  description:
    "Partner with My Study Hub to help aspiring medical students achieve their dreams of studying MBBS abroad.",
};

export default function PartnerWithUsPage() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "var(--color-surface)" }}>

      {/* ── Section 1: Banner ── */}
      <PageBanner
        title="Partner With Us"
        subtitle="Join us in empowering aspiring medical students to achieve their dreams of studying MBBS abroad."
        backgroundImage="/home/about-graduation.png"
        overlayOpacity={0.5}
      />

      {/* ── Section 2: Why Partner With Us ── */}
      {/* <WhyPartnerWithUs /> */}

      {/* ── Section 3: Partner Benefits ── */}
      <PartnerBenefits />

      {/* ── Section 4: Partnership Scope ── */}
      <PartnershipScope />

      {/* ── Section 5: Benefits Gallery ── */}
      <BenefitsGallery />

      {/* ── Section 6: Get In Touch / Contact Form ── */}
      <PartnerContactSection />

      {/* ── Section 7: Our Exclusive Universities ── */}
      <ExclusiveUniversities />
      <FaqSection slim={false}/>
    </div>
  );
}
