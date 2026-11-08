"use client";

/**
 * EventContactForm — Component 4 of the Event Detail page
 * Figma node 1152:1598
 *
 * Two-panel card:
 *   LEFT  — blue gradient bg, contact info, official contractor quote
 *   RIGHT — white bg, contact form with name/phone/email/course/message
 */

import { useState } from "react";
import { Phone, Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const COURSES = [
  "MBBS in Russia",
  "MBBS in Georgia",
  "MBBS in Uzbekistan",
  "MBBS in Kazakhstan",
  "MBBS in Kyrgyzstan",
  "MBBS in Nepal",
];

const inputCls =
  "w-full bg-surface border border-line rounded-xl px-5 py-4 text-ink font-medium text-base outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-champagne-soft transition-all font-['Inter',sans-serif]";

export default function EventContactForm() {
  const [form, setForm] = useState({
    name: "", phone: "", email: "", course: "MBBS in Russia", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="w-full px-5 @min-[640px]:px-10 @min-[1024px]:px-16 @min-[1280px]:px-20 py-12 @min-[1024px]:py-20 font-['Inter',sans-serif]"
    >
      <div
        className="max-w-[1640px] mx-auto rounded-3xl border border-line overflow-hidden flex flex-col @min-[1024px]:flex-row shadow-lg shadow-black/8 bg-white"
      >

        {/* ── LEFT — blue gradient info panel ── */}
        <div
          className="bg-linear-to-br from-brand-navy via-brand-royal to-brand-blue text-white flex flex-col justify-between p-8 @min-[640px]:p-12 @min-[1024px]:p-16 @min-[1024px]:w-[38%] shrink-0 relative overflow-hidden"
        >
          {/* Subtle background glow circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-brand-emerald/10 pointer-events-none" />

          <div className="flex flex-col gap-8 relative z-10">
            {/* Heading */}
            <div>
              <p className="text-brand-champagne-soft text-xs font-bold uppercase tracking-widest mb-2 font-['Inter',sans-serif]">
                Get Expert Advice
              </p>
              <h2 className="text-2xl @min-[640px]:text-4xl font-extrabold leading-tight font-['Inter',sans-serif]">
                Get Free Counseling
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-white/80 font-light text-base @min-[640px]:text-lg leading-relaxed font-['Inter',sans-serif]">
              Our expert consultants are ready to guide you through every step
              of your international medical education.
            </p>

            {/* Contact rows */}
            <div className="flex flex-col gap-5 pt-2">
              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Call Us</p>
                  <p className="text-white font-semibold text-sm @min-[640px]:text-base">+91-9971944622</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Email Us</p>
                  <p className="text-white font-semibold text-sm @min-[640px]:text-base">info@mystudyhub.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-xs text-white/60">Head Office</p>
                  <p className="text-white font-semibold text-sm @min-[640px]:text-base">806, KLJ Tower, Pitampura, Delhi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer quote */}
          <div className="flex flex-col gap-2 pt-10 mt-8 border-t border-white/15 relative z-10">
            <p className="text-brand-champagne-soft font-bold text-xs uppercase tracking-wider">
              Official University Contractor
            </p>
            <p className="text-white/80 italic text-sm @min-[640px]:text-base font-['Inter',sans-serif]">
              &ldquo;Turning medical dreams into global reality since 2014.&rdquo;
            </p>
          </div>
        </div>

        {/* ── RIGHT — form panel ── */}
        <div className="bg-white flex-1 p-8 @min-[640px]:p-12 @min-[1024px]:p-16">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-champagne-soft-bg text-brand-green flex items-center justify-center font-bold text-3xl">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl @min-[640px]:text-3xl font-bold text-ink font-['Inter',sans-serif]">
                Application Received!
              </h3>
              <p className="text-body max-w-md text-base leading-relaxed font-['Inter',sans-serif]">
                Thank you for reaching out. Our medical education counselor will get in touch with you within 24 hours.
              </p>
              <Button
              variant="brandSolid"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-8 py-3 rounded-xl bg-brand-green text-white font-medium hover:opacity-90 transition-opacity cursor-pointer shadow-md"
              >
                Send Another Request
              </Button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6"
            >
              <div className="mb-2">
                <h3 className="text-2xl font-bold text-ink font-['Inter',sans-serif]">
                  Request Free Counseling
                </h3>
                <p className="text-muted text-sm font-['Inter',sans-serif] mt-1">
                  Fill in your details below and our counseling expert will get in touch with you.
                </p>
              </div>

              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 @min-[640px]:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-body font-semibold text-xs uppercase tracking-wider">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-body font-semibold text-xs uppercase tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Row 2: Email + Course */}
              <div className="grid grid-cols-1 @min-[640px]:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-body font-semibold text-xs uppercase tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-body font-semibold text-xs uppercase tracking-wider">
                    Desired Country/Course
                  </label>
                  <div className="relative">
                    <select
                      value={form.course}
                      onChange={set("course")}
                      className={`${inputCls} appearance-none pr-10 cursor-pointer`}
                    >
                      {COURSES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
                      ▼
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-body font-semibold text-xs uppercase tracking-wider">
                  Your Message (Optional)
                </label>
                <textarea
                  placeholder="Ask any questions about fees, eligibility, or admission steps..."
                  value={form.message}
                  onChange={set("message")}
                  rows={4}
                  className={`${inputCls} resize-none`}
                />
              </div>

              {/* Submit */}
              <Button
              variant="brand"
                type="submit"
                fullWidth
                rightIcon={<Send size={18} />}
                className="h-14 @min-[640px]:h-16 bg-linear-to-r from-brand-green to-brand-blue text-white font-bold text-lg rounded-xl hover:opacity-90 transition-opacity active:scale-[0.99] shadow-lg cursor-pointer mt-2"
              >
                <span>Submit Application</span>
              </Button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
