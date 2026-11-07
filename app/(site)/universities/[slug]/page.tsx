"use client";
import RussiaBanner from "@/components/countries/mbbs-russia/RussiaBanner";
import UnivSections from "@/components/universities/sections";
import { useParams } from "next/navigation";
import Faq from "@/components/ui/Faq";
import UnivNav from "@/components/universities/univNav";
import StudentTestimonials from "@/components/universities/studentTestimonials";

export default function UniversityPage() {
    const { slug } = useParams() as { slug: string };
   const name = slug.replace(/(^|-)([a-z])/g, (_, sep, char) => 
  (sep ? " " : "") + char.toUpperCase()
);

const DEFAULT_CONTENT = {
  sectionLabel: "MBBS in " + name + " hero banner",
  title: name,
  subtitle:
    "Enroll at Samara State Medical University with the expert guidance, ensuring a smooth application process.",
  rating: "4.0",
  ratingLabel: "Rating: 4.0 out of 5 stars",
  yellowStarSrc: "/svg/star-yellow.svg",
  greyStarSrc: "/svg/star-grey.svg",
  consultationHref: "/contact-us",
  consultationLabel: "Book a Free Consultation",
  languagesLabel: "Languages Spoken:",
  languages: "English, Russian, Tatar, Bashkir, and Ukrainian",
  currencyLabel: "Currency:",
  currency: "Russian Ruble",
};

    return(
        <div className="flex flex-col @container">
        <RussiaBanner
            sectionLabel = {DEFAULT_CONTENT.sectionLabel}
            title = {DEFAULT_CONTENT.title}
            subtitle = {DEFAULT_CONTENT.subtitle}
            rating = {DEFAULT_CONTENT.rating}
            ratingLabel = {DEFAULT_CONTENT.ratingLabel}
            yellowStarSrc = {DEFAULT_CONTENT.yellowStarSrc}
            greyStarSrc = {DEFAULT_CONTENT.greyStarSrc}
            consultationHref = {DEFAULT_CONTENT.consultationHref}
            consultationLabel = {DEFAULT_CONTENT.consultationLabel}
            languagesLabel = {DEFAULT_CONTENT.languagesLabel}
            languages = {DEFAULT_CONTENT.languages}
            currencyLabel = {DEFAULT_CONTENT.currencyLabel}
            currency = {DEFAULT_CONTENT.currency}
        />
              {/* Nav: ab normal flow mein, section ke bottom pe */}
      <UnivNav universityName={name} />

      <UnivSections universityName={name} />

      <StudentTestimonials />
      {slug}
           <Faq/>
        </div>
    )
}