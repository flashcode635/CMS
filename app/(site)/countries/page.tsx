import PageBanner from "@/components/ui/PageBanner";
import {CountryCarousal} from "@/components/countries/countryCarousal";
import { RussianUni } from "@/components/countries/russianUni";
import  CollegeCards  from "@/components/countries/collegeCards";

export default function Countries() {
    return (
        <>
            <PageBanner 
            title="Top Countries for studies in Abroad"
            subtitle="Explore the best countries for studying abroad, offering diverse cultures, world-class education, and unique experiences."
            overlayOpacity={0.9}
            backgroundImage="/bg-doctor.jpg"
            />
            <CountryCarousal/>
           <RussianUni/>
           <CollegeCards/>
        </>
    );
}