import LightPillar from "@/components/LightPillar";
import Navbar from "@/components/navbar";
import { NavbarButton } from "@/components/ui/resizable-navbar";

export default function Home() {
  return (
    <div className="h-screen bg-linear-to-r from-[#000012] via-[#0a010f] via-60% lg:to-[#19071b] md:to-[#18071b] to-[#0c020f] relative w-full font-figtree">
      <Navbar />
      <LightPillar
        topColor="#5227ff"
        bottomColor="#ff9ffc"
        intensity={0.8}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={1.6}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={90}
        interactive={false}
        mixBlendMode="normal"
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center text-white text-center max-w-screen w-full">
        <h1 className="md:text-6xl text-2xl font-extrabold">Stream Smarter. Learn Faster. <br /> Enjoy More</h1>
        <h2 className="md:text-xl font-base text-muted-foreground">Discover high-quality videos crafted for you.</h2>
        <NavbarButton variant="primary" className="rounded-full md:mt-4 mt-2">Get Started</NavbarButton>

      </div>
    </div>
  );
}
