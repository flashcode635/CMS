/**
 * /about-us/services — Services page
 * Accessible from the "Our Services" link in the About Us navbar dropdown.
 */

import PageBanner from "@/components/ui/PageBanner";
import ServicesGrid from "@/components/services/ServicesGrid";
import AdmissionProcess from "@/components/services/AdmissionProcess";
import HeadingOfCard from "@/components/ui/HeadingOfCard";
import FaqSection from "@/components/about-us/lastsection";

export const metadata = {
  title: "Our Services | My Study Hub",
  description:
    "Explore the comprehensive services My Study Hub offers — from personal counseling and university selection to FMGE coaching and on-arrival support.",
};

export default function ServicesPage() {
  return (
    <div className="flex flex-col" style={{ backgroundColor: "#F7F4EE" }}>
      {/* ── Banner ── */}
      <PageBanner
        title="Our Services"
        subtitle="Comprehensive guidance for every step of your MBBS abroad journey"
        backgroundImage="/bg-doctor.jpg"
        overlayOpacity={0.5}
      />

      {/* ── Services grid ── */}
      
      <HeadingOfCard type="bold" title="Services At My Study Hub" description={
        (
          <>
             <div
          className="flex flex-col text-[#4A554F]"
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
        >
          
          <p className="text-base flex justify-start items-end sm:text-lg leading-relaxed">
            <span
              className="float-left font-normal text-[1.25rem] sm:text-[1.8rem] leading-none "
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              A
            </span>
            t My Study Hub, we not only assist you with the admissions process for your MBBS in Abroad, but we also guide
          </p>
       
          <p className="text-base sm:text-lg leading-relaxed">
            you every step of the way. We are here to support you throughout your medical education, helping you obtain your degree and pursue the career of your dreams. Our comprehensive services make studying MBBS Abroad easier, simpler, and hassle-free, allowing you to fully enjoy the experience and maximize its benefits!
           
          </p>
        </div>
          </>
        )
      }/>
      <ServicesGrid />
      {/* ── Admission Process timeline ── */}
      <AdmissionProcess />
      
      <div className="">

          <FaqSection/>
      </div>
      
    </div>
  );
}
