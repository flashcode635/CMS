"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LocationMap from "../about-us/LocationMap";
import FormCard from "../ui/form";
export type ExpertCounsellingSectionProps = {
    type: "flight" | "location";
}
export default function ExpertCounsellingSection({type}: ExpertCounsellingSectionProps) {
    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [showCap, setShowCap] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => setShowCap(true), 900);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <>
            <style>{`
        
                
                
                
                .anim-flight { opacity: 0; }
                .anim-flight.visible { animation: sp-slide-left 1.6s
                 cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .anim-form { opacity: 0; }
                .anim-form.visible { animation: sp-slide-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.25s forwards; }
                .anim-title { opacity: 0; }
                .anim-title.visible { animation: sp-slide-right 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards; }
                .anim-cap { opacity: 0; }
                .anim-cap.visible { animation: sp-drop-rotate 1.1s cubic-bezier(0.34, 1.4, 0.64, 1) forwards; }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full overflow-hidden bg-linear-to-b from-brand-forest-deep via-brand-forest-deep to-brand-forest-deep py-10 sm:py-14 lg:py-16"
            >
                {/* Background lighting accents */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div
                        className="absolute top-0 right-1/4 w-125 h-125 rounded-full blur-3xl opacity-25"
                        style={{ background: "radial-gradient(circle, var(--color-brand-forest) 0%, transparent 70%)" }}
                    />
                    <div
                        className="absolute bottom-0 right-0 w-150 h-100 rounded-full blur-3xl opacity-20"
                        style={{ background: "radial-gradient(circle, var(--color-brand-forest-deep) 0%, transparent 70%)" }}
                    />
                </div>

                {/* Main Content Container - 2 Column on desktop, adjacent to aeroplane */}
                <div className="relative z-10 max-w-370 mx-auto px-4
                 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6 xl:gap-10">

                        {/* LEFT: Airplane & Visual Stage */}
                      {
                      type=="flight" && 
                      (  <div className="w-full lg:w-[54%] flex flex-col 
                        items-center lg:items-start relative">
                            {/* Heading above plane on mobile / top of left col */}
                            <div className={`w-full text-center lg:text-left mb-4 sm:mb-6 anim-title${visible ? " visible" : ""}`}>
                                <p className="text-brand-champagne font-semibold
                                 text-xs sm:text-sm tracking-widest
                                  uppercase mb-2">
                                    Admissions Open 2026-27
                                </p>
                                <h2
                                    className="text-white font-normal max-w-xl mx-auto lg:mx-0"
                                    style={{
                                        fontFamily: 'var(--font-sub)',
                                        fontSize: "clamp(26px, 2.7vw, 44px)",
                                        lineHeight: "1.2",
                                    }}
                                >
                                    Get Expert Counselling for MBBS admission!
                                </h2>
                            </div>

                            {/* Aeroplane Graphics */}
                            <div className="relative w-full max-w-155lg:max-w-none flex items-center justify-center">
                                {/* Soft flight glow background */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                                    <div className="w-[85%] h-[85%] rounded-full bg-brand-champagne/20 blur-2xl" />
                                </div>

                                <div className={`w-full ml-10
                                     relative anim-flight${visible ? " visible" : ""}`}>
                                    <Image
                                        src="/home/flight.svg"
                                        alt="Airplane taking off abroad"
                                        width={780}
                                        height={600}
                                        className="w-full h-auto object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-102"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>) 
                        }

                        {
                         type=="location" && (
                                <>
                                    <LocationMap />
                                </>
                            )
                        }

                        {/* RIGHT: Form placed higher up, adjacent to the aeroplane */}
                        <div className="w-full lg:w-[46%] max-w-145 mx-auto lg:mx-0 relative">
                            {/* Graduation Cap floating on top right of form */}
                            <div
                                className={`absolute -top-10 sm:-top-12 -right-3 sm:-right-4 w-20 h-20 sm:w-28 sm:h-28 pointer-events-none z-30 anim-cap${showCap ? " visible" : ""}`}
                            >
                                <Image
                                    src="/home/cap.svg"
                                    alt="Graduation cap"
                                    width={165}
                                    height={165}
                                    className="w-full h-full object-contain drop-shadow-xl"
                                    style={{ transform: "rotate(-5.28deg)" }}
                                    priority
                                />
                            </div>

                            {/* Form Card */}
                            
                            <FormCard visible={visible} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}
