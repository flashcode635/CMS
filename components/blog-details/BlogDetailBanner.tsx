import Image from "next/image";

/**
 * BlogDetailBanner — static, full-bleed dark banner at the top of every blog
 * article page ("Blog Detail" / "Grow Together in Excellence"), per the approved
 * design. The per-post title lives inside the article in `PostTitleCard`, not here.
 */
export default function BlogDetailBanner() {
  return (
    <section className="relative w-full h-72 sm:h-96 overflow-hidden bg-[#072A21]" aria-label="Blog detail banner">
      <Image
        src="/bg-doctor.jpg"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center opacity-40"
      />
      {/* Dark wash + subtle bottom fade so the text reads over the photo */}
      <div className="absolute inset-0" style={{ background: "rgba(8,12,20,0.65)" }} />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.6) 100%)" }}
        aria-hidden
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
        <p
          className="uppercase font-semibold text-white/85 tracking-[3px]"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(12px, 1.1vw, 15px)" }}
        >
          My Study Hub
        </p>
        <h1
          className="m-0 font-semibold leading-tight text-white"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 6vw, 84px)",
            letterSpacing: "-0.01em",
          }}
        >
          Blog Detail
        </h1>
        <p
          className="m-0 text-white/75"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(14px, 1.15vw, 18px)" }}
        >
          Grow Together in Excellence
        </p>
      </div>
    </section>
  );
}
