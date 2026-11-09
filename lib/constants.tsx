// This module uses JSX in the default country content, so it must be a .tsx file.
//
// ── CMS content rule ─────────────────────────────────────────────────────────
// Everything below DEFAULT_COUNTRY_CONTENT / DEFAULT_UNIVERSITY_CONTENT that is
// rendered as CMS text (paragraphs, whyPoints, intros, outros...) is PLAIN
// SEMANTIC HTML ONLY — no className=, no style={{...}}, no var(--...) inline.
// Presentation for content-authored markup lives in the renderer components
// (container-level colors) and in the `.cms-prose` / `.cms-prose-inverse`
// rules in app/globals.css (links, strong). Keep it that way so editors can
// never inject CSS through the CMS.
// The only styling exports here are component-layer helpers consumed by code
// (e.g. CARD_GRADIENTS), which is styling code — not CMS text.
import { RussiaBannerProps } from "@/types/types";
import type { ReactNode } from "react";
import Link from "next/link";
import type { CountryContent, UniversityContent } from "@/types/interfaces";
export const CARD_GRADIENTS = 
  "linear-gradient(149.746deg, var(--color-brand-forest) 12.704%, var(--color-blue-600) 87.17%)";
export const gradientTextStyle =  // used with CARD_GRADIENTS
" md:text-transparent  whitespace-nowrap                bg-clip-text text-transparent [-webkit-text-fill-color:transparent]" 
export function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Navbar-style name -> slug ("MBBS in Russia" -> "russia") */
export function nameToSlug(name: string): string {
  return slugify(name.replace(/^MBBS in /i, ""));
}

export const DEFAULT_COUNTRY_CONTENT: CountryContent = {
  name: "Abroad",
  heroTitle: "Study MBBS Abroad",
  heroSubtitle: "Enroll at a top medical university abroad with expert guidance, ensuring a smooth application process.",
  intro: "Study MBBS abroad with world-class education, affordable tuition and globally recognised degrees.",
  whyPoints: [
    <> 
       Indian Students are now choosing <strong>MBBS in Russia</strong> for its affordability &amp; the recognition of its universities worldwide. Renowned institutions such as <strong>Novosibirsk State University</strong>, <strong>Samara State Medical University</strong>, <strong>Ural State Medical University</strong>, and <strong>North Caucasian State Academy</strong> provide high-quality medical education. These universities offer programs taught in English, modern infrastructure, and practical clinical training.
    </>,
   <> 
       Indian Students are now choosing <strong>MBBS in Russia</strong> for its affordability &amp; the recognition of its universities worldwide. Renowned institutions such as <strong>Novosibirsk State University</strong>, <strong>Samara State Medical University</strong>, <strong>Ural State Medical University</strong>, and <strong>North Caucasian State Academy</strong> provide high-quality medical education. These universities offer programs taught in English, modern infrastructure, and practical clinical training.
    </>,
   <> 
       Indian Students are now choosing <strong>MBBS in Russia</strong> for its affordability &amp; the recognition of its universities worldwide. Renowned institutions such as <strong>Novosibirsk State University</strong>, <strong>Samara State Medical University</strong>, <strong>Ural State Medical University</strong>, and <strong>North Caucasian State Academy</strong> provide high-quality medical education. These universities offer programs taught in English, modern infrastructure, and practical clinical training.
    </>,
  ],
  whyHeading: "Why Study MBBS Abroad?",
  whyExams: ["FMGE (India)", "USMLE (USA)", "PLAB (UK)", "MCI Screening Test"],
  whyAdditionalLabel: "Additionally, we provide:",
  whyBenefits: [
    "Affordable tuition compared to Western countries",
    "No donation or entrance exams (only NEET required)",
    "Safe environment & Indian student communities.",
  ],
  whyOutro:
    "With globally accredited degrees, affordable education, and strong career prospects, studying MBBS abroad remains one of the best options for your medical career.",
  eligibility: [
    "Minimum 50% in Physics, Chemistry, Biology (Class 12)",
    "Qualified NEET as per NMC guidelines",
    "Minimum 17 years of age as on 31st December of admission year",
  ],
  eligibilityHeading: "MBBS Eligibility for Indian Students",
  eligibilityCards: [
    {
      number: "1.",
      title: " Educational Qualification",
      description: (
        <>
          {": Candidates must have completed "}
          <strong>{"10+2 (Higher Secondary)"}</strong>
          {" with "}
          <strong>{"Physics, Chemistry, and Biology (PCB)"}</strong>
          {" as mandatory subjects."}
        </>
      ),
    },
    {
      number: "2.",
      title: " Minimum Marks",
      description:
        ": A minimum aggregate of 50% in PCB is required for general category students, while reserved category students (SC/ST/OBC) need at least 40%.",
    },
    {
      number: "3.",
      title: " Age Requirement",
      description:
        ": The student must be at least 17 years old by December 31st of the admission year.",
    },
    {
      number: "4.",
      title: " NEET Qualification",
      description:
        ": Indian students must qualify for the NEET (National Eligibility cum Entrance Test) to be eligible to study MBBS abroad.",
    },
    {
      number: "5.",
      title: " No Entrance Exam",
      description:
        ": Most universities do not require additional entrance exams, making the admission process straightforward.",
    },
  ],
  introHeading: "Study MBBS Abroad",
  introParagraphs: [
    <>
      {"Indian students looking to study MBBS abroad can choose from globally recognised universities approved by the National Medical Commission (NMC) and the "}
      <strong>World Health Organization</strong>
      {" (WHO), offering high-quality medical education in a smooth process."}
    </>,
    <>
      {"Study MBBS abroad with world-class education, affordable tuition and globally recognised degrees."}
    </>,
    <>
      {"In 2026, studying MBBS abroad remains an affordable and practical choice due to "}
      <strong>
        {"affordable fees, high-quality education, and global recognition"}
      </strong>
      {", with leading universities teaching in English."}
    </>,
    <>
      {"At My Study Hub, we guide students at every step - from choosing the right university to complete admission support - ensuring a smooth journey to study MBBS abroad."}
    </>,
  ],
  durations: {
    university: "This University",
    totalYears: 6,
    stages: [
      {
        badge: "5 YEARS",
        title: "Academic study",
        description: "Theoretical + practical medical training",
        years: 5,
      },
      {
        badge: "1 YEAR",
        title: "Compulsory internship",
        description: "Clinical practice",
        years: 1,
      },
    ],
  },
  documents: {
    heading: "Documents Required",
    intro: [
      "All Indian medical aspirants must ensure that they properly gather and organise the required documentation to avoid any unnecessary delays in the review process.",
      "The following documents are required to be submitted by Indian students for the MBBS program:",
    ],
    items: [
      { label: "10th certificate and Mark Sheet" },
      { label: "Scan copy of 12th certificate and Mark Sheet" },
      { label: "Passport-size photos" },
      { label: "NEET Result / Admit Card", tone: "red" },
      { label: "Official invitation letter of the Medical University" },
      { label: "Issue of all documents by the Ministry of Foreign Affairs, New Delhi" },
      { label: "Medical report with HIV test result required at the time of Visa stamping" },
      { label: "Legalization of all documents by the Embassy." },
      { label: "Valid visa." },
      { label: "Valid Passport." },
      { label: "Bank receipt for enrollment in the first year (required for some universities).", wide: true },
    ],
  },
  admissionHeading: "MBBS Admission Process",
  admissionSteps: [
    {
      number: "01",
      title: " Research & Apply",
      description:
        "Choose WHO/NMC-recognised universities, check eligibility (50% in PCB), gather your documents and apply online to receive the admission letter.",
    },
    {
      number: "02",
      title: " Visa & Travel",
      description:
        "Apply for a student visa with the admission letter, pay the tuition fees, book your flights and complete university registration on arrival.",
    },
    {
      number: "03",
      title: " Start MBBS Program",
      description:
        "Begin the 6-year course (including internship), learn basic local language (optional) and participate in clinical practice for hands-on experience.",
    },
    {
      number: "04",
      title: " Post-Admission Support",
      description:
        "Prepare for licensing exams (FMGE/USMLE), stay updated on deadlines and maintain academic performance for a successful medical career.",
    },
  ],
  about: {
    heading: "About the Country",
    subtitle:
      "Discover the rich culture, history, and opportunities that await you in your study destination.",
    paragraphs: [
      "My Study Hub students choose study-abroad destinations for their affordable and high-quality MBBS programs, globally recognised universities, and English-taught coursework.",
      "Medical universities across our destinations hold accreditations from major medical bodies such as the WHO, NMC, and FAIMER, ensuring graduates can practice medicine worldwide.",
      "For aspiring doctors seeking a world-class education at reasonable costs, these countries offer strong theoretical foundations combined with practical training, preparing students to excel in the global healthcare sector.",
    ],
    facts: [],
  },
  languages: "English",
  currency: "—",
  metaTitle: "Study MBBS Abroad | My Study Hub",
  metaDescription: "Study MBBS abroad with expert guidance from My Study Hub.",
};

export const COUNTRY_CONTENT: Record<string, CountryContent> = {
  russia: {
    name: "Russia",
    heroTitle: "MBBS in Russia for Indian Students 2026-27",
    heroSubtitle: "Enroll at top Russian medical universities like Samara State Medical University with expert guidance.",
    /* CountryIntro paragraph 2 — also editable individually via the CMS intro field */
    intro: "Cities like Moscow, St. Petersburg, and Kazan offer a perfect blend of modern infrastructure and rich culture, creating an ideal environment for Indian students.",
    introHeading: "MBBS in Russia for Indian Students 2026-27",
    introParagraphs: [
      <>
        {"Russia, the largest country in the world, is known for its strong education system and excellence in medical studies. With globally recognized universities approved by the National Medical Commission (NMC) and the "}
        <strong>World Health Organization</strong>
        {" (WHO), it has become a top destination for students pursuing MBBS in Russia."}
      </>,
      // slot 2 = `intro` (kept above); CountryIntro swaps this slot for the prop.
      <>
        {"Russia is one of the most popular destinations for Indian students pursuing MBBS, offering NMC-approved universities, affordable fees and world-class infrastructure."}
      </>,
      <>
        {"In 2026, MBBS in Russia remains a popular choice due to "}
        <strong>
          {"affordable fees, high-quality education, and global recognition"}
        </strong>
        {"."}
        <br />
        {"Leading universities such as Novosibirsk State University, Samara State Medical University, Ural State Medical University, and North Caucasus State Medical Academy provide world-class medical education in English."}
      </>,
      <>
        {"At My Study Hub, we guide students at every step - from choosing the right university to complete admission support - ensuring a smooth journey to study MBBS abroad."}
      </>,
    ],
    whyPoints: [
      "NMC & WHO recognised medical universities",
      "Low tuition fees compared to private Indian colleges",
      "No donation or capitation fees",
      "English-medium programs with Russian language support",
      "Excellent hostel and Indian food facilities",
    ],
    whyHeading: "Why Russia is a Top Destination for MBBS Abroad?",
    whyExams: ["FMGE (India)", "USMLE (USA)", "PLAB (UK)", "MCI Screening Test"],
    whyAdditionalLabel: "Additionally, Russia provides:",
    whyBenefits: [
      "Low tuition fees compared to Western countries,",
      "No donation or entrance exams (only NEET required)",
      "Safe environment & Indian student communities.",
    ],
    whyOutro: (
      <>
        {
          "With globally accredited degrees, affordable education, and strong career prospects, Russia remains one of the best destinations for "
        }
        <Link href="/countries/mbbs-in-russia">
          {"MBBS abroad"}
        </Link>
        {". Students gain international exposure, advanced medical training, and a pathway to practice medicine in India or overseas."}
      </>
    ),
    eligibility: [
      "Minimum 50% in PCB (40% for reserved categories) in Class 12",
      "Qualified NEET-UG as per NMC guidelines",
      "Minimum 17 years of age as on 31st December of admission year",
    ],
    eligibilityHeading: "MBBS in Russia Eligibility for Indian Students",
    eligibilityCards: [
      {
        number: "1.",
        title: " Educational Qualification",
        description: (
          <>
            {": Candidates must have completed "}
            <strong>{"10+2 (Higher Secondary)"}</strong>
            {" with "}
            <strong>{"Physics, Chemistry, and Biology (PCB)"}</strong>
            {" as mandatory subjects."}
          </>
        ),
      },
      {
        number: "2.",
        title: " Minimum Marks",
        description:
          ": A minimum aggregate of 50% in PCB is required for general category students, while reserved category students (SC/ST/OBC) need at least 40%.",
      },
      {
        number: "3.",
        title: " Age Requirement",
        description:
          ": The student must be at least 17 years old by December 31st of the admission year.",
      },
      {
        number: "4.",
        title: " NEET Qualification",
        description:
          ": Indian students must qualify for the NEET (National Eligibility cum Entrance Test) to be eligible to Study MBBS in Russia.",
      },
      {
        number: "5.",
        title: " No Entrance Exam",
        description:
          ": Most Russian universities do not require additional entrance exams, making the admission process straightforward.",
      },
    ],
    /* SSMUDurations — stage colours are assigned by the component */
    durations: {
      university: "Samara State Medical University",
      totalYears: 6,
      stages: [
        {
          badge: "5 YEARS",
          title: "Academic study",
          description: "Theoretical + practical medical training",
          years: 5,
        },
        {
          badge: "1 YEAR",
          title: "Compulsory internship",
          description: "Clinical practice",
          years: 1,
        },
      ],
    },
    /* StepsSSMU */
    documents: {
      heading: "Documents Required For Samara State Medical University",
      intro: [
        "All Indian medical aspirants must ensure that they properly gather and organise the required documentation to avoid any unnecessary delays in the review process.",
        "The following documents are required to be submitted by Indian students for the MBBS program at Samara State Medical University:",
      ],
      items: [
        { label: "10th certificate and Mark Sheet" },
        { label: "Scan copy of 12th certificate and Mark Sheet" },
        { label: "Passport-size photos" },
        { label: "NEET Result / Admit Card", tone: "red" },
        { label: "Official invitation letter of the Medical University of Russia" },
        { label: "Issue of all documents by the Ministry of Foreign Affairs, New Delhi" },
        { label: "Medical report with HIV test result required at the time of Visa stamping" },
        { label: "Legalization of all documents of the Embassy of Russia." },
        { label: "Valid visa." },
        { label: "Valid Passport." },
        { label: "Bank receipt for enrollment in the first year (required for some universities).", wide: true },
      ],
    },
    /* stepSection (admission process). Design reuses the documents heading. */
    admissionHeading: "Documents Required For Samara State Medical University",
    admissionSteps: [
      {
        number: "01",
        title: " Research & Apply",
        description:
          "Choose WHO/NMC-recognised universities, check eligibility (50% in PCB), gather your documents and apply online to receive the admission letter.",
      },
      {
        number: "02",
        title: " Visa & Travel",
        description:
          "Apply for a student visa with the admission letter, pay the tuition fees, book your flights and complete university registration on arrival.",
      },
      {
        number: "03",
        title: " Start MBBS Program",
        description:
          "Begin the 6-year course (including internship), learn basic Russian (optional) and participate in clinical practice for hands-on experience.",
      },
      {
        number: "04",
        title: " Post-Admission Support",
        description:
          "Prepare for licensing exams (FMGE/USMLE), stay updated on deadlines and maintain academic performance for a successful medical career.",
      },
    ],
    /* AboutRussia — fact icons are paired by index in the component */
    about: {
      heading: "About Russia",
      subtitle:
        "Discover the rich culture, history, and opportunities that await you in Russia.",
      paragraphs: [
        <>
          <strong>Russia</strong>
          {", the world's largest country, spans Eastern Europe & Northern Asia, offering a unique blend of rich cultural heritage and modern educational excellence. After gaining independence from the Soviet Union (USSR) in 1991, Russia now features diverse landscapes, from the frozen tundra of Siberia to the Volga, Europe's longest river. Today, it stands out as a top destination for medical education, particularly attracting international students with its affordable and high-quality MBBS programs."}
        </>,
        "Russian medical universities have gained global recognition, with degrees accredited by major medical bodies such as the WHO, NMC, and FAIMER. This accreditation ensures that graduates can practice medicine worldwide. What makes studying in Russia especially appealing is its combination of state-of-the-art medical facilities, English-taught programs, and tuition fees significantly lower than those of Western countries.",
        "For aspiring doctors seeking a world-class education at reasonable costs, Russia is an ideal choice that combines academic rigor with an enriching cultural experience in one of the most fascinating nations on earth. The Russian medical education system not only offers strong theoretical foundations but also emphasizes practical training, effectively preparing students to excel in the global healthcare sector. Its perfect balance of quality education, cultural diversity, and career prospects, Russia continues to be a preferred destination for medical studies internationally.",
      ],
      facts: [
        { id: 1, label: "Population", value: "14.38 crores" },
        { id: 2, label: "Currency", value: "Russian Ruble" },
        { id: 3, label: "Capital and Largest City", value: "Moscow" },
        { id: 4, label: "Country Spanning", value: "Eastern Europe and North Asia" },
        { id: 5, label: "Travel Time from Delhi", value: "6 hours and 38 minutes" },
        { id: 6, label: "Time Difference", value: "+2.5 hours IST" },
        { id: 7, label: "Number of International Students", value: "351,500+ in 2022" },
        { id: 8, label: "Languages Spoken", value: "English, Russian, Tatar, Bashkir, and Ukrainian", wide: true },
      ],
    },
    languages: "English, Russian, Tatar, Bashkir, and Ukrainian",
    currency: "Russian Ruble",
    metaTitle: "MBBS in Russia For Indian Students 2026-27 | My Study Hub",
    metaDescription: "Enroll at Samara State Medical University with expert guidance, ensuring a smooth application process.",
  },
  kyrgyzstan: {
  name: "Kyrgyzstan",
  heroTitle: "MBBS in Kyrgyzstan for Indian Students 2026-27",
  heroSubtitle: "Enroll at top medical universities in Kyrgyzstan with expert guidance.",
  intro: "Kyrgyzstan offers affordable, NMC-listed medical universities with English-medium programs.",
  whyPoints: [
    "NMC & WHO recognised medical universities",
    "Affordable tuition fees",
    "English-medium programs",
  ],
  whyHeading: "Why Kyrgyzstan is a Top Destination for MBBS Abroad?",
    whyExams: ["FMGE (India)", "USMLE (USA)", "PLAB (UK)", "MCI Screening Test"],
    whyAdditionalLabel: "Additionally, Russia provides:",
    whyBenefits: [
      "Low tuition fees compared to Western countries,",
      "No donation or entrance exams (only NEET required)",
      "Safe environment & Indian student communities.",
    ],
    whyOutro: (
      <>
        {
          "With globally accredited degrees, affordable education, and strong career prospects, Russia remains one of the best destinations for "
        }
        <Link href="/countries/mbbs-in-russia">
          {"MBBS abroad"}
        </Link>
        {". Students gain international exposure, advanced medical training, and a pathway to practice medicine in India or overseas."}
      </>
    ),
    eligibility: [
      "Minimum 50% in PCB (40% for reserved categories) in Class 12",
      "Qualified NEET-UG as per NMC guidelines",
      "Minimum 17 years of age as on 31st December of admission year",
    ],
    eligibilityHeading: "MBBS in Kyrgyzstan Eligibility for Indian Students",
    eligibilityCards: [
      {
        number: "1.",
        title: " Educational Qualification",
        description: (
          <>
            {": Candidates must have completed "}
            <strong>{"10+2 (Higher Secondary)"}</strong>
            {" with "}
            <strong>{"Physics, Chemistry, and Biology (PCB)"}</strong>
            {" as mandatory subjects."}
          </>
        ),
      },
      {
        number: "2.",
        title: " Minimum Marks",
        description:
          ": A minimum aggregate of 50% in PCB is required for general category students, while reserved category students (SC/ST/OBC) need at least 40%.",
      },
      {
        number: "3.",
        title: " Age Requirement",
        description:
          ": The student must be at least 17 years old by December 31st of the admission year.",
      },
      {
        number: "4.",
        title: " NEET Qualification",
        description:
          ": Indian students must qualify for the NEET (National Eligibility cum Entrance Test) to be eligible to Study MBBS in Kyrgyzstan.",
      },
      {
        number: "5.",
        title: " No Entrance Exam",
        description:
          ": Most Russian universities do not require additional entrance exams, making the admission process straightforward.",
      },
    ],
    /* SSMUDurations — stage colours are assigned by the component */
    durations: {
      university: "Samara State Medical University",
      totalYears: 6,
      stages: [
        {
          badge: "5 YEARS",
          title: "Academic study",
          description: "Theoretical + practical medical training",
          years: 5,
        },
        {
          badge: "1 YEAR",
          title: "Compulsory internship",
          description: "Clinical practice",
          years: 1,
        },
      ],
    },
    /* StepsSSMU */
    documents: {
      heading: "Documents Required For Samara State Medical University",
      intro: [
        "All Indian medical aspirants must ensure that they properly gather and organise the required documentation to avoid any unnecessary delays in the review process.",
        "The following documents are required to be submitted by Indian students for the MBBS program at Samara State Medical University:",
      ],
      items: [
        { label: "10th certificate and Mark Sheet" },
        { label: "Scan copy of 12th certificate and Mark Sheet" },
        { label: "Passport-size photos" },
        { label: "NEET Result / Admit Card", tone: "red" },
        { label: "Official invitation letter of the Medical University of Kyrgyzstan" },
        { label: "Issue of all documents by the Ministry of Foreign Affairs, New Delhi" },
        { label: "Medical report with HIV test result required at the time of Visa stamping" },
        { label: "Legalization of all documents of the Embassy of Kyrgyzstan." },
        { label: "Valid visa." },
        { label: "Valid Passport." },
        { label: "Bank receipt for enrollment in the first year (required for some universities).", wide: true },
      ],
    },
    /* stepSection (admission process). Design reuses the documents heading. */
    admissionHeading: "Documents Required For Samara State Medical University",
    admissionSteps: [
      {
        number: "01",
        title: " Research & Apply",
        description:
          "Choose WHO/NMC-recognised universities, check eligibility (50% in PCB), gather your documents and apply online to receive the admission letter.",
      },
      {
        number: "02",
        title: " Visa & Travel",
        description:
          "Apply for a student visa with the admission letter, pay the tuition fees, book your flights and complete university registration on arrival.",
      },
      {
        number: "03",
        title: " Start MBBS Program",
        description:
          "Begin the 6-year course (including internship), learn basic Russian (optional) and participate in clinical practice for hands-on experience.",
      },
      {
        number: "04",
        title: " Post-Admission Support",
        description:
          "Prepare for licensing exams (FMGE/USMLE), stay updated on deadlines and maintain academic performance for a successful medical career.",
      },
    ],
    /* AboutRussia — fact icons are paired by index in the component */
    about: {
      heading: "About Kyrgyzstan",
      subtitle:
        "Discover the rich culture, history, and opportunities that await you in Kyrgyzstan.",
      paragraphs: [
        <>
          <strong>Kyrgyzstan</strong>
          {", the world's largest country, spans Eastern Europe & Northern Asia, offering a unique blend of rich cultural heritage and modern educational excellence. After gaining independence from the Soviet Union (USSR) in 1991, Kyrgyzstan now features diverse landscapes, from the frozen tundra of Siberia to the Volga, Europe's longest river. Today, it stands out as a top destination for medical education, particularly attracting international students with its affordable and high-quality MBBS programs."}
        </>,
        "Kyrgyzstan's medical universities have gained global recognition, with degrees accredited by major medical bodies such as the WHO, NMC, and FAIMER. This accreditation ensures that graduates can practice medicine worldwide. What makes studying in Kyrgyzstan especially appealing is its combination of state-of-the-art medical facilities, English-taught programs, and tuition fees significantly lower than those of Western countries.",
        "For aspiring doctors seeking a world-class education at reasonable costs, Kyrgyzstan is an ideal choice that combines academic rigor with an enriching cultural experience in one of the most fascinating nations on earth. The Kyrgyzstan medical education system not only offers strong theoretical foundations but also emphasizes practical training, effectively preparing students to excel in the global healthcare sector. Its perfect balance of quality education, cultural diversity, and career prospects, Kyrgyzstan continues to be a preferred destination for medical studies internationally.",
      ],
      facts: [
        { id: 1, label: "Population", value: "14.38 crores" },
        { id: 2, label: "Currency", value: "Kyrgyzstan Ruble" },
        { id: 3, label: "Capital and Largest City", value: "Bishkek" },
        { id: 4, label: "Country Spanning", value: "Eastern Europe and North Asia" },
        { id: 5, label: "Travel Time from Delhi", value: "6 hours and 38 minutes" },
        { id: 6, label: "Time Difference", value: "+2.5 hours IST" },
        { id: 7, label: "Number of International Students", value: "351,500+ in 2022" },
        { id: 8, label: "Languages Spoken", value: "English, Kyrgyzstan, Tatar, Bashkir, and Ukrainian", wide: true },
      ],
    },
    languages: "English, Kyrgyzstan, Tatar, Bashkir, and Ukrainian",
    currency: "Kyrgyzstan Ruble",
    metaTitle: "MBBS in Kyrgyzstan For Indian Students 2026-27 | My Study Hub",
    metaDescription: "Enroll at Samara State Medical University with expert guidance, ensuring a smooth application process.",
},

};
export const DEFAULT_CONTENT:RussiaBannerProps = {
  sectionLabel: "MBBS in Russia hero banner",
  title: "MBBS in Russia For Indian Students 2026 - 27",
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


export const DEFAULT_UNIVERSITY_CONTENT: UniversityContent = {
  name: "This University",
  country: "Russia",
  heroTitle: "Study MBBS at This University",
  heroSubtitle: "Enroll with expert guidance, ensuring a smooth application process.",
  rating: "4.0",
  languages: "English, Russian",
  currency: "Russian Ruble",
  established: "—",
  tuitionFee: "On Request",
  duration: "6 Years (5 + 1 Internship)",
  medium: "English",
  recognition: "NMC, WHO",
  metaTitle: "Study MBBS Abroad | My Study Hub",
  metaDescription: "Study MBBS at a top medical university with My Study Hub.",
};

export const UNIVERSITY_CONTENT: Record<string, UniversityContent> = {
  "samara-state-medical-university": {
    name: "Samara State Medical University",
    country: "Russia",
    heroTitle: "Samara State Medical University",
    heroSubtitle: "Enroll at Samara State Medical University with the expert guidance, ensuring a smooth application process.",
    rating: "4.0",
    languages: "English, Russian, Tatar, Bashkir, and Ukrainian",
    currency: "Russian Ruble",
    established: "1919",
    tuitionFee: "USD 4,500 / year",
    duration: "6 Years (5 + 1 Internship)",
    medium: "English",
    recognition: "NMC, WHO, ECFMG",
    metaTitle: "Samara State Medical University 2026-27 | My Study Hub",
    metaDescription: "Enroll at Samara State Medical University with expert guidance, ensuring a smooth application process.",
  },
  // ...the other 13 universities (kazan-federal-university, bashkir-, kursk-,
  // crimea-, altai-, orenburg-, northern-, volgograd-, rostov-, ural-,
  // perm-, tver-, ivanovo-state-medical-university) are in the zip's constants.ts
};
/** Country slug ("russia") -> content, falling back to defaults. */
export function getCountryContent(slug: string): CountryContent {
  return COUNTRY_CONTENT[slug] ?? { ...DEFAULT_COUNTRY_CONTENT };
}

/** University slug -> content, falling back to defaults. */
export function getUniversityContent(slug: string): UniversityContent {
  return UNIVERSITY_CONTENT[slug] ?? { ...DEFAULT_UNIVERSITY_CONTENT };
}
export const DUMMY_BROCHURES = [
    {
        id: "1",
        title: "My Study Hub Pvt Ltd",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/7741d685-c566-48a6-974b-96bc94c58331",
        fileUrl: "#",
        fileName: "MSH-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "2",
        title: "Samara State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/22caa2a1-75bd-431b-adc8-7d8290423837",
        fileUrl: "#",
        fileName: "Samara-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "3",
        title: "Northern State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/0a5cdfa9-b061-4591-967d-b598efcd1f5a",
        fileUrl: "#",
        fileName: "NSMU-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "4",
        title: "Kazan Federal University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/7741d685-c566-48a6-974b-96bc94c58331",
        fileUrl: "#",
        fileName: "Kazan-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "5",
        title: "Bashkir State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/22caa2a1-75bd-431b-adc8-7d8290423837",
        fileUrl: "#",
        fileName: "BSMU-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "6",
        title: "Kursk State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/0a5cdfa9-b061-4591-967d-b598efcd1f5a",
        fileUrl: "#",
        fileName: "Kursk-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "7",
        title: "Orenburg State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/7741d685-c566-48a6-974b-96bc94c58331",
        fileUrl: "#",
        fileName: "Orenburg-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "8",
        title: "Volgograd State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/22caa2a1-75bd-431b-adc8-7d8290423837",
        fileUrl: "#",
        fileName: "Volgograd-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "9",
        title: "Crimea Federal University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/0a5cdfa9-b061-4591-967d-b598efcd1f5a",
        fileUrl: "#",
        fileName: "Crimea-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "10",
        title: "Rostov State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/7741d685-c566-48a6-974b-96bc94c58331",
        fileUrl: "#",
        fileName: "Rostov-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "11",
        title: "Altai State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/22caa2a1-75bd-431b-adc8-7d8290423837",
        fileUrl: "#",
        fileName: "Altai-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "12",
        title: "Ural State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/0a5cdfa9-b061-4591-967d-b598efcd1f5a",
        fileUrl: "#",
        fileName: "Ural-Brochure-2025.pdf",
        year: "2025",
    },
    {
        id: "13",
        title: "Perm State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/7741d685-c566-48a6-974b-96bc94c58331",
        fileUrl: "#",
        fileName: "Perm-Brochure-2024.pdf",
        year: "2024",
    },
    {
        id: "14",
        title: "Tver State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/22caa2a1-75bd-431b-adc8-7d8290423837",
        fileUrl: "#",
        fileName: "Tver-Brochure-2024.pdf",
        year: "2024",
    },
    {
        id: "15",
        title: "Ivanovo State Medical University",
        description: "Your gateway to top-tier study abroad. Comprehensive guide to programs, facilities, and admission.",
        coverImage: "https://www.figma.com/api/mcp/asset/0a5cdfa9-b061-4591-967d-b598efcd1f5a",
        fileUrl: "#",
        fileName: "Ivanovo-Brochure-2024.pdf",
        year: "2024",
    },
];