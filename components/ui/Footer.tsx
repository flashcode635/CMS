"use client";

import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import {
  Search,
  Phone,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";

const countries: string[] = [
  "MBBS in Russia",
  "MBBS in Abroad",
  "MBBS in Uzbekistan",
  "MBBS in Kyrgyzstan",
  "MBBS in Georgia",
  "MBBS in India",
  "MBBS in Kazakhstan",
  "MBBS in Bangladesh",
];

const usefulLinks: string[] = [
  "Overview",
  "Upcoming Event",
  "Services",
  "Admin Login",
];

const searchTags: string[] = [
  "Courses",
  "Services",
  "Nearby Counsellor",
  "Contact Us",
];

const socials = [
  { label: "Facebook", icon: "/home/footer-facebook.svg", href: "#" },
  { label: "Instagram", icon: "/home/footer-instagram.svg", href: "#" },
  { label: "Twitter", icon: "/home/footer-twitter.svg", href: "#" },
];

export default function Footer() {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <footer className="w-full text-white relative overflow-hidden bg-[#072A21]">
      {/* Background radial/linear shader gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 20% 30%, rgba(14, 143, 91, 0.18) 0%, rgba(7, 42, 33, 0.94) 60%, rgba(7, 42, 33, 1) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(14, 143, 91, 0.22) 0%, rgba(14, 143, 91, 0.08) 50%, rgba(7, 42, 33, 0.8) 100%)",
          }}
        />
        {/* Slanted laser beam background overlay */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            background:
              "linear-gradient(125deg, transparent 0%, rgba(14, 143, 91, 0.04) 40%, rgba(14, 143, 91, 0.1) 50%, rgba(14, 143, 91, 0.04) 60%, transparent 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-350 mx-auto px-6 lg:px-12 pt-12 pb-2">
        {/* Top Search Bar & Action Buttons */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex items-center justify-center p-2 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                <Search className="w-6 h-6 text-[#D8B26E]" />
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(e.target.value)
                }
                placeholder="Search For..."
                className="bg-transparent text-white text-lg font-light placeholder-white/60 outline-none w-full"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {searchTags.map((tag) => (
<Button key={tag} variant="dark" size="bare" shape="lg"
  className="px-6 py-2.5 text-sm shadow-[0_0_15px_rgba(0,200,255,0.05)]">
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {/* Divider Line */}
          <div className="h-px w-full bg-linear-to-r from-transparent via-brand-cyan/30 to-transparent" />
        </div>

        {/* 5 Main Grid Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Column 1: Brand Info & International Office (3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-6">
            <h2
              className="text-2xl font-bold tracking-wide text-white"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Study Hub
            </h2>
            <p className="text-white/70 text-sm leading-relaxed font-light">
              My Study Hub: Your trusted partner for seamless MBBS abroad
              guidance, admissions, and career success. Turning dreams into
              reality!
            </p>

            <div>
<Button variant="brandWide" size="bare" shape="md"
  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider">
                READ MORE
              </Button>
            </div>

            <div className="border-l-2 border-[#D8B26E] pl-4 py-1 space-y-1">
              <p className="text-[#D8B26E] text-sm font-semibold">
                International Office, Russia
              </p>
              <p className="text-white/60 text-xs leading-relaxed">
                Office No. - 412, Nevsky Prospekt - 78/3,
                <br />
                Saint Petersburg, Russia - 190000
              </p>
            </div>
          </div>

          {/* Column 2: Countries (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Countries
            </h3>
            <ul className="space-y-2.5">
              {countries.map((country) => (
                <li key={country} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan inline-block" />
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-cyan text-sm transition-colors duration-200"
                  >
                    {country}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Useful Links
            </h3>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-white/80 hover:text-brand-cyan text-sm transition-colors duration-200 block"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Get in Touch (3 cols) */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Get in Touch
            </h3>

            {/* Helpline Card */}
            <div className="p-4 rounded-xl border border-brand-cyan/30 bg-[#0B3B2E]/80 backdrop-blur-md flex items-start gap-3 shadow-[0_0_20px_rgba(216,178,110,0.10)] hover:border-brand-cyan/50 transition-all">
              <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan mt-0.5">
                <Phone className="w-4 h-4 text-brand-cyan" />
              </div>
              <div>
                <p className="text-xs text-white/50 font-medium">Helpline No.</p>
                <p className="text-sm text-white font-semibold mt-0.5">
                  +91-9971944622, 011-40550609
                </p>
              </div>
            </div>

            {/* Head Office Card */}
            <div className="p-4 rounded-xl border border-brand-cyan/30 bg-[#0B3B2E]/80 backdrop-blur-md flex items-start gap-3 shadow-[0_0_20px_rgba(216,178,110,0.10)] hover:border-brand-cyan/50 transition-all">
              <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan mt-0.5">
                <MapPin className="w-4 h-4 text-brand-cyan" />
              </div>
              <div>
                <p className="text-xs text-white/50 font-medium">My Study Hub - Head Office</p>
                <p className="text-sm text-white font-medium mt-0.5 leading-tight">
                  305, Metro Heights, Sector 44, Gurugram - 122003
                </p>
              </div>
            </div>

            {/* Mail Card */}
            <div className="p-4 rounded-xl border border-brand-cyan/30 bg-[#0B3B2E]/80 backdrop-blur-md flex items-start gap-3 shadow-[0_0_20px_rgba(216,178,110,0.10)] hover:border-brand-cyan/50 transition-all">
              <div className="p-2 rounded-lg bg-brand-cyan/10 text-brand-cyan mt-0.5">
                <Mail className="w-4 h-4 text-brand-cyan" />
              </div>
              <div>
                <p className="text-xs text-white/50 font-medium">Mail for info.</p>
                <p className="text-sm text-white font-medium mt-0.5 break-all">
                  contact@mystudyhub.com
                </p>
              </div>
            </div>
          </div>

          {/* Column 5: Our Socials (2 cols) */}
          <div className="lg:col-span-2 flex flex-col space-y-4 relative">
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Socials
            </h3>

            <div className="divide-y divide-white/10 border-t border-b border-white/10">
              {socials.map((social) => {
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="py-3 flex items-center justify-between group text-white/80 hover:text-brand-cyan transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 rounded-md bg-brand-cyan/10 text-brand-cyan group-hover:bg-brand-cyan/20 transition-colors relative w-6 h-6 flex items-center justify-center">
                        <Image
                          src={social.icon}
                          alt={social.label}
                          width={18}
                          height={18}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium">{social.label}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                  </Link>
                );
              })}
            </div>

          </div>
        </div>

        {/* Bottom Sub-Footer Copyright & Legal Links Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© Copyright My Study Hub 2026-27 All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-brand-cyan transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-brand-cyan transition-colors">
              Refund Policy
            </Link>
            <Link href="#" className="hover:text-brand-cyan transition-colors">
              Social Awareness
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
