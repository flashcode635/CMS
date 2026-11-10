// ── Blog registry ─────────────────────────────────────────────────────────────
// Single source of truth for every blog post:
//   • `components/blogs/BlogsGrid.tsx`     → listing page cards (featured + grid)
//   • `app/(site)/collections/blog/[slug]` → article page metadata per slug
//   • `components/blog-details/RelatedBlogs.tsx` → "You May Also Like" sidebar
// Plain data only — importing from a server page and a "use client" component
// is both fine; keep it that way (no hooks, no browser APIs here).
//
// New post = add one object here; the listing, its detail page and the related
// sidebar all pick it up automatically.
import featuredImage from "@/public/blog/center.jpg";

export interface BlogPost {
  /** URL segment → `/collections/blog/{slug}` (unique, kebab-case). */
  slug: string;
  title: string;
  /** Short dek used as the meta description on the article page. */
  subtitle: string;
  category: string;
  author: string;
  authorImg: string;
  date: string;
  readTime: number;
  views: number;
  coverImg: string;
  /** Featured post renders as the big hero card on the listing page. */
  featured?: boolean;
}

// Featured card image (public/blog/center.jpg)
const imgFeatured = featuredImage.src;

// Author avatars
const imgAuthorAnya = imgFeatured;
const imgAuthorKenji = imgFeatured;
const imgAuthorIngrid = imgFeatured;
const imgAuthorOmar = imgFeatured;
const imgAuthorSofia = imgFeatured;
const imgAuthorRaj = imgFeatured;
const imgAuthorAisha = imgFeatured;
const imgAuthorLuca = imgFeatured;
const imgAuthorSakura = imgFeatured;

// Card cover images
const imgCover1 = imgFeatured;
const imgCover2 = imgFeatured;
const imgCover3 = imgFeatured;
const imgCover4 = imgFeatured;
const imgCover5 = imgFeatured;
const imgCover6 = imgFeatured;
const imgCover7 = imgFeatured;
const imgCover8 = imgFeatured;
const imgCover9 = imgFeatured;
const imgCover10 = imgFeatured;
const imgCover11 = imgFeatured;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-studying-abroad-can-catapult-your-career",
    title: "How Studying Abroad Can Catapult Your Career",
    subtitle:
      "How a semester overseas builds the skills, network and confidence employers actually look for.",
    category: "Global Education",
    author: "Anya Petrova",
    authorImg: imgAuthorAnya,
    date: "July 15, 2023",
    readTime: 3,
    views: 1600,
    coverImg: imgFeatured,
    featured: true,
  },
  {
    slug: "navigating-the-visa-process-step-by-step-guide",
    title: "Navigating the Visa Process: A Step-by-Step Guide",
    subtitle:
      "From paperwork to interviews — every step of a student visa application, demystified.",
    category: "Visa Guide",
    author: "Kenji Tanaka",
    authorImg: imgAuthorKenji,
    date: "June 1, 2023",
    readTime: 2,
    views: 1600,
    coverImg: imgCover1,
  },
  {
    slug: "making-the-most-of-your-experience-as-an-international-student",
    title: "Making the Most of Your Experience as an International Student",
    subtitle:
      "Practical ways to turn your years abroad into friendships, skills and stories worth telling.",
    category: "Student Life",
    author: "Ingrid Dubois",
    authorImg: imgAuthorIngrid,
    date: "May 22, 2023",
    readTime: 2,
    views: 1400,
    coverImg: imgCover2,
  },
  {
    slug: "unlocking-funding-a-guide-to-scholarships-and-grants",
    title: "Unlocking Funding: A Guide to Scholarships and Grants",
    subtitle:
      "Where to look for scholarships and grants, and how to raise your odds of winning one.",
    category: "Scholarships",
    author: "Omar Hassan",
    authorImg: imgAuthorOmar,
    date: "April 10, 2023",
    readTime: 2,
    views: 1200,
    coverImg: imgCover4,
  },
  {
    slug: "overcoming-culture-shock-tips-for-a-smooth-transition",
    title: "Overcoming Culture Shock: Tips for a Smooth Transition",
    subtitle:
      "What the four stages of culture shock feel like, and how to move through them faster.",
    category: "Culture Shock",
    author: "Lee Wei",
    authorImg: imgAuthorKenji,
    date: "March 5, 2023",
    readTime: 2,
    views: 1100,
    coverImg: imgCover3,
  },
  {
    slug: "mastering-a-new-language-strategies-for-success",
    title: "Mastering a New Language: Strategies for Success",
    subtitle:
      "Daily habits, immersion tricks and free resources to level up your language fast.",
    category: "Language Learning",
    author: "Sofia Ramirez",
    authorImg: imgAuthorSofia,
    date: "February 18, 2023",
    readTime: 2,
    views: 1000,
    coverImg: imgCover5,
  },
  {
    slug: "finding-the-right-accommodation-a-guide-to-student-housing",
    title: "Finding the Right Accommodation: A Guide to Student Housing",
    subtitle:
      "On-campus versus off-campus, costs to expect, and the pitfalls to avoid when booking.",
    category: "Accommodation",
    author: "Raj Patel",
    authorImg: imgAuthorRaj,
    date: "January 9, 2023",
    readTime: 2,
    views: 900,
    coverImg: imgCover6,
  },
  {
    slug: "global-career-paths-opportunities-after-studying-abroad",
    title: "Global Career Paths: Opportunities After Studying Abroad",
    subtitle:
      "Where an international degree can take you — from global firms to further study.",
    category: "Career Paths",
    author: "Chloe Dubois",
    authorImg: imgAuthorIngrid,
    date: "December 3, 2022",
    readTime: 2,
    views: 850,
    coverImg: imgCover7,
  },
  {
    slug: "effective-study-habits-maximizing-your-learning-potential",
    title: "Effective Study Habits: Maximizing Your Learning Potential",
    subtitle:
      "Evidence-backed study systems that help you learn more in less time.",
    category: "Study Tips",
    author: "Hans Schmidt",
    authorImg: imgAuthorOmar,
    date: "November 11, 2022",
    readTime: 2,
    views: 800,
    coverImg: imgCover8,
  },
  {
    slug: "building-your-network-connecting-with-professionals-worldwide",
    title: "Building Your Network: Connecting with Professionals Worldwide",
    subtitle:
      "Networking as a student: events, communities and cold emails that actually get replies.",
    category: "Networking",
    author: "Aisha Khan",
    authorImg: imgAuthorAisha,
    date: "October 27, 2022",
    readTime: 2,
    views: 750,
    coverImg: imgCover9,
  },
  {
    slug: "exploring-europe-a-students-guide-to-budget-travel",
    title: "Exploring Europe: A Student's Guide to Budget Travel",
    subtitle:
      "Rail passes, hostels and student discounts — see Europe without emptying your account.",
    category: "Travel Guide",
    author: "Luca Rossi",
    authorImg: imgAuthorLuca,
    date: "September 1, 2022",
    readTime: 2,
    views: 700,
    coverImg: imgCover10,
  },
  {
    slug: "prioritizing-mental-health-resources-for-international-students",
    title: "Prioritizing Mental Health: Resources for International Students",
    subtitle:
      "Where to find free or low-cost mental-health support while studying abroad.",
    category: "Mental Health",
    author: "Sakura Sato",
    authorImg: imgAuthorSakura,
    date: "August 20, 2022",
    readTime: 2,
    views: 650,
    coverImg: imgCover11,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export function blogPostHref(slug: string): string {
  return `/collections/blog/${slug}`;
}

// ── Listing-page shapes (consumed by components/blogs/BlogsGrid.tsx) ─────────
// BlogsGrid has its own BlogCardItem contract ({ id, …, href }); map once here
// so the component keeps its existing props signature.
export const DEFAULT_BLOG_CARDS = BLOG_POSTS.filter(p => !p.featured).map((post, i) => ({
  id: i + 1,
  category: post.category,
  title: post.title,
  author: post.author,
  authorImg: post.authorImg,
  date: post.date,
  coverImg: post.coverImg,
  href: blogPostHref(post.slug),
}));

export const DEFAULT_FEATURED_BLOG = (() => {
  const featured = BLOG_POSTS.find(p => p.featured)!;
  return {
    href: blogPostHref(featured.slug),
    category: featured.category,
    title: featured.title,
    author: featured.author,
    authorImg: featured.authorImg,
    date: featured.date,
    coverImg: featured.coverImg,
  };
})();

// ── Article-page shapes (consumed by collections/blog/[slug]/page.tsx) ────────
export const DEFAULT_TOC_ITEMS = [
  { id: "why-study-abroad", label: "Why Study Abroad?", level: 1 },
  { id: "top-destinations", label: "Top Destinations for International Students", level: 1 },
  { id: "application-process", label: "Application Process: A Step-by-Step Guide", level: 2 },
  { id: "visa-requirements", label: "Visa Requirements and Application Tips", level: 2 },
];

export const DEFAULT_DESIGNATION = "Senior Content Writer";
export const DEFAULT_AUTHOR_BIO =
  "Sed cras nec a nulla sapien adipiscing ut etiam. In sem viverra mollis metus quam adipiscing vel nascetur condimentum felis sapien. Pede consequat laoreet enim sit aliquet mollis semper.";
export const DEFAULT_TOTAL_SHARES = 10000;

/** Intro paragraph shown between the post title card and the table of contents. */
export const ARTICLE_INTRO =
  "Embark on a transformative journey with our comprehensive guide to studying abroad. Discover top destinations, application tips, and cultural insights for a fulfilling international education adventure.";

/** Tag pill set for the article sidebar: the post's category first, then the shared tags. */
export function tagsForPost(post: BlogPost): string[] {
  const tags = [
    post.category,
    "Global Connections",
    "Study Match",
    "Academic Passion",
    "Pursue Your Path",
    "Student Life",
    "Study Romance",
  ];
  // Dedupe: posts whose category (e.g. "Student Life") is also in the shared
  // list used to produce duplicate tag keys ("#Student Life" twice).
  return [...new Set(tags)].map(tag => `#${tag}`);
}

/** 4 related posts for the article sidebar: same category first, then whatever follows. */
export function relatedPosts(slug: string, count = 4): BlogPost[] {
  const post = getBlogPost(slug);
  const others = BLOG_POSTS.filter(p => p.slug !== slug);
  const sameCategory = post ? others.filter(p => p.category === post.category) : [];
  const rest = others.filter(p => !sameCategory.includes(p));
  return sameCategory.concat(rest).slice(0, count);
}
