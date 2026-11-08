"use client";

/**
 * PartnerContactSection — Figma nodes 634:2281 (desktop) + 970:1197 (mobile)
 * Partner With Us page — 6th component
 *
 * Structure:
 *  - Dark navy band with a subtle diagonal light streak
 *      Desktop: photo (left) + contact info & social links below it
 *              + inquiry form card (right)
 *      Mobile:  photo → form → contact info → social links (all stacked)
 */

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import photo from "@/public/about-us/bg-midsection.jpg";

// ── Arrow icon ────────────────────────────────────────────────────────────────
function ArrowRight({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Chevron down ──────────────────────────────────────────────────────────────
function ChevronDown() {
  return (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden>
      <path d="M1 1L7 7L13 1" stroke="var(--color-body)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── External link arrow (diagonal) ───────────────────────────────────────────
function ExtLink() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Shared input styles ───────────────────────────────────────────────────────
const inputCls = "w-full h-12 xl:h-13 rounded-lg border border-line-strong bg-white px-4 text-sm font-medium text-ink placeholder:text-muted outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-champagne-soft transition-all";

// ── Contact info data ─────────────────────────────────────────────────────────
const CONTACT = [
  { icon: "/home/footer-phone.svg", label: "Helpline No.", value: "+91-9971944622, 011-40550609" },
  { icon: "/svg/contact-us-location.svg", label: "Head Office", value: "806, KLJ Tower, Pitampura, Delhi - 110034" },
  { icon: "/home/footer-mail.svg", label: "Mail for info.", value: "contact@mystudyhub.com" },
];

// ── Social links data ─────────────────────────────────────────────────────────
const SOCIALS = [
  { icon: "/home/footer-facebook.svg", handle: "mystudyhub0", href: "https://facebook.com" },
  { icon: "/home/footer-instagram.svg", handle: "mystudyhub.official", href: "https://instagram.com" },
  { icon: "/home/footer-linkedin.svg", handle: "my-study-hub", href: "https://linkedin.com" },
  { icon: "/home/footer-pinterest.svg", handle: "Mystudyhub12", href: "https://pinterest.com" },
];

interface ContactItem {
  icon: string;
  label: string;
  value: string;
}

interface SocialItem {
  icon: string;
  handle: string;
  href: string;
}

// ── Contact info card ─────────────────────────────────────────────────────────
function ContactCard({ item }: { item: ContactItem }) {
  return (
    <div
      className="flex items-start gap-3 rounded-xl border border-white/12 p-4"
      style={{
        backgroundImage:
          "linear-gradient(145.45deg, color-mix(in srgb, var(--color-brand-forest) 10%, transparent) 12.704%, color-mix(in srgb, var(--color-brand-champagne) 10%, transparent) 87.17%)",
      }}
    >
      <Image
        src={item.icon}
        alt=""
        width={22}
        height={22}
        className="mt-0.5 size-5 shrink-0 object-contain"
      />
      <div className="flex min-w-0 flex-col gap-1">
        <p className="text-sm font-semibold text-white">{item.label}</p>
        <p className="text-sm leading-snug text-white/75">{item.value}</p>
      </div>
    </div>
  );
}

// ── Social link row ───────────────────────────────────────────────────────────
function SocialRow({ item }: { item: SocialItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 py-3.5 transition-opacity hover:opacity-75"
    >
      <span className="flex min-w-0 items-center gap-3">
        <Image
          src={item.icon}
          alt=""
          width={20}
          height={20}
          className="size-5 shrink-0 object-contain"
        />
        <span className="truncate text-sm font-medium text-white">{item.handle}</span>
      </span>
      <ExtLink />
    </a>
  );
}

// ── Contact form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ firstName:"", lastName:"", phone:"", email:"", org:"", country:"", city:"", state:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const cardCls =
    "rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-lg shadow-black/18 backdrop-blur-sm sm:p-6 xl:p-8";

  if (submitted) {
    return (
      <div className={`${cardCls} flex min-h-100 flex-col items-center justify-center gap-4 text-center`}>
        <div className="flex size-16 items-center justify-center rounded-full bg-brand-champagne-soft-bg text-3xl font-bold text-brand-green">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-white">Thank You for Reaching Out!</h3>
        <p className="max-w-md text-white/80">
          Your partnership inquiry has been submitted. Our business development team will contact you within 24 hours.
        </p>
        <Button variant="brandSolid"
          onClick={() => setSubmitted(false)}
          className="mt-4 rounded-xl px-6 py-2.5 font-medium text-white transition-opacity hover:opacity-90"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className={cardCls}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
        {/* First + Last name */}
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="First Name*" value={form.firstName} onChange={set("firstName")} className={inputCls} />
          <input type="text" placeholder="Last Name*" value={form.lastName} onChange={set("lastName")} className={inputCls} />
        </div>

        <input type="tel" placeholder="Phone Number*" value={form.phone} onChange={set("phone")} className={inputCls} />

        <input type="email" placeholder="Email Address*" value={form.email} onChange={set("email")} className={inputCls} />

        <input type="text" placeholder="Organization Name" value={form.org} onChange={set("org")} className={inputCls} />

        {/* Country dropdown */}
        <div className="relative">
          <select
            value={form.country}
            onChange={set("country")}
            className={`${inputCls} cursor-pointer appearance-none pr-10 ${form.country ? "text-ink" : "text-muted"}`}
          >
            <option value="" disabled>Country</option>
            <option>India</option><option>Russia</option><option>Georgia</option>
            <option>Uzbekistan</option><option>Kazakhstan</option><option>Nepal</option>
          </select>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            <ChevronDown />
          </div>
        </div>

        {/* City + State */}
        <div className="grid grid-cols-2 gap-3">
          <input type="text" placeholder="City*" value={form.city} onChange={set("city")} className={inputCls} />
          <input type="text" placeholder="State*" value={form.state} onChange={set("state")} className={inputCls} />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 pt-1">
          <p className="text-sm font-bold uppercase tracking-wide text-white">Details</p>
          <textarea
            placeholder="Write Your Message here"
            value={form.message}
            onChange={set("message")}
            rows={4}
            className="w-full min-h-28 resize-none rounded-lg border border-line-strong bg-white px-4 py-3 text-sm font-medium text-ink placeholder:text-muted outline-none transition-all focus:border-brand-blue focus:ring-2 focus:ring-brand-champagne-soft"
          />
        </div>

        {/* Submit */}
        <Button variant="brand"
          type="submit"
          fullWidth
          rightIcon={<ArrowRight />}
          className="mt-1 h-14 rounded-lg text-sm font-semibold uppercase tracking-wide text-white transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{ backgroundImage: "linear-gradient(163.77deg, var(--color-brand-forest) 12.704%, var(--color-brand-forest-deep) 87.17%)" }}
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function PartnerContactSection() {
  return (
    <div className="w-full">
      {/* ══════════════════════════════════════════
          DARK BAND
      ══════════════════════════════════════════ */}
      <div
        id="partner-contact"
        className="relative w-full overflow-hidden"
        style={{ backgroundColor: "var(--color-ink)" }}
      >
        {/* soft diagonal light streak (design background) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, color-mix(in srgb, white 7%, transparent) 0%, color-mix(in srgb, white 2%, transparent) 26%, transparent 46%, color-mix(in srgb, var(--color-brand-champagne) 10%, transparent) 100%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-[1720px] px-5 py-14 sm:px-8 lg:px-16 lg:py-24 2xl:px-25 2xl:py-25.75">

          {/* ── DESKTOP layout (hidden below xl) ── */}
          <div className="hidden items-start gap-10 xl:flex xl:gap-16">

            {/* LEFT column: photo + contact info + social links */}
            <div className="flex min-w-0 flex-1 flex-col gap-10 xl:gap-12">

              {/* Photo */}
              <div className="relative aspect-11/5 w-full overflow-hidden rounded-2xl">
                <Image
                  src={photo}
                  alt="Students studying at a university library"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1920px) 55vw, 950px"
                />
              </div>

              {/* Contact + Socials side by side */}
              <div className="grid grid-cols-[1.12fr_1fr] gap-8 xl:gap-10">

                {/* Contact info */}
                <div className="flex min-w-0 flex-col gap-5">
                  <h3 className="text-xl font-bold text-white xl:text-2xl" style={{ fontFamily: "var(--font-sub)" }}>
                    Reach us through
                  </h3>
                  <div className="flex flex-col gap-3">
                    {CONTACT.map((c) => <ContactCard key={c.label} item={c} />)}
                  </div>
                </div>

                {/* Social links */}
                <div className="flex min-w-0 flex-col gap-5">
                  <h3 className="text-xl font-bold text-white xl:text-2xl" style={{ fontFamily: "var(--font-sub)" }}>
                    Connect with us
                  </h3>
                  <div className="flex flex-col divide-y divide-white/10">
                    {SOCIALS.map((s) => <SocialRow key={s.handle} item={s} />)}
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT column: form card */}
            <div className="w-[41%] shrink-0 xl:w-[43%]">
              <ContactForm />
            </div>

          </div>

          {/* ── STACKED layout (phones + tablets, hidden on xl+) ── */}
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 xl:hidden">

            {/* Photo */}
            <div className="relative aspect-11/5 w-full overflow-hidden rounded-2xl">
              <Image
                src={photo}
                alt="Students studying at a university library"
                fill
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            {/* Form */}
            <ContactForm />

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[22px] font-bold text-white" style={{ fontFamily: "var(--font-sub)" }}>
                Reach us through
              </h3>
              <div className="flex flex-col gap-3">
                {CONTACT.map((c) => <ContactCard key={c.label} item={c} />)}
              </div>
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-5">
              <h3 className="text-[22px] font-bold text-white" style={{ fontFamily: "var(--font-sub)" }}>
                Connect with us
              </h3>
              <div className="flex flex-col divide-y divide-white/10">
                {SOCIALS.map((s) => <SocialRow key={s.handle} item={s} />)}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
