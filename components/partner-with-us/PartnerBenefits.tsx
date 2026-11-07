/**
 * PartnerBenefits — Figma nodes 431:4181 (desktop) + 796:1669 (mobile)
 * Partner With Us page — 3rd component
 */

import Image from "next/image";

const BENEFITS = [
  {
    id: 1,
    desktopIcon: "https://www.figma.com/api/mcp/asset/385c2ab4-553d-455e-93ce-82042185eb7a",
    mobileIcon:  "https://www.figma.com/api/mcp/asset/b1d4b01c-62e1-4e73-93a8-6f937684dc1e",
    title: "Expert Guidance",
    desktopBody: "Benefit from our expertise and experience in assisting students with the MBBS admission process overseas. Partnering with My Study Hub means aligning with a trusted advisor for aspiring medical professionals.",
    mobileBody:  "Benefit from our expertise and experience in assisting students with the MBBS admission process overseas. Partnering with My Study Hub means aligning with a trusted advisor.",
  },
  {
    id: 2,
    desktopIcon: "https://www.figma.com/api/mcp/asset/cf28bd65-217f-467a-bde2-1947c123165c",
    mobileIcon:  "https://www.figma.com/api/mcp/asset/582653d7-5ae8-499c-88d1-97f191794b7f",
    title: "Vast Network",
    desktopBody: "Gain access to our extensive network of partner universities, colleges, and educational institutions offering MBBS programs abroad. Expand your reach and connect with students seeking guidance on studying medicine overseas.",
    mobileBody:  "Gain access to our extensive network of partner universities, colleges, and educational institutions offering MBBS programs abroad. Expand your reach.",
  },
  {
    id: 3,
    desktopIcon: "https://www.figma.com/api/mcp/asset/d8f22278-c7b5-4ba1-84a3-6bde49cfcb9c",
    mobileIcon:  "https://www.figma.com/api/mcp/asset/284070e4-3ae4-4963-a521-be6b8512c4d8",
    title: "Comprehensive Support",
    desktopBody: "From application assistance and visa guidance to pre-departure orientation and beyond, we provide comprehensive support to students at every step of their MBBS journey abroad. Partnering with us ensures that your students receive the support they need to succeed.",
    mobileBody:  "From application assistance and visa guidance to pre-departure orientation and beyond, we provide comprehensive support to students at every step.",
  },
  {
    id: 4,
    desktopIcon: "https://www.figma.com/api/mcp/asset/210f0008-7082-4894-bca9-d64643b4573e",
    mobileIcon:  "https://www.figma.com/api/mcp/asset/55ccb07c-902e-4a96-a6fe-e12d6ede52aa",
    title: "Ethical Practices",
    desktopBody: "We adhere to strict ethical standards and prioritize the best interests of students above all else. Partnering with My Study Hub means associating your brand with integrity, transparency, and professionalism.",
    mobileBody:  "We adhere to strict ethical standards and prioritize the best interests of students above all else. Partnering with us means associating your brand with integrity.",
  },
];

// Shared card shape
const cardBase =
  "bg-white border border-brand-sky/60 w-full flex flex-col gap-2 " +
  "rounded-lg rounded-tr-[52px] xl:rounded-tr-[50px] rounded-bl-[52px] xl:rounded-bl-[50px] " +
  "shadow-[0px_10px_30px_rgba(88,92,95,0.1)] " +
  "transition-all duration-300 cursor-pointer " +
  "hover:-translate-y-1.5 hover:shadow-[0px_20px_40px_rgba(49,99,255,0.15)] hover:border-brand-blue";

export default function PartnerBenefits() {
  return (
    <section
      className="w-full"
      style={{
        backgroundImage:
          "linear-gradient(128.76deg, rgba(0,146,63,0.06) 12.704%, rgba(49,99,255,0.06) 87.17%)",
      }}
    >

      {/* ══════════════════════════════════════════════
          MOBILE  (hidden on sm+)
      ══════════════════════════════════════════════ */}
      <div className="flex sm:hidden flex-col gap-8 px-5 py-12">

        {/* Header */}
        <div className="flex flex-col gap-3">
          <h2
            className="font-extrabold bg-clip-text text-transparent leading-snug 
            w-full text-2xl"
            style={{
              fontFamily: "Inter, sans-serif",
              backgroundImage:
                "linear-gradient(149.04deg, #00923F 12.704%, #3163FF 87.17%)",
            }}
          >
            Why Partner with Us for MBBS Overseas?
          </h2>
          <p
            className="text-[#606c83] font-light text-sm leading-relaxed"
            style={{ fontFamily: "'Lexend', sans-serif" }}
          >
            Partnering with us opens doors to mutual growth, innovation, and
            success. Benefits of Partnership:
          </p>
        </div>

        {/* Single-column cards */}
        <div className="flex flex-col gap-5">
          {BENEFITS.map((b) => (
            <div key={b.id} className={`${cardBase} p-5`}>
              {/* Icon 44px */}
              <div className="relative w-11 h-11 rounded-lg bg-[#d2ddff] overflow-hidden shrink-0">
                <Image
                  src={b.mobileIcon}
                  alt={b.title}
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="44px"
                />
              </div>
              {/* Title */}
              <h3
                className="text-[#00142d] font-extrabold text-lg leading-snug"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {b.title}
              </h3>
              {/* Body */}
              <p
                className="text-[#4a5568] font-normal text-xs leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {b.mobileBody}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP  (hidden below sm)
      ══════════════════════════════════════════════ */}
      
      <div className="hidden sm:flex flex-col gap-12 px-3 lg:px-6 xl:px-10 py-14 
      lg:py-16 max-w-350 mx-auto">

        {/* Header — centered */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            className="font-extrabold bg-clip-text text-transparent leading-tight w-full text-3xl md:text-4xl lg:text-[42px]"
            style={{
              fontFamily: "Inter, sans-serif",
              backgroundImage:
                "linear-gradient(175.35deg, #00923F 12.704%, #3163FF 87.17%)",
            }}
          >
            Why Partner with Us for MBBS Overseas?
          </h2>
          <p
            className="text-[#606c83] font-normal leading-relaxed max-w-240 text-sm md:text-base"
            style={{
              fontFamily: "'Lexend', sans-serif",
            }}
          >
            At My Study Hub, we believe in the power of collaboration.
            Whether you&apos;re an educational institution, business, or industry
            leader, partnering with us opens doors to mutual growth, innovation,
            and success. Benefits of Partnership:
          </p>
        </div>

        {/* 4-column grid (flexible & adjustable) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 items-stretch">
          {BENEFITS.map((b) => (
            <div
              key={b.id}
              className={[
                cardBase,
                "p-4 lg:p-5 text-justify",
              ].join(" ")}
            >
              {/* Icon */}
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-[#d2ddff] overflow-hidden shrink-0">
                <Image
                  src={b.desktopIcon}
                  alt={b.title}
                  fill
                  className="object-cover object-center"
                  unoptimized
                  sizes="56px"
                />
              </div>
              {/* Title */}
              <h3
                className="font-extrabold text-[#00142d] leading-snug text-lg lg:text-xl"
                style={{
                  fontFamily: "Inter, sans-serif",
                }}
              >
                {b.title}
              </h3>
              {/* Body text — smaller & neatly adjustable */}
              <p
                className="font-normal text-[#434a54] leading-normal text-[13px]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {b.desktopBody}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
