"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

// ── FAQ data ──────────────────────────────────────────────────────────────
const faqs = [
  {
    question: "How do I apply for admission?",
    answer:
      "Fill out the online application form on our website, upload your academic documents, and submit. Our admissions team reviews every application within 5–7 working days and gets back to you over email.",
  },
  {
    question: "What scholarships and financial aid options are available?",
    answer:
      "We offer merit-based scholarships (up to 50% tuition waiver), need-based financial aid, and sports/extracurricular quotas. You can apply for scholarships directly in the admission form — no separate application needed.",
  },
  {
    question: "Do you assist international students with visas?",
    answer:
      "Yes. Our dedicated Visa Coordination office helps with offer letters, documentation, visa interviews, and pre-departure briefings. 95% of our international applicants receive their visa on the first attempt.",
  },
  {
    question: "Can I visit the campus before applying?",
    answer:
      "Absolutely! We run guided campus tours every weekday at 11 AM and 3 PM. You can also book a virtual tour if you're applying from abroad. Just reach out to our events team to schedule your visit.",
  },
  {
    question: "What programs and courses do you offer?",
    answer:
      "We offer 40+ undergraduate, postgraduate, and doctoral programs across Medicine, Engineering, Business, Law, and Arts. Check the Programs page for the full list of degrees, durations, and eligibility criteria.",
  },
];

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  visible: boolean;
  index: number;
}

// ── Single FAQ item ───────────────────────────────────────────────────────
function FaqItem({ question, answer, isOpen, onToggle, visible, index }: FaqItemProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white/20 shadow-sm border-b border-b-gray-500 transition-all
         duration-700 ease-out
        ${isOpen ? "shadow-md ring-[#D8B26E]/30" : "hover:shadow-md"}
        ${visible ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"}`}
      style={{ transitionDelay: `${0.05 + index * 0.08}s` }}
    >
      {/* Question row */}
<Button type="button" variant="unstyled" size="bare" shape="none" onClick={onToggle}
  className="flex w-full items-start justify-between gap-4 px-[clamp(16px,2vw,28px)] py-[clamp(14px,1.6vw,22px)] text-left">
        <span
          className={`font-semibold font-['Inter',sans-serif] text-[clamp(14px,1.25vw,20px)] leading-[1.35] transition-colors duration-300
            ${isOpen ? "text-brand-green" : "text-ink"}`}
        >
          {question}
        </span>

        {/* Plus icon — open pe rotate hoke X ban jata hai */}
        <span
          className={`flex h-[clamp(28px,2.4vw,38px)] w-[clamp(28px,2.4vw,38px)] shrink-0 items-center justify-center rounded-full transition-all duration-300
            ${isOpen
              ? "rotate-45 bg-linear-to-br from-brand-green to-brand-blue text-white"
              : "bg-[#EFE9DE] text-[#D8B26E]"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            className="h-[45%] w-[45%]"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </Button>

      {/* Answer — smooth expand/collapse */}
      <div
        className={`grid transition-all duration-500 ease-out
          ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <p className="m-0 px-[clamp(16px,2vw,28px)] pb-[clamp(14px,1.6vw,22px)] font-light text-body font-['Inter',sans-serif] text-[clamp(12px,1vw,16px)] leading-[1.7]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export default function FaqSection({slim=true}: {slim?: boolean}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F7F4EE]">
      <div className={`mx-auto flex max-w-225 flex-col items-center gap-[clamp(6px,0.42vw,8px)]
         ${slim?  "px-[clamp(20px,4.17vw,80px)]":""} pt-[clamp(32px,3.33vw,64px)] pb-[clamp(32px,3.33vw,64px)]`}>
        {/* Eyebrow */}
        <p
          className={`m-0 text-center font-normal uppercase tracking-widest text-[#D8B26E] font-['Inter',sans-serif] text-[clamp(11px,1.04vw,20px)] leading-8 transition-all duration-700
            ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "0.05s" }}
        >
          FAQs
        </p>

        {/* linear title */}
        <h2
          className={`m-0 text-center font-serif font-bold leading-[1.15] text-[clamp(28px,3.13vw,60px)] bg-linear-to-br from-brand-green to-brand-blue bg-clip-text text-transparent transition-all duration-700
            ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
          style={{ transitionDelay: "0.12s" }}
        >
          Got Questions? <br/> We Got Answers
        </h2>

        {/* FAQ list */}
        <div className="mt-[clamp(16px,2vw,36px)] flex w-full flex-col gap-[clamp(10px,1vw,16px)]">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              visible={visible}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}