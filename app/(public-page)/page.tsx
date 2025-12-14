
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import CTX from "@/features/landing-page/components/cta";
import DiscoverSection from "@/features/landing-page/components/discover";
import HeroSection from "@/features/landing-page/components/hero";
import HowItWorks from "@/features/landing-page/components/how-it-works";


export default function Home() {
  return (
    <main className="bg-[black] min-h-screen backdrop-blur-2xl relative w-full font-figtree flex flex-col gap-4">
      <Navbar />
      <HeroSection />
      <DiscoverSection />
      <HowItWorks />
      <CTX />
      <Footer />
    </main>
  );
}
