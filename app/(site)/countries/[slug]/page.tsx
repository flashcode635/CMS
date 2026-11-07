import RussiaBanner from "@/components/countries/mbbs-russia/RussiaBanner";
import CountryIntro from "@/components/countries/mbbs-russia/CountryIntro";
import WhyRussia from "@/components/countries/mbbs-russia/WhyRussia";
import EligibilitySection from "@/components/countries/mbbs-russia/EligibilitySection";
import SSMUDurations from "@/components/countries/mbbs-russia/ssmuDurations";

import EventContactForm from "@/components/images/EventContactForm";
import StepsSSMU from "@/components/countries/mbbs-russia/stepsSSMU";
import AdmissionProcess from "@/components/countries/mbbs-russia/stepSection";
import Faq from "@/components/ui/Faq";
import MBBSAbroadHero from "@/components/homepage/MBBSAbroadHero";
import AboutRussia from "@/components/countries/mbbs-russia/AboutRussia";

import { getCountryContent, DEFAULT_COUNTRY_CONTENT } from "@/lib/constants";

export async function generateMetadata({ params }:any) {
  const { slug } = await params;
  const c = getCountryContent(slug);
  return { title: c.metaTitle, description: c.metaDescription };
}

export default async function CountryPage({ params }:any) {
  const { slug } = await params;
  const content = getCountryContent(slug);
  /* Per-country copy, falling back to the neutral defaults for sections the
     country hasn't filled yet (all copy lives in lib/constants.tsx). */
  const c = { ...DEFAULT_COUNTRY_CONTENT, ...content };
  return (
    <div className="flex flex-col @container">
      <RussiaBanner title={content.heroTitle} subtitle={content.heroSubtitle} currency={content.currency} languages={content.languages} />
      <CountryIntro
        heading={c.introHeading}
        paragraphs={c.introParagraphs}
        intro={c.intro}
      />
      <WhyRussia
        points={c.whyPoints}
        heading={c.whyHeading}
        exams={c.whyExams}
        additionalLabel={c.whyAdditionalLabel}
        benefits={c.whyBenefits}
        outro={c.whyOutro}
      />
      <EligibilitySection heading={c.eligibilityHeading} cards={c.eligibilityCards} />
      {/* ...keep the rest */}
      <SSMUDurations
        university={c.durations?.university}
        totalYears={c.durations?.totalYears}
        stages={c.durations?.stages}
      />
      <StepsSSMU
        heading={c.documents?.heading}
        intro={c.documents?.intro}
        documents={c.documents?.items}
      />
      <AdmissionProcess heading={c.admissionHeading} steps={c.admissionSteps} />
      <EventContactForm/>
      <MBBSAbroadHero/>
      <AboutRussia
        heading={c.about?.heading}
        subtitle={c.about?.subtitle}
        paragraphs={c.about?.paragraphs}
        facts={c.about?.facts}
      />
      <Faq/>
    </div>
  );
}

// export default function MBBSInRussiaPage() {
//   return (
//     <div className="flex flex-col">
//       <RussiaBanner />
//       <CountryIntro/>
//       <WhyRussia />
//       <EligibilitySection />
      
//     </div>
//   );
// }
