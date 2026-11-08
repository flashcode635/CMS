"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import img from "@/public/blog/lake.jpg";
// Use <NewsletterCTA content={{ heading: "Your heading" }} /> to override this instance.
// Edit DEFAULT_CONTENT_NewsletterCTA to change shared defaults for instances without overrides.
const DEFAULT_CONTENT_NewsletterCTA = {
  heading: "Unlock Global Opportunities",
  subtext: "Stay informed about studying abroad, visas, and scholarships.",
  backgroundImageUrl:
    img.src,
  successMessage: "Thanks for subscribing! We'll be in touch soon.",
  emailLabel: "Your email address",
  emailPlaceholder: "Your Email",
  consentLabel: "I agree to the privacy policy",
  consentText:
    "I agree to the privacy policy regarding data storage for this form.",
  submitLabel: "Join Now", // NOTE: was "Subscribe" (label changed with the Join Now button swap below)
};

export interface NewsletterCTAProps {
  heading?: string;
  subtext?: string;
  content?: Partial<typeof DEFAULT_CONTENT_NewsletterCTA>;
}

export default function NewsletterCTA({
  heading,
  subtext,
  content: contentOverrides,
}: NewsletterCTAProps) {
  const content = {
    ...DEFAULT_CONTENT_NewsletterCTA,
    ...contentOverrides,
    heading: heading ?? contentOverrides?.heading ?? DEFAULT_CONTENT_NewsletterCTA.heading,
    subtext: subtext ?? contentOverrides?.subtext ?? DEFAULT_CONTENT_NewsletterCTA.subtext,
  };
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed || !email) return;
    // Replace with real submission logic
    setSubmitted(true);
  };

  return (
    <section
      className="relative w-full max-w-300 my-8 md:my-12 mx-auto md:p-10 p-3 sm:p-5 overflow-hidden rounded-2xl"
      aria-labelledby="newsletter-heading"
    >
      {/* Background image fills the CTA card as its height grows with content padding. */}
      <div className="absolute inset-0">
        <Image
          src={content.backgroundImageUrl}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
          unoptimized
          aria-hidden
        />
        <div className="absolute inset-0 bg-brand-forest-deep/60" />
      </div>

      <div className="relative z-10 flex flex-col gap-7 px-6 py-10 sm:px-7 sm:py-12">
        <div className="flex flex-col gap-3">
          <h2
            id="newsletter-heading"
            className="text-white font-normal text-[24px] sm:text-[26px] tracking-normal leading-tight"
            style={{ fontFamily: 'var(--font-sub)' }}
          >
            {content.heading}
          </h2>
          <p
            className="text-white text-[15px] sm:text-[16px] leading-relaxed"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {content.subtext}
          </p>
        </div>

        {submitted ? (
          <p
            className="text-brand-champagne-soft text-[16px] font-semibold"
            style={{ fontFamily: 'var(--font-body)' }}
            role="alert"
          >
            {content.successMessage}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
            <div className="flex flex-col gap-3">
              <label htmlFor="newsletter-email" className="sr-only">
                {content.emailLabel}
              </label>
              {/* ── NOTE: Old "Subscribe" button commented out below.
                  It was full-width and stacked BELOW the email input.
                  Replaced it with the "Join Now" button (the ACTIVE one), which now sits
                  INLINE on the right side of the email input, inside a shared white bar:
                    - label comes from DEFAULT_CONTENT_NewsletterCTA.submitLabel = "Join Now"
                    - styling: turns BLACK on hover/click (hover:bg-brand-forest-deep active:bg-brand-forest-deep)
                  Uncomment the commented block to restore the old Subscribe button. ── */}
              {/* <Button
                type="submit"
                disabled={!agreed || !email}
                variant="outline"
                size="bare"
                shape="md"
                className="w-full px-6 py-4 text-base font-normal text-body hover:bg-surface-alt"
              >
                {content.submitLabel}
              </Button> */}

              {/* Email input + "Join Now" button side-by-side in one white bar */}
              <div className="flex items-stretch gap-1.5 rounded bg-white p-1.5">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={content.emailPlaceholder}
                  required
                  className="min-w-0 flex-1 bg-transparent px-4 text-[16px] text-body placeholder:text-muted focus:outline-none"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <Button
                  type="submit"
                  disabled={!agreed || !email}
                  variant="unstyled"
                  size="bare"
                  shape="md"
                  className="shrink-0 px-6 py-3.5 text-base font-normal border border-line bg-white text-body hover:bg-brand-forest hover:border-brand-forest hover:text-white active:bg-brand-forest active:border-brand-forest active:text-white disabled:opacity-50 disabled:pointer-events-none"
                >
                  {content.submitLabel}
                </Button>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="newsletter-consent"
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <Button
                type="button"
                role="checkbox"
                aria-checked={agreed}
                variant="unstyled"
                size="bare"
                shape="md"
                onClick={() => setAgreed((v) => !v)}
                className="mt-0.5 flex-none focus-visible:outline-2 focus-visible:outline-white"
                aria-label={content.consentLabel}
              >
                <CheckSquare
                  className={`h-6 w-6 transition-colors ${
                    agreed ? "text-brand-champagne" : "text-white/60"
                  }`}
                  aria-hidden
                />
              </Button>
              <label
                htmlFor="newsletter-consent"
                className="cursor-pointer text-[13px] leading-snug text-white sm:text-[14px]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {content.consentText}
              </label>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
