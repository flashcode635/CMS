"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function HeroBanner() {

  return (
    <section className="w-full" style={{ backgroundImage: "url('/home/hero-bg.jpg')", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "100vh"  }} >
      <div className="relative w-full h-screen bg-linear-to-r from-brand-forest-deep/5 via-brand-forest-deep/55 to-brand-forest-deep/25 text-white flex flex-col justify-between overflow-hidden select-none">

      {/* ========================================== */}
      {/* HERO MAIN CONTENT */}
      {/* ========================================== */}
      
      <div className="relative z-10 max-w-300 mx-0 px-16 pt-5 pb-12 flex flex-col items-start text-center my-auto">
        {/* Main Headline */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl md:mt-10 font-normal tracking-wide text-white leading-tighter max-w-262.5"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="font-extrabold font-sans">Study In </span>
          <span className="italic font-serif font-light text-brand-champagne-soft">Abroad</span>{" "}
          <span className="font-extrabold font-sans">From </span>
          <br className="hidden sm:inline" />
         
        </h1>
         {/* Main Headline */}
        <h1
          className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-wide text-white leading-tighter max-w-262.5"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <span className="italic font-serif font-light text-brand-champagne">12+</span>{" "}
          <span className="font-extrabold font-sans">Countries</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-white/70 text-sm max-w-270 font-light leading-relaxed">
          Lorem ipsum dolor sit amet consectetur adipiscing eli mattis sit
          phasellus mollis sit aliquam sit nullam neque ultrices.
        </p>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <Button
          variant="brandWide"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="px-4 py-2.5 rounded-md text-sm font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-brand-champagne-rich/40 hover:scale-105 h-auto"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-champagne-rich) 0%, var(--color-brand-champagne-deep) 100%)",
            }}
          >
            Register Now
          </Button>
          <Button
          variant="brandBorder"
            className="px-4 pt-2.5 pb-1.5 rounded-md border-2 border-transparent text-ink text-sm 
            font-semibold hover:opacity-90 transition-all h-auto shadow-none"
            style={{
              background:
                "linear-gradient(var(--color-line), var(--color-line)) padding-box, linear-gradient(90deg, var(--color-brand-champagne) 0%, var(--color-brand-forest) 60%, var(--color-brand-forest-deep) 100%) border-box",
            }}
          >
            Explore Courses
          </Button>
        </div>
      </div>
      
      </div>

    </section>
  );
}
