
import Navbar from "@/components/layout/navbar";
import HeroSection from "@/features/landing-page/components/hero";


export default function Home() {
  return (
    <div className="h-screen bg-linear-to-r from-[#000012] via-[#0a010f] via-60% lg:to-[#19071b] md:to-[#18071b] to-[#0c020f] relative w-full font-figtree">
      <Navbar />
      <HeroSection />
    </div>
  );
}
