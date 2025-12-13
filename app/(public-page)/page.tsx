
import Navbar from "@/components/layout/navbar";
import TubeLightFeatures from "@/features/landing-page/components/features";
import HeroSection from "@/features/landing-page/components/hero";


export default function Home() {
  return (
    <main className="bg-[black] min-h-screen backdrop-blur-2xl relative w-full font-figtree flex flex-col gap-4">
      <Navbar />
      <HeroSection />
      <TubeLightFeatures />
    </main>
  );
}
