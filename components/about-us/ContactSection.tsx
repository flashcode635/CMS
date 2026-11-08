"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import img from "@/public/contact-us/chairs.jpg";
// ── Data ───────────────────────────────────────────────────────────────────────
const BRANCHES = [
  "Delhi (Head Office)", "Bangalore", "Mumbai", "Chennai", "Hyderabad",
  "Pune", "Kolkata", "Ahmedabad", "Jaipur", "Lucknow",
];

const FIELDS = [
  [{ k: "firstName", ph: "First Name*" }, { k: "lastName", ph: "Last Name*" }],
  [{ k: "phone", ph: "Phone Number*", type: "tel" }],
  [{ k: "email", ph: "Email Address*", type: "email" }],
  [{ k: "city", ph: "City*" }, { k: "state", ph: "State*" }],
] as const;

const EMPTY_FORM = {
  firstName: "", lastName: "", phone: "", email: "",
  city: "", state: "", branch: "", message: "",
};

const OFFICES = [
  {
    title: "Head Office - India",
    flag: ["#FF9933", "#fff", "#138808"],
    chakra: true,
    address:
      "Office No. 806, 8th floor, KLJ Tower North, Netaji Subhash Place, Pitampura, New Delhi - 110034, India",
  },
  {
    title: "International Office - Russia",
    flag: ["#fff", "#0039A6", "#D52B1E"],
    chakra: false,
    address: "Office No - 831, Proletarskaya -150/4, Samara, Russia - 443001",
  },
];

const CONTACTS = [
  { href: "tel:+919971944622", icon: "/home/footer-phone.svg", text: "+91-9971944622" },
  { href: "mailto:contact@mystudyhub.com", icon: "/home/footer-mail.svg", text: "contact@mystudyhub.com" },
];

const SOCIALS = [
  { label: "Facebook", handle: "mystudyhub0", href: "https://www.facebook.com/mystudyhub0", icon: "/home/footer-facebook.svg" },
  { label: "Instagram", handle: "mystudyhub.official", href: "https://www.instagram.com/mystudyhub.official", icon: "/home/footer-instagram.svg" },
  { label: "LinkedIn", handle: "my-study-hub", href: "https://www.linkedin.com/company/my-study-hub", icon: "/home/footer-linkedin.svg" },
  { label: "Pinterest", handle: "Mystudyhub12", href: "https://www.pinterest.com/mystudyhub12", icon: "/home/footer-pinterest.svg" },
];

// ── Shared classes ─────────────────────────────────────────────────────────────
const pad = "w-full px-5 sm:px-10 lg:px-16 xl:px-20";
const card = "rounded-3xl border border-white/60 bg-white p-7 shadow-sm";
const gradient = "bg-linear-to-r from-brand-green to-brand-blue";
const fieldCls =
  "w-full rounded-xl border border-[#D6CCBA] bg-white px-5 text-sm font-medium outline-none transition-all placeholder:text-[#6F7B74] focus:border-brand-blue focus:ring-2 focus:ring-brand-champagne-soft";
const inputCls = `${fieldCls} h-10 text-[#1C2B25]`;

// ── Small components ───────────────────────────────────────────────────────────
const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs font-bold uppercase tracking-widest text-[#12211C]">{children}</p>
);

const Arrow = ({ className = "size-4.5" }) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Flag = ({ colors, chakra, label }: { colors: string[]; chakra: boolean; label: string }) => (
  <div className="mb-5 flex flex-col gap-0.5" aria-label={label}>
    {colors.map((c, i) => (
      <div
        key={c}
        className={`relative h-1.25 w-10 rounded-sm ${c === "#fff" ? "border border-line" : ""}`}
        style={{ background: c }}
      >
        {chakra && i === 1 && (
          <span className="absolute inset-0 m-auto size-2 rounded-full border border-[#000080]" />
        )}
      </div>
    ))}
  </div>
);

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200)); // TODO: replace with real API call
    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setForm(EMPTY_FORM);
  };

  return (
    <div className="w-full bg-linear-to-br from-[#EDF3EF] via-[#EFE9DE] to-[#EFE9DE] font-['Inter','Inter',sans-serif]">

      {/* ── Section 1: Form + Illustration ── */}
      <section className={`${pad} pb-22 pt-26`}>
        <div className="mx-auto flex max-w-350 flex-col items-center gap-12 lg:flex-row lg:gap-12">
          <div className="flex w-full min-w-0 flex-col gap-6 lg:max-w-130 lg:shrink-0">
            <h2
              className={`w-fit font-serif bg-clip-text text-[clamp(24px,2.6vw,40px)] leading-tight text-transparent ${gradient}`}
            >
              <span className="font-bold">We&apos;d love to </span>
              <span className="italic">hear from you,</span>
              <br />
              <span className="italic">Don&apos;t hesitate </span>
              <span className="font-bold">to contact us.</span>
            </h2>

            {submitted ? (
              <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-8 py-12 text-center shadow-md">
                <svg viewBox="0 0 56 56" fill="none" aria-hidden className="size-14">
                  <circle cx="28" cy="28" r="28" fill="#EDF3EF" />
                  <path d="M16 28l9 9L40 19" stroke="#0E8F5B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-xl font-bold text-[#12211C]">Message Sent!</h3>
                <p className="max-w-xs text-sm text-[#4A554F]">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
               
                <Button onClick={reset} size="bare"
                className="mt-2 px-6 py-2.5 text-sm font-semibold">Submit</Button>

              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {FIELDS.map((row, i) => (
                  <div key={i} className="flex gap-4">
                    {row.map(({ k, ph, ...rest }) => (
                      <input
                        key={k}
                        name={k}
                        placeholder={ph}
                        value={form[k]}
                        onChange={onChange}
                        required
                        className={`${inputCls} flex-1`}
                        {...rest}
                      />
                    ))}
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <span className="pl-2">
                    <Label>Nearest Branch</Label>
                  </span>
                  <div className="relative">
                    <select
                      name="branch"
                      value={form.branch}
                      onChange={onChange}
                      className={`${fieldCls} h-10 cursor-pointer appearance-none pr-12 ${
                        form.branch ? "text-[#1C2B25]" : "text-[#6F7B74]"
                      }`}
                    >
                      <option value="" disabled>NEAREST BRANCH</option>
                      {BRANCHES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 14 8"
                      fill="none"
                      aria-hidden
                      className="pointer-events-none absolute right-4 top-1/2 w-3.5 -translate-y-1/2"
                    >
                      <path d="M1 1L7 7L13 1" stroke="#6F7B74" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="pl-2">
                   <Label>Details</Label>  
                  </span>
                  <textarea
                    name="message"
                    placeholder="Write Your Message here"
                    value={form.message}
                    onChange={onChange}
                    rows={3}
                    className={`${fieldCls} resize-none py-4 text-[#1C2B25]`}
                  />
                </div>

              <Button type="submit" fullWidth shape="pill" isLoading={loading}
                rightIcon={!loading ? <Arrow /> : undefined}
                className="mt-3 text-sm font-semibold uppercase tracking-widest">
                  Submit Now
                </Button>

              </form>
            )}
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex lg:max-w-150">
            <div className="relative aspect-640/1090 w-full">
              <Image
                src="/contact-hand-illustration.png"
                alt="3D hand holding mail envelope with phone and globe icons"
                fill
                className="object-contain"
                sizes="600px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Offices + Contacts + Socials ── */}
      <section className={`${pad} pb-16`}>
        <div className="mx-auto flex max-w-7xl flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {OFFICES.map((o) => (
              <div key={o.title} className={`${card} relative overflow-hidden`}>
                <div className="absolute right-5 top-5 flex gap-2">
                  <Image className="text-body" src="/svg/contact-us-route.svg" alt="" width={40} height={40} />
                  <Image className="text-body" src="/svg/contact-us-location.svg" alt="" width={40} height={40} />
                </div>
                <Flag colors={o.flag} chakra={o.chakra} label={`${o.title} flag`} />
                <h3 className="mb-3 font-['Playfair_Display',Georgia,serif] text-2xl font-bold text-[#12211C]">
                  {o.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#4A554F]">{o.address}</p>
              </div>
            ))}
          </div>

          <div className={card}>
            <p className="mb-5 text-sm font-bold text-[#12211C]">Reach us through</p>
            <div className="flex flex-wrap items-center gap-8">
              {CONTACTS.map((c) => (
                <a key={c.href} href={c.href} className="group flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-[#0A6B44]/30 transition-colors group-hover:bg-[#0A6B44]/10">
                    <Image src={c.icon} alt="" width={18} height={18} className="object-contain" />
                  </span>
                  <span className="text-sm font-semibold text-[#12211C] transition-colors group-hover:text-[#0A6B44]">
                    {c.text}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className={card}>
            <p className="mb-5 text-sm font-bold text-[#12211C]">Social Networks</p>
            <div className="flex flex-wrap items-center justify-between gap-3 ">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="group flex items-center gap-2 border-b-2 px-3 border-transparent bg-bottom bg-no-repeat pb-3 transition-opacity hover:opacity-75"
                  style={{
                    backgroundImage: "linear-gradient(to right, #0E8F5B, #0B3B2E)",
                    backgroundSize: "100% 2px",
                  }}
                > 
                  <Image src={s.icon} alt="" width={16} height={16} className="size-4 object-contain" />
                  <span className="text-[10px] font-medium text-[#12211C] transition-colors group-hover:text-[#0A6B44]">
                    {s.handle}
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden
                    className="ml-1 size-3 text-[#12211C] transition-colors group-hover:text-[#0A6B44]"
                  >
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: CTA ── */}
      <section className="relative w-full overflow-hidden" aria-label="Counselling CTA">
        <div className="relative z-10 flex flex-col items-center gap-5 bg-[#0B3B2E] px-6 pb-10 pt-14 text-center">
          <Image
            src="/home/enroll-bg-pattern.png"
            alt=""
            fill
            className="pointer-events-none object-cover opacity-5"
            sizes="100vw"
          />
          <p className="relative text-[clamp(10px,0.9vw,14px)] font-semibold uppercase tracking-[3.4px] text-brand-sky">
            My Study Hub
          </p>
          <h2 className="relative max-w-190 font-['Playfair Display','Playfair_Display',Georgia,serif] text-[clamp(24px,3.33vw,56px)] font-bold leading-[1.15] text-white">
            Book Your FREE Counselling Session Today!
          </h2>
          <Link
            href="/contact-us"
            className="relative inline-flex items-center gap-3 border border-white/60 px-10 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-white hover:text-[#0B3B2E]"
            onClick={(e) => {
              if (window.location.pathname === "/contact-us") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            REGISTER NOW <Arrow className="size-4" />
          </Link>
          <div className="relative h-[clamp(180px,22vw,420px)] w-full">
            <Image
              src={img}
              alt="Lecture hall with rows of chairs"
              fill
              className="object-cover object-center"
              sizes="100vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-[#0B3B2E] to-transparent to-30%"
              aria-hidden
            />
          </div>
        </div>
      </section>
    </div>
  );
}
