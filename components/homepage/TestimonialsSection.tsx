"use client";

import ThreeDCarousel from "@/components/ui/threeDCarousel";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Rimjhim Chandra",
    image: "/home/party-video1.jpg",
    role: "Student at Samara State Medical University, Russia",
    quote: "Hear directly from Indian students pursuing MBBS in Russia — their experiences, achievements, and the support they received from My Study Hub.",
  },
  {
    id: 2,
    name: "Pushpanjali",
    image: "/home/party-video2.jpg",
    role: "Student at Kabardino-Balkarian State University, Russia",
    quote: "Follow the journeys of aspiring doctors from India as they study MBBS in Russia with trusted support from My Study Hub.",
  },
  {
    id: 3,
    name: "Vanshika",
    image: "/home/partyone.webp",
    role: "Student at Kabardino-Balkarian State University, Russia",
    quote: "Real stories from Indian students studying MBBS in Russia — their journey, challenges, and how My Study Hub supported them every step of the way.",
  },
  {
    id: 4,
    name: "S.K Sai Mandal",
    image: "/home/partytwo.webp",
    role: "Student at Kabardino-Balkarian State University, Russia",
    quote: "Learn about the challenges, opportunities, and achievements of Indian students pursuing MBBS abroad with the guidance of My Study Hub.",
  },
  {
    id: 5,
    name: "Pushpanjali",
    image: "/home/partyThree.webp",
    role: "Student at Kabardino-Balkarian State University, Russia",
    quote: "Follow the journeys of aspiring doctors from India as they study MBBS in Russia with trusted support from My Study Hub.",
  },
  {
    id: 6,
    name: "Vanshika",
    image: "/home/partyFour.webp",
    role: "Student at Kabardino-Balkarian State University, Russia",
    quote: "Real stories from Indian students studying MBBS in Russia — their journey, challenges, and how My Study Hub supported them every step of the way.",
  },
];

type Testimonial = (typeof testimonials)[number];

function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const { name, role, quote } = testimonial;

  return (
    <>
      {/* Video Area */}
      <div
        className="absolute left-0 right-0"
        style={{ top: 0, height: "55%", padding: 0 }}
      >
        <div
          className="h-full w-full overflow-hidden"
          style={{
            borderRadius: 0,
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          }}
        >
          <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-brand-emerald-deep to-brand-blue">
            <Image
              src={testimonial.image}
              alt={`${name} testimonial`}
              fill
              className="object-cover opacity-80"
              sizes="400px"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#072A21]/75 via-transparent to-black/20" />
            <Image
              src="/home/party-yt-wordmark.svg"
              alt="Video platform"
              width={120}
              height={27}
              className="relative opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Text Area */}
      <div
        className="absolute bottom-0 left-0 right-0 flex flex-col justify-between"
        style={{ height: "43%", padding: "8px 20px 15px" }}
      >
        <div className="flex items-start gap-2">
          <span
            className="shrink-0 leading-none text-white/90"
            style={{
              fontSize: "44px",
              fontFamily: "'Georgia', serif",
              lineHeight: "0.8",
              marginTop: "4px",
            }}
          >
            &quot;
          </span>
          <p
            className="line-clamp-3 text-sm leading-5.5 text-white/90"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {quote}
          </p>
        </div>

        <div
          className="my-2 h-px w-full"
          style={{ background: "rgba(255,255,255,0.2)" }}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold text-white"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
              >
                {name[0]}
              </div>
              <div className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand-emerald" />
            </div>
            <div>
              <p className="text-base leading-5 font-semibold text-white">
                {name}
              </p>
              <p
                className="line-clamp-1 text-xs leading-4 text-white/60"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TestimonialsSection3D() {
  return (
    <section
      className="relative w-full overflow-hidden py-16"
      style={{ backgroundColor: "#EFE9DE", fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── Heading ── */}
      <div
        className="relative z-10 flex flex-col items-center gap-2 px-4"
        style={{ marginBottom: "48px" }}
      >
        <h2 className="text-center font-serif text-4xl leading-tight font-bold bg-linear-to-r from-brand-green to-brand-blue bg-clip-text text-transparent sm:text-5xl">
          What Our Students Say!
        </h2>
        <p
          className="max-w-xl text-center text-sm leading-5 text-muted"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Hear from our happy students! See how we&apos;ve helped them achieve
          their goals and create lasting impact.
        </p>
      </div>

      {/* ── 3D Carousel ── */}
      {/* Card height is reduced here for a more compact testimonial card. */}
      {/* Direction buttons sit below the carousel with breathing room. */}
      <ThreeDCarousel
        items={testimonials}
        getItemKey={(testimonial) => testimonial.id}
        renderItem={(testimonial) => (
          <TestimonialCard testimonial={testimonial} />
        )}
        cardWidth={400}
        cardHeight={360}
        controlsPosition="bottom"
        controlsClassName="mt-12"
        regionLabel="Student testimonials"
        getSlideLabel={(testimonial, index, total) =>
          `${testimonial.name}, slide ${index + 1} of ${total}`
        }
      />
    </section>
  );
}
