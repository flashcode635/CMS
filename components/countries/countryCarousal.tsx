import  CurveCard  from "@/components/ui/curveCard";

import HeadingOfCard from "../ui/HeadingOfCard";
import Carousel from "@/components/ui/carousal";
export const CountryCarousal =() => {
    // ── Country data ─────────────────────────────────────────────────────────────────
const Country = [
  { name: "Russia", src: "/about-us/bengaluru.webp" },
  { name: "Canada", src: "/about-us/chennai.webp" },
  { name: "Australia", src: "/about-us/gujarat.webp" },
  { name: "Germany", src: "/about-us/gujarat.webp" },
  { name: "Japan", src: "/about-us/nagpur.webp" },
  { name: "France", src: "/about-us/indore.webp" }
];
    return (
        <>  
        <div className="w-full bg-[#F7F4EE] py-10 lg:py-20">

        <HeadingOfCard
                prefix="Top Countries for "
                title="Study/MBBS in Abroad"
                italic={true}
                type="bold"
                />

            <Carousel itemsPerSlide={4} autoPlay={true} autoPlayInterval={5000}>
                {Country.map((country, idx) => (
                    <CurveCard
                    key={`${country.name}-${idx}`}
                    src={country.src}
                    name={country.name}
                    animationDelay={idx * 60}
                    />
                ))}
            </Carousel>
        </div>
        </>
    )
}