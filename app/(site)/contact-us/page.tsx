import ContactSection from "@/components/about-us/ContactSection";
import ContactHeroBanner from "@/components/contact-us/ContactHeroBanner";

export const metadata = {
  title: "Contact Us | StudyPalace Hub",
  description:
    "Get in touch with StudyPalace Hub counselors for guidance on studying MBBS abroad. Reach us through phone, email, or visit our offices in India and Russia.",
};

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <ContactHeroBanner />
      <ContactSection />
    </div>
  );
}
