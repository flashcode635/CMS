"use client";

import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <section className="relative w-full overflow-hidden flex flex-col justify-center items-center gap-16 py-12 px-12"
      style={{ height: "clamp(200px, 25.36vw, 487px)" }}
    >
      {/* Background Image */}
      <Image
        src="/about-us/career/welcome.webp"
        alt="Students graduation background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Dark blue overlay */}
      <div className="absolute inset-0 bg-[rgba(10,36,114,0.82)]" />

      {/* Content */}
      <div className="relative z-10 self-stretch flex flex-col justify-start items-center gap-12">
        <div className="self-stretch flex flex-col justify-start items-center gap-4">

          {/* Heading row */}
          <div className="self-stretch inline-flex justify-center items-center gap-2.5">
            <h1
              className="text-center text-white text-[clamp(22px,3.33vw,64px)] font-extrabold font-serif leading-[1.2]"
              style={{ width: "clamp(300px, 55.67vw, 1068.91px)" }}
            >
              Welcome to My Study Hub!
            </h1>
          </div>

          {/* Body text row */}
          <div className="self-stretch inline-flex justify-center items-center gap-2.5">
            <p
              className="text-center text-white/90 text-[clamp(13px,1.04vw,20px)] font-normal font-['Inter'] leading-[1.6]"
              style={{ width: "clamp(300px, 58.87vw, 1130.38px)" }}
            >
              At My Study Hub Pvt. Ltd., we believe in the power of
              education to transform lives. We&apos;re not just a company;
              we&apos;re a passionate team dedicated to fostering a love of
              learning and creating a brighter future for students.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}