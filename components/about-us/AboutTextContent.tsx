/**
 * AboutTextContent — Fourth section of the About Us / Overview page.
 * Figma node 7:432 — two stacked text blocks with Inter ExtraBold headings
 * and Inter Light body copy.
 */

export default function AboutTextContent() {
  return (
    <section className="w-full px-6 sm:px-10 lg:px-20 xl:px-32 py-16 lg:py-24">
      <div className="max-w-300 mx-auto flex flex-col gap-12">

        {/* ── Block 1 ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[#12211C]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 800,
              fontSize:   "clamp(22px, 2.5vw, 32px)",
              lineHeight: "1.5",
            }}
          >
            How Can We Help You Achieve Your MBBS Goal?
          </h2>

          <div
            className="flex flex-col gap-4 text-[#4A554F]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize:   "clamp(15px, 1.1vw, 18px)",
              lineHeight: "1.65",
            }}
          >
            <p>
              Our goal is to provide you with comprehensive information and
              detailed insights into study patterns and the quality of education
              at leading universities in Russia. We specialize in helping
              students find the most suitable courses and universities that align
              with their interests and career aspirations. Our medical admission
              counseling services are tailored to offer each medical aspirant a
              personalized approach.
            </p>
            <p>
              Our team of highly experienced counselors and administrative staff
              is not only trained to identify and analyze your unique needs but
              also to provide ongoing support throughout the entire admission
              process, all the way to graduation. We are dedicated to ensuring
              that our students receive the guidance and resources necessary to
              achieve their academic and professional goals.
            </p>
          </div>
        </div>

        {/* ── Block 2 ─────────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-[#12211C]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontWeight: 800,
              fontSize:   "clamp(22px, 2.5vw, 32px)",
              lineHeight: "1.5",
            }}
          >
            What Makes Us the Ideal Partner for MBBS in Russia?
          </h2>

          <div
            className="flex flex-col gap-4 text-[#4A554F]"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              fontSize:   "clamp(15px, 1.1vw, 18px)",
              lineHeight: "1.65",
            }}
          >
            <p>
              Our experience and transparency make us the most trusted partner
              for pursuing an MBBS in Russia. We provide comprehensive guidance
              at every step, from selecting the right university to securing
              admission and settling into life in Russia. Our expert team ensures
              a smooth and stress-free process, helping students confidently
              chase their dream of studying medicine.
            </p>
            <p>
              With clear communication and dedicated support, we simplify the
              journey and make it reliable, ensuring that students feel secure
              and well-prepared for their medical careers. Trust us to make your
              MBBS journey smooth, dependable, and successful!
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
