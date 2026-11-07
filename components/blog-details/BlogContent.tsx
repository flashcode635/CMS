import Image from "next/image";
import { CheckSquare } from "lucide-react";
import { ReactNode } from "react";

const imgSection1A =
   "/countries/russia/chhattisgarh.webp";
const imgSection1B =
   "/countries/russia/delhi.webp";
const imgSection1C =
   "/countries/russia/delhi.webp";
const imgSection1D =
   "/countries/russia/chhattisgarh.webp";
const imgSection1E =
   "/countries/russia/delhi.webp";
const imgSection1F =
   "/countries/russia/chhattisgarh.webp";
const imgBig =
   "/countries/russia/chhattisgarh.webp";
const imgPortrait1 =
   "/countries/russia/chhattisgarh.webp";
const imgPortrait2 =
   "/countries/russia/chhattisgarh.webp";
const imgPortrait3 =
  "/countries/russia/chhattisgarh.webp";

export interface BlogContentProps {
  children?: ReactNode;
}

export default function BlogContent({ children }: BlogContentProps) {
  if (children) {
    return (
      <article
        className="w-full max-w-[225] text-[#12211C]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {children}
      </article>
    );
  }

  return (
    <article
      className="w-full max-w-[1225] text-[#12211C]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <p className="text-4.5 sm:text-[20px] font-normal leading-normal mb-14">
        Embark on a transformative journey with our comprehensive guide to
        studying abroad. Discover top destinations, application tips, and
        cultural insights for a fulfilling international education. Your
        adventure awaits!
      </p>

      <section id="visa-requirements" className="mb-16">
        <div className="h-px bg-[#E4DDD0] mb-14" />

        <h2
          className="text-4xl  sm:text-[40px] font-bold leading-tight tracking-normal mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Visa Requirements and Application Tips
        </h2>

        <p className="text-4.5 font-normal leading-normal mb-8">
          Choosing the Right Program: Factors to Consider. Explore your academic
          interests and career goals to find the perfect fit. Research program
          rankings, faculty expertise, and curriculum to make an informed
          decision.
        </p>

        <div className="h-px bg-[#E4DDD0] mb-8" />

        <div className="flex gap-6 sm:gap-12 mb-8">
          <CheckSquare
            className="flex-none w-11.5 h-11.5 text-brand-royal mt-1"
            aria-hidden
          />
          <div className="flex flex-col gap-4">
            <p className="text-[22px] sm:text-[26px] font-semibold leading-normal text-black">
              Learn about the local culture, customs, and traditions. Respect
              diversity and embrace new experiences. Connect with locals and
              fellow international students to build a supportive community.
              Stay open-minded and adapt to new environments.
            </p>
            <p
              className="font-bold text-4.5 text-[#7A857E] text-center"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Cultural Immersion
            </p>
          </div>
        </div>

        <div className="text-4.5 font-normal leading-normal flex flex-col gap-6">
          <p>
            Pack essential items, such as clothing, toiletries, and medications.
            Learn basic phrases in the local language. Arrive early to settle in
            and explore your surroundings. Attend orientation programs and
            connect with resources for international students.
          </p>
          <p>
            Stay connected with family and friends back home. Share your
            experiences and seek support when needed. Practice self-care and
            maintain a healthy lifestyle. Explore your interests and hobbies to
            enrich your study abroad experience.
          </p>
          <p>
            Network with professionals in your field and attend career fairs.
            Seek internships or volunteer opportunities to gain practical
            experience. Tailor your resume and cover letter to highlight your
            international experience.
          </p>
          <p>
            Reflect on your experiences and document your achievements. Share
            your story with others and inspire them to study abroad. Stay
            connected with your international network and continue to grow
            personally and professionally.
          </p>
          <p>
            Plan your return and prepare for reverse culture shock. Maintain
            relationships with international friends and colleagues. Seek
            opportunities to apply your international experience in your future
            endeavors.
          </p>
        </div>
      </section>

      <section id="top-destinations" className="mb-16">
        <h2
          className="text-4xl  sm:text-[40px] font-bold leading-tight tracking-normal mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Accommodation Options for Students Abroad
        </h2>

        <p className="text-4.5 font-normal leading-normal mb-8">
          Immerse yourself in a new culture and broaden your horizons. Develop
          valuable skills, such as adaptability, communication, and
          problem-solving. Gain a global perspective and enhance your career
          prospects.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative w-full h-60 sm:h-75 lg:h-95 overflow-hidden rounded-md">
              <Image
                src={imgSection1A}
                alt="Accommodation option 1"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div className="relative w-full h-60 sm:h-75 lg:h-95 overflow-hidden rounded-md">
              <Image
                src={imgSection1B}
                alt="Accommodation option 2"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[3fr_1.5fr] gap-4">
            <div className="relative w-full h-60 sm:h-95 overflow-hidden rounded-md">
              <Image
                src={imgSection1C}
                alt="Student accommodation abroad"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 60vw"
                unoptimized
              />
            </div>
            <div className="relative w-full h-60 sm:h-95 overflow-hidden rounded-md">
              <Image
                src={imgSection1D}
                alt="Campus housing"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 30vw"
                unoptimized
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_3fr] gap-4">
            <div className="relative w-full h-60 sm:h-95 overflow-hidden rounded-md">
              <Image
                src={imgSection1E}
                alt="Off-campus housing"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 30vw"
                unoptimized
              />
            </div>
            <div className="relative w-full h-60 sm:h-95 overflow-hidden rounded-md">
              <Image
                src={imgSection1F}
                alt="Homestay option"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 60vw"
                unoptimized
              />
            </div>
          </div>
        </div>

        <p className="text-4.5 font-normal leading-normal mb-6">
          Learn about the local culture, customs, and traditions. Respect
          diversity and embrace new experiences. Connect with locals and fellow
          international students to build a supportive community. Stay
          open-minded and adapt to new environments.
        </p>

        <ul className="flex flex-col gap-2 mb-6" aria-label="Key takeaways">
          {[
            "Career Development and Networking Opportunities.",
            "Reflect on Your Experiences and Share Your Story",
            "Returning Home and Applying Your International Experience",
            "Stay Connected with Family and Friends Back Home.",
            "Explore Your Interests and Hobbies.",
          ].map((item) => (
            <li key={item} className="flex items-center gap-4">
              <CheckSquare
                className="flex-none w-5 h-5 text-brand-royal"
                aria-hidden
              />
              <span className="text-4.5 font-bold leading-normal">
                {item}
              </span>
            </li>
          ))}
        </ul>

        <p className="text-4.5 font-normal leading-normal">
          Learn about the local culture, customs, and traditions. Respect
          diversity and embrace new experiences. Connect with locals and fellow
          international students to build a supportive community. Stay
          open-minded and adapt to new environments.
        </p>
      </section>

      <section id="why-study-abroad" className="mb-16">
        <h2
          className="text-4xl  sm:text-[40px] font-bold leading-tight tracking-normal mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Budgeting and Financial Planning for International Studies
        </h2>

        <p className="text-4.5 font-normal leading-normal mb-8">
          Research universities and programs that align with your interests.
          Prepare transcripts, recommendation letters, and personal essays. Meet
          deadlines and submit a compelling application to increase your chances
          of acceptance.
        </p>

        <figure className="relative w-full mb-6">
          <div className="relative w-full h-105 sm:h-125 lg:h-150 overflow-hidden rounded-md">
            <Image
              src={imgBig}
              alt="Embrace Diversity and Build Connections — students studying together"
              fill
              className="object-cover"
              sizes="(max-width: 225) 100vw, 225"
              unoptimized
            />
          </div>
          <figcaption
            className="text-[#7A857E] font-bold text-4.5 text-center mt-3"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Embrace Diversity and Build Connections
          </figcaption>
        </figure>

        <p className="text-4.5 font-normal leading-normal">
          Research universities and programs that align with your interests.
          Prepare transcripts, recommendation letters, and personal essays. Meet
          deadlines and submit a compelling application to increase your chances
          of acceptance.
        </p>
      </section>

      <section id="application-process" className="mb-16">
        <h2
          className="text-4xl  sm:text-[40px] font-bold leading-tight tracking-normal mb-10"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Health and Safety Tips for Students Abroad
        </h2>

        <p className="text-4.5 font-normal leading-normal mb-8">
          Gather required documents, such as passport, acceptance letter, and
          financial statements. Complete the visa application form accurately
          and attend the interview with confidence. Seek guidance from embassy
          or consulate if needed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="relative w-full h-75 sm:h-105 overflow-hidden rounded-md">
            <Image
              src={imgPortrait1}
              alt="Student health abroad — preparation"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
              unoptimized
            />
          </div>
          <div className="relative w-full h-75 sm:h-105 overflow-hidden rounded-md">
            <Image
              src={imgPortrait2}
              alt="Student health abroad — wellness"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
              unoptimized
            />
          </div>
          <div className="relative w-full h-75 sm:h-105 overflow-hidden rounded-md">
            <Image
              src={imgPortrait3}
              alt="Student health abroad — safety resources"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 33vw"
              unoptimized
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 text-4.5 font-normal leading-normal">
          <p>
            Explore on-campus housing, off-campus apartments, and homestays.
            Consider factors like cost, location, and amenities. Read reviews
            and connect with current students to find the best option for your
            needs and preferences.
          </p>
          <p>
            Create a budget that covers tuition, accommodation, food,
            transportation, and personal expenses. Explore scholarships, grants,
            and student loans to finance your studies. Track your spending and
            make informed financial decisions.
          </p>
          <p>
            Research healthcare options and insurance requirements in your host
            country. Register with local authorities and familiarize yourself
            with emergency services. Take precautions to protect your health and
            safety while studying abroad.
          </p>
        </div>
      </section>
    </article>
  );
}
