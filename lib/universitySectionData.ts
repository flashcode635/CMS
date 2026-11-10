/**
 * ── University section data (single source) ─────────────────────────────────
 *
 * ALL copy rendered by the `components/universities/*` sections lives here —
 * the same pattern as the country content in `lib/constants.tsx`. The CMS
 * (live editor seeds, preview defaults) reads from these constants, and the
 * section components import them as their `DEFAULT_CONTENT`.
 *
 * Serializable by design (the CMS stores edits as JSON):
 *  - plain strings / numbers / arrays of plain objects — no ReactNode,
 *    no React elements, no `StaticImageData` imports.
 *  - Icons are kebab-case lucide NAMES (rendered via components/ui/iconRegistry).
 *  - Images are public URL strings ("/home/univ-campus.jpg") so both
 *    next/image and CMS text inputs can use the same value.
 */

/* ---------- Overview ---------- */
export const OVERVIEW_CONTENT = {
    sectionLabel: "University overview and introduction",
    titleGreen: "University Overview &",
    titleBlue: "Introduction",
    paragraphs: [
        "Located in the city of Samara, this university has become a preferred destination for international students, especially Indian students who are looking for MBBS in Russia. With modern infrastructure, experienced faculty, and globally recognized degrees, Samara State Medical University offers a strong foundation for a successful medical career.",
        "One of the key reasons behind its popularity is the balance it offers between quality and affordability. Students not only receive theoretical excellence but also gain practical exposure through clinical training in well-equipped hospitals.",
        "Established in 1919, the university has a long-standing academic excellence and is highly trusted for MBBS in Russia for Indian students, offering a stable and reputed medical education system.",
    ],
    ctaHref: "/contact-us",
    ctaLabel: "Read More About Us",
    imageSrc: "/countries/russia/chhattisgarh.webp",
    imageAlt: "University campus interior",
    badgeCount: "14+ Years",
    badgeText: "Academic Excellence & Heritage",
};

/* ---------- Accreditation ---------- */
export const ACCREDITATION_CONTENT = {
    anchorId: "accreditation",
    sectionLabel: "Recognition and accreditation",
    eyebrow: "Global Standards",
    heading: "Recognition & Accreditation",
    paragraphs: [
        "Samara State Medical University (SamSMU) holds strong international recognition due to its high academic standards and globally accepted medical education system.",
    ],
    quote:
        "With this dual accreditation system, graduates from SemSMU are eligible to practice in various countries, as the acceptance of their degree is significantly improved.",
    checklistLabel:
        "Practicing medicine in different countries (after required licensing exam):",
    checklist: [
        "Pursue postgraduate medical studies abroad",
        "Securing better international career opportunities",
    ],
    cards: [
        {
            title: "WFME Accredited",
            description:
                "Accredited by the World Federation of Medical Education (WFME), meeting international standards comparable to global medical schools.",
            icon: "badge-check",
            iconTone: "emerald" as const,
        },
        {
            title: "IAAR/NAAR Recognized",
            description:
                "Ensuring medical degrees are aligned with European education standards, improving degree acceptance worldwide.",
            icon: "building-2",
            iconTone: "champagne" as const,
        },
    ],
    highlightTitle: "Global Career Pathway (USA & Canada)",
    highlightText:
        "Accreditation also emphasizes the importance of qualifying your qualifications recognized in various countries. Furthermore, the WFME accreditation qualifies graduates to pursue the Educational Commission for Foreign Medical Graduates (ECFMG) certification, which is a prerequisite for medical careers in the USA and Canada. Graduates can also potentially apply for United States Medical Licensing Examination (USMLE), which is a crucial step for medical licensure in the USA.",
    highlightIcon: "graduation-cap",
};

/* ---------- FMGE Classes ---------- */
export const FMGE_CONTENT = {
    anchorId: "fmge-classes",
    sectionLabel: "FMGE Classes",
    title: "FMGE Classes at Samara State Medical University",
    intro: "FMGE Classes at Samara State Medical University help Indian students pursuing MBBS in Russia prepare effectively for the FMGE exam.",
    features: [
        { label: "FMGE focused syllabus", icon: "book-open" },
        { label: "Weekly & Monthly mock tests", icon: "calendar-check" },
        { label: "Revision & exam strategy", icon: "target" },
    ],
    quote: "Structured guidance for better FMGE results.",
    videoUrl: "",
    videoTitle: "FMGE Classes at Samara State Medical University",
    videoCaption: "FMGE Classes at Samara State Medical University",
    videoPoster: "/bg-doctor.jpg",
    pathwaysTitle: "Global Career Pathways",
    pathwaysParagraphs: [
        "Furthermore, the WFME accreditation qualifies graduates to pursue the Educational Commission for Foreign Medical Graduates (ECFMG) certification, which is a prerequisite for medical careers in the USA and Canada. Accreditation also emphasizes the importance of qualifying your qualifications recognized in various countries.",
        "Graduates can also potentially apply for United States Medical Licensing Examination USMLE, which is a crucial step for medical license in the USA.",
    ],
    standardsLabel: "International standards",
    standardsIcon: "globe",
};

/* ---------- Why Choose Us ---------- */
export const WHY_CHOOSE_US_CONTENT = {
    anchorId: "why-choose-us",
    sectionLabel: "Why choose this university",
    titleGreen: "Why Choose",
    titleBlue: "Samara State Medical University?",
    subtitle:
        "Choosing the right university is a crucial decision for every medical aspirant. Here are compelling reasons to study at SamSMU.",
    reasons: [
        {
            title: "Globally Recognized Degree",
            description:
                "Recognized by major medical bodies such as WHO and NMC, making its degree valid for practicing in India after qualifying licensing exams like FMGE/NExT.",
        },
        {
            title: "Affordable MBBS Fees",
            description:
                "Compared to private medical colleges in India, the fees are much more affordable, making it an excellent option for middle-class families.",
        },
        {
            title: "English Medium Curriculum",
            description:
                "The MBBS program is offered in English, which ensures that international students can easily understand and adapt to the course.",
        },
        {
            title: "Advanced Infrastructure",
            description:
                "Equipped with modern laboratories, digital classrooms, and simulation-based training facilities for hands-on experience.",
        },
        {
            title: "Indian Student-Friendly",
            description:
                "Significant number of Indian students, availability of Indian food, and cultural inclusivity adds to the comfort.",
        },
        {
            title: "Safe Living Environment",
            description:
                "Samara is considered a safe city for international students, with good public transport and a peaceful environment.",
        },
    ],
};

/* ---------- Advanced Training (sub-component of Why Choose Us) ---------- */
export const ADVANCED_TRAINING_CONTENT = {
    anchorId: "advanced-training",
    sectionLabel: "Advanced clinical training and labs",
    titleGreen: "Advanced Clinical",
    titleBlue: "Training & Labs",
    intro:
        "Strong focus on both theoretical knowledge and practical clinical training, helping students build deep medical understanding along with real-world skills. Our modern laboratories and research centers support hands-on learning and scientific research.",
    highlights: [
        "Modern simulation-based training",
        "Well-equipped medical research labs",
        "Extensive medical libraries",
    ],
    imageSrc: "/home/univ-campus.jpg",
    imageAlt: "University clinical training laboratory",
};

/* ---------- Eligibility ---------- */
export const ELIGIBILITY_CONTENT = {
    anchorId: "eligibility",
    sectionLabel: "Eligibility criteria",
    heading: "Eligibility Criteria",
    intro:
        "To secure admission in Samara State Medical University for MBBS, students must fulfill the following criteria:",
    criteria: [
        {
            title: "Education",
            description:
                "The applicant must have completed 10+2 education with Physics, Chemistry, and Biology.",
        },
        {
            title: "PCB marks",
            description:
                "A minimum of 50% marks in PCB subjects is required for general category students (40% for reserved categories).",
        },
        {
            title: "NEET",
            description:
                "The student must qualify for the NEET examination.",
        },
        {
            title: "Age",
            description:
                "The minimum age should be 17 years at the time of admission.",
        },
    ],
    footer:
        "These requirements are in line with the guidelines for Indian students planning to study MBBS abroad, ensuring eligibility for future medical licensing exams.",
};

/* ---------- MBBS Duration ---------- */
export const DURATION_CONTENT = {
    anchorId: "mbbs-duration",
    sectionLabel: "Duration of MBBS at Samara State Medical University",
    titleGreen: "Duration Of MBBS At",
    titleBlue: "Samara State Medical University",
    totalLabel: "Total Duration",
    totalDuration: "6",
    totalUnit: "Years",
    cardTitle: "Duration of MBBS at Samara State University, Russia",
    cardIntro:
        "The total duration of the MBBS course at Samara State Medical University is 6 years.",
    stages: [
        {
            duration: "5 YEARS",
            title: "Theoretical + practical medical training",
            description: "Academic study",
            label: "Academic study",
            color: "var(--color-brand-forest-deep)",
        },
        {
            duration: "1 YEAR",
            title: "Clinical practice",
            description: "Compulsory internship",
            label: "Compulsory internship",
            color: "var(--color-brand-champagne)",
        },
    ],
};

/* ---------- Admission Process ---------- */
export const ADMISSION_CONTENT = {
    sectionLabel: "University admission process",
    title: "Samara State Medical University Admission Process",
    subtitle:
        "The admission process is simple and transparent, here's a step-by-step guide.",
    steps: [
        {
            title: "Application Submission",
            description:
                "Students need to fill out the application form and submit the required documents, including academic certificates, passport copy, and NEET scorecard.",
            icon: "file-text",
        },
        {
            title: "Admission Letter",
            description:
                "Once the documents are verified, the university issues an official admission letter.",
            icon: "mail",
        },
        {
            title: "Invitation Letter",
            description:
                "After confirmation, students receive an official invitation from the university, which is required for the visa process.",
            icon: "mail-open",
        },
        {
            title: "Visa Application",
            description:
                "Students must apply for a Russian visa with the necessary documents.",
            icon: "badge-check",
        },
        {
            title: "Travel and Enrolment",
            description:
                "After receiving the visa, students travel to Russia and complete their enrolment at the university.",
            icon: "plane",
        },
    ],
    ctaLabel: "Start Your Admission Process",
    ctaHref: "#free-counselling",
    backgroundImageSrc: "/home/univ-campus.jpg",
    imageAlt: "",
};

/* ---------- Documents ---------- */
export const DOCUMENTS_CONTENT = {
    sectionLabel: "Documents required",
    titleGreen: "Documents Required For",
    titleBlue: "Samara State Medical University",
    paragraphs: [
        "All Indian medical aspirants must ensure that they properly gather and organise the required documentation to avoid any unnecessary delays in the review process.",
        "The following documents are required to be submitted by Indian students for the MBBS program at Samara State Medical University.",
    ],
    items: [
        { title: "10th certificate and Mark Sheet", icon: "file-text" },
        { title: "Scan copy of 12th certificate and Mark Sheet", icon: "copy" },
        { title: "Passport-size photos", icon: "camera" },
        { title: "NEET Result / Admit Card", icon: "file-badge", tone: "red" as const },
        {
            title: "Official invitation letter of the Medical University of Russia",
            icon: "mail",
        },
        {
            title: "Issue of all documents by the Ministry of Foreign Affairs, New Delhi",
            icon: "landmark",
        },
        {
            title: "Medical report with HIV test result required at the time of Visa stamping",
            icon: "heart-pulse",
        },
        { title: "Xerox copy of Passport (First & Last pages)", icon: "copy" },
    ],
    imageSrc: "/bg-doctor.jpg",
    imageAlt: "Doctor in a white coat putting on surgical gloves",
};

/* ---------- Benefits ---------- */
export const BENEFITS_CONTENT = {
    sectionLabel: "Benefits of studying at this university",
    eyebrow: "Why Samara State",
    titleGreen: "Benefits of Studying MBBS in",
    titleBlue: "Samara State Medical University, Russia",
    benefits: [
        {
            title: "Globally Recognized Degree",
            description:
                "Accredited by WHO, MCI/NMC, and UNESCO, allowing graduates to practice medicine globally after clearing the screening tests.",
        },
        {
            title: "Advanced Research Facilities",
            description:
                "Home to some of Russia's most specialized medical research centers, including their own specialized university hospitals.",
        },
        {
            title: "English Medium Education",
            description:
                "A dedicated faculty for international students providing 100% English-medium instruction for the entire duration of the course.",
        },
        {
            title: "Affordable Tuition & Living",
            description:
                "High-quality education at a fraction of the cost compared to private medical colleges in India or the West.",
        },
    ],
    videoUrl: "",
    videoTitle: "FMGE Classes at Samara State Medical University",
    videoBadge: "My Study Hub",
    watchLabel: "Event highlight",
    videoPoster: "/home/univ-campus.jpg",
};

/* ---------- Fee Structure ---------- */
export const FEES_CONTENT = {
    sectionLabel: "University fee structure",
    titleGreen: "Samara State",
    titleBlue: "Medical University Fee 2026",
    cards: [
        {
            year: "1st Year",
            tag: "First Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "22,000 RUB" },
                { label: "Medical & Visa", value: "25,000 RUB" },
                { label: "Admin Charges", value: "1400 USD" },
            ],
            total: "5,07,000 RUB + 1400 USD",
            highlight: true,
        },
        {
            year: "2nd Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "3rd Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "4th Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "5th Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
        {
            year: "6th Year",
            rows: [
                { label: "Tuition Fee", value: "4,50,000 RUB" },
                { label: "Accommodation", value: "—" },
                { label: "Medical & Visa", value: "PCC Only" },
                { label: "Admin Charges", value: "N/A" },
            ],
            total: "4,50,000 RUB",
        },
    ],
    approxLabel: "Approx. 6 years",
    approxTotal: "27,57,000 RUB + 1400 USD",
    messChargeNote: "Mess Charge = 1200$ for 1st Year only",
};

/* ---------- Faculty ---------- */
export const FACULTY_CONTENT = {
    sectionLabel: "University faculties",
    title: "Faculty of Samara State Medical University, Russia",
    intro:
        "The Faculty of Samara State Medical University offers comprehensive MBBS programs with experienced faculty dedicated to student success.",
    items: [
        { label: "General Medicine" },
        { label: "Institute of Pediatrics" },
        { label: "Institute of Pharmacy" },
        { label: "Institute of Dentistry" },
        { label: "The adapted physical education center" },
        { label: "The faculty of Sports Medicine" },
        { label: "Institute of Nursing Education" },
        { label: "Pre-university education" },
        { label: "The faculty of Clinical Psychology" },
        { label: "Faculty for foreign students" },
    ],
};

/* ---------- Hostel & Facilities ---------- */
export const HOSTEL_CONTENT = {
    sectionLabel: "Hostel and mess facilities",
    eyebrow: "Campus Life",
    title: "Hostel & Mess Facilities",
    intro:
        "Accommodation is one of the major concerns for students going abroad. Samara State Medical University ensures that students feel at home by providing comfortable and secure hostel facilities.",
    featuresHeading: "Hostel Features",
    features: [
        {
            title: "Fully Furnished Rooms",
            description:
                "Equipped with essential furniture including study desks, wardrobes, and comfortable bedding.",
            imageSrc: "/home/about-graduation.png",
            imageAlt: "Fully furnished hostel room",
        },
        {
            title: "Separate Accommodation",
            description:
                "Dedicated and secure wings for boys and girls to ensure privacy and comfort.",
            imageSrc: "/home/blog-graduation.jpg",
            imageAlt: "Separate hostel accommodation corridor",
        },
        {
            title: "24/7 Security & CCTV",
            description:
                "Round-the-clock surveillance and on-site security personnel for a safe living environment.",
            imageSrc: "/home/univ-campus.jpg",
            imageAlt: "Security desk with CCTV monitors",
        },
        {
            title: "Central Heating System",
            description:
                "Advanced heating infrastructure providing consistent warmth during Samara's cold winters.",
            imageSrc: "/home/hero-bg.jpg",
            imageAlt: "Warm hostel room during winter",
        },
        {
            title: "Wi-Fi & Study Areas",
            description:
                "High-speed internet access and quiet zones designed for academic focus and research.",
            imageSrc: "/home/mbbs-abroad-russia.jpg",
            imageAlt: "Wi-Fi enabled shared study area",
        },
    ],
    messEyebrow: "Dining Services",
    messTitle: "Indian Mess Facilities",
    messIntro:
        "One of the biggest advantages for Indian students is the availability of Indian food. The university or nearby facilities offer Indian mess services where students can get familiar meals, reducing the struggle of adapting to a new cuisine.",
    messPoints: [
        "Authentic Indian Spices & Recipes",
        "Hygienic and Nutritious Meal Plans",
    ],
    messImageSrc: "/home/mbbs-abroad-kazakhstan.jpg",
    messImageAlt: "Indian mess serving a variety of dishes",
    closingNote:
        "This combination of safe housing and food availability makes life easier for first-year students who are new to a foreign country.",
};

/* ---------- Events ---------- */
export const EVENTS_CONTENT = {
    sectionLabel: "University event highlights",
    titleMain: "Rythm 3.0 2026 – Relive the",
    titleAccent: "Most Electrifying Freshers' Night",
    paragraphs: [
        "Rythm 3.0 – 2025 Freshers' Party, hosted by My Study Hub & others, turned into an electrifying celebration of new beginnings with an incredible crowd of 500+ Indian students. The evening was filled with energy, enthusiasm, and unforgettable moments, creating a grand welcome for the newest batch.",
        "The night sparkled with DJ beats, dance, engaging games, and spectacular stage performances. Special gratitude goes to our dedicated senior volunteers and team members who set up a perfect platform for freshers to interact, bond, and step into their academic journey with confidence, fun, and unity.",
        "Rythm 3.0 – 2026 not only brought smiles and memories but also built friendships that will last throughout the upcoming medical years. A night that truly marked the start of an exciting chapter!",
    ],
    eventImageSrc: "/home/partyone.webp",
    imageAlt: "Students celebrating at the freshers party",
};

/* ---------- Student Testimonials ---------- */
export const TESTIMONIALS_CONTENT = {
    sectionLabel: "Student testimonials",
    heading: "What Our Students Say",
    subtitle:
        "Hear from our happy students! See how we've helped them achieve their goals and create lasting impact.",
    cards: [
        {
            name: "Dr. Nadia Owen",
            role: "Legal Counsel",
            quote:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/home/team-nadia.jpg",
        },
        {
            name: "Mr. Thomas Reed",
            role: "Software Engineer",
            quote:
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "/home/team-ethan.jpg",
        },
        {
            name: "Ms. Clara Bennett",
            role: "Product Manager",
            quote:
                "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
            image: "/home/team-chloe.jpg",
        },
        {
            name: "Dr. Emily Carter",
            role: "Data Scientist",
            quote:
                "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            image: "/home/team-sam.jpg",
        },
    ],
};
