// Global Data Models for StudyPalace Hub Frontend

import { ReactNode } from "react";

export interface UserProfile {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role: 'ADMIN' | 'USER' | 'GUEST';
  avatarUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  isHot?: boolean;
}

export interface NavCategory {
  title: string;
  items: NavItem[];
}

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
  articlesCount?: number;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  author: BlogAuthor | string;
  date: string;
  readTime: string;
  image: string;
  tags?: string[];
  featured?: boolean;
}

export interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  image: string;
  bio?: string;
  linkedin?: string;
}

export interface University {
  id: string | number;
  name: string;
  country: string;
  location?: string;
  established?: number | string;
  ranking?: string;
  tuitionFee?: string;
  medium?: string;
  logo?: string;
  image?: string;
  highlights?: string[];
}

export interface EventItem {
  id: string | number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  image: string;
  category?: string;
  registrationLink?: string;
  status?: 'upcoming' | 'past' | 'ongoing';
}

export interface Testimonial {
  id: string | number;
  name: string;
  university: string;
  country?: string;
  year?: string;
  quote: string;
  image: string;
  rating?: number;
  videoUrl?: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  neetscore?: string;
  countryPreference?: string;
  message?: string;
}

export interface JobOpening {
  id: string | number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
}

export interface BrochureItem {
  id: string | number;
  title: string;
  country: string;
  thumbnail: string;
  downloadUrl?: string;
  fileSize?: string;
}

export interface CountryInfo {
  name: string;
  slug: string;
  flag: string;
  heroImage: string;
  capital: string;
  currency: string;
  language: string;
  duration: string;
  averageFee: string;
  recognition: string[];
  whyChoose: string[];
}

/** Numbered info card (EligibilitySection / admission process steps). */
export interface InfoCardItem {
  number: string;
  title: string;
  /** May be JSX (bold highlights) or a plain string. */
  description: ReactNode;
}

/** One study stage of the MBBS duration breakdown. */
export interface DurationStageItem {
  badge: string;
  title: string;
  description: string;
  years: number;
}

/** One "Documents Required" card. Icons stay in the section component. */
export interface DocumentItem {
  label: string;
  /** Red accent (NEET row in the design). */
  tone?: "red";
  /** Final card spans both grid columns. */
  wide?: boolean;
}

/** One "About country" fact card. Icons stay in the section component. */
export interface FactItem {
  id: number;
  label: string;
  value: string;
  /** Spans both grid columns (e.g. the languages card). */
  wide?: boolean;
}

export interface CountryContent {
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  whyPoints: ReactNode[];
  eligibility: string[];
  languages: string;
  currency: string;
  metaTitle: string;
  metaDescription: string;

  /* ---- section copy consolidated from the mbbs-russia components ---- */

  /** CountryIntro: gradient heading above the paragraphs. */
  introHeading?: string;
  /** CountryIntro: paragraphs 1/3/4 (JSX with inline highlights). Slot 2 is
   *  `intro` itself so the CMS "intro" field keeps editing the same text. */
  introParagraphs?: ReactNode[];
  /** WhyRussia: gradient heading. */
  whyHeading?: string;
  /** WhyRussia: exam checklist rows (FMGE / USMLE / ...). */
  whyExams?: string[];
  /** WhyRussia: "Additionally, X provides:" label above the benefit cards. */
  whyAdditionalLabel?: string;
  /** WhyRussia: the 3 benefit-card texts. */
  whyBenefits?: string[];
  /** WhyRussia: closing paragraph (may contain a styled <Link>). */
  whyOutro?: ReactNode;
  /** EligibilitySection: gradient heading. */
  eligibilityHeading?: string;
  /** EligibilitySection: the numbered info cards. */
  eligibilityCards?: InfoCardItem[];
  /** SSMUDurations: total course length + per-stage breakdown.
   *  Stage colours are assigned by the component (brand palette). */
  durations?: {
    university: string;
    totalYears: number;
    stages: DurationStageItem[];
  };
  /** StepsSSMU: "Documents Required" heading + intro + cards. Icons stay
   *  in the component (paired by index). */
  documents?: {
    heading: string;
    intro: string[];
    items: DocumentItem[];
  };
  /** stepSection (admission process): heading + numbered step cards. */
  admissionHeading?: string;
  admissionSteps?: InfoCardItem[];
  /** AboutRussia: banner copy + paragraphs + fact cards. Icons stay in the
   *  component (paired by index). */
  about?: {
    heading: string;
    subtitle: string;
    /** Paragraphs are JSX so the first one can highlight the country name. */
    paragraphs: ReactNode[];
    facts: FactItem[];
  };
}
export interface UniversityContent {
  name: string;
  country: string;
  heroTitle: string;
  heroSubtitle: string;
  rating: string;
  languages: string;
  currency: string;
  established: string;
  tuitionFee: string;
  duration: string;
  medium: string;
  recognition: string;
  metaTitle: string;
  metaDescription: string;
}
