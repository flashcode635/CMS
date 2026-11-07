import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col relative">{children}</main>
      <Footer />
    </>
  );
}
