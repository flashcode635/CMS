
"use client";
import HeroBanner from "@/components/homepage/HeroBanner";
import PartnersMarquee from "@/components/homepage/Marquee";
import MBBSCountries from "@/components/homepage/MBBSCountries";
import MBBSAbroadHero from "@/components/homepage/MBBSAbroadHero";
import OurStrength from "@/components/homepage/OurStrength";
import BigNewsSection from "@/components/homepage/BigNewsSection";
import AmbassadorSection from "@/components/homepage/AmbassadorSection";
import TestimonialsSection from "@/components/homepage/TestimonialsSection";
import AboutSection from "@/components/homepage/AboutSection";
import PersonalisedServices from "@/components/homepage/PersonalisedServices";
import GloballyRecognizedUniversities from "@/components/homepage/GloballyRecognizedUniversities";
import SearchSection from "@/components/homepage/SearchSection";
import LatestBlogs from "@/components/homepage/LatestBlogs";
import MBBSAbroad from "@/components/homepage/MBBSAbroad";
import MeetOurTeam from "@/components/homepage/MeetOurTeam";
import ExpertCounsellingSection from "@/components/homepage/ExpertCounsellingSection";
import FreshersPartyHighlights from "@/components/homepage/FreshersPartyHighlights";
import EnrollNowSection from "@/components/homepage/EnrollNowSection";

import { useState, ChangeEvent } from "react";
import {SearchBar} from "@/components/ui/searchbar";
const searchTags = ["Courses", "Services", "Nearby Counsellor", "Contact Us"];



export default function Home() {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div className="flex flex-col @container" style={{ backgroundColor: "#F7F4EE" }}>
      {/* <MBBSHeroSection/> */}
      <HeroBanner />

   <SearchBar color="white" className="absolute max-w-224.25 -translate-x-1/2 rounded-xl top-123 left-1/2 z-20"/>

      <PartnersMarquee />
      <OurStrength />
      <MBBSAbroadHero />
      <BigNewsSection />
      <AmbassadorSection />
      <TestimonialsSection />
      <AboutSection />
      <PersonalisedServices />
      <GloballyRecognizedUniversities />
      <SearchSection /> {/*PX TO VW VALUE CHANGE KRNI HAI*/}
      <LatestBlogs /> {/*PX TO VW VALUE CHANGE KRNI HAI*/}
      <MBBSAbroad /> {/*PX TO VW VALUE CHANGE KRNI HAI*/}
      <MeetOurTeam />
      <ExpertCounsellingSection type="flight" />
      <FreshersPartyHighlights />
      <EnrollNowSection />
      <MBBSCountries />

    </div>
  );
}
