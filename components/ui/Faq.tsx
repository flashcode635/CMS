"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What are the basic eligibility criteria for studying MBBS abroad?",
    answer: "Students generally need at least 50% marks in Physics, Chemistry, and Biology in 10+2 (40% for reserved categories) and a qualified NEET score.",
  },
  {
    question: "Is NEET required for MBBS abroad?",
    answer: "Yes, qualifying NEET is mandatory for Indian students planning to study MBBS abroad if they wish to practice in India after graduation.",
  },
  {
    question: "Are medical degrees from foreign universities recognized in India?",
    answer: "Yes, provided the university is recognized by WHO and approved by the National Medical Commission (NMC).",
  },
  {
    question: "What are the basic eligibility criteria for studying MBBS abroad?",
    answer: "Students generally need at least 50% marks in Physics, Chemistry, and Biology in 10+2 (40% for reserved categories) and a qualified NEET score.",
  },
  {
    question: "Is NEET required for MBBS abroad?",
    answer: "Yes, qualifying NEET is mandatory for Indian students planning to study MBBS abroad if they wish to practice in India after graduation.",
  },
  {
    question: "Are medical degrees from foreign universities recognized in India?",
    answer: "Yes, provided the university is recognized by WHO and approved by the National Medical Commission (NMC).",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-ink mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQ_ITEMS.map((item, idx) => (
          <div key={idx} className="border border-line rounded-lg overflow-hidden bg-white shadow-sm">
<Button onClick={() => toggle(idx)} variant="unstyled" size="bare" shape="none"
  className="w-full justify-between whitespace-normal p-4 text-left font-semibold text-ink hover:bg-surface">
              <span>{item.question}</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`} />
            </Button>
            {openIndex === idx && (
              <div className="p-4 pt-0 text-body text-sm border-t border-line mt-2">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
