import LightPillar from "@/components/LightPillar";
import { NavbarDemo } from "@/components/navbar";

export default function Home() {
  return (
    <div className="h-screen bg-linear-to-b from-[#1e063d] to-[#160521] relative w-full font-figtree">
      <div className="w-full min-h-[680px] overflow-hidden relative">
        <NavbarDemo />
        <LightPillar
          topColor="#5227ff"
          bottomColor="#ff9ffc"
          intensity={0.8}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={1.6}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={85}
          interactive={false}
          mixBlendMode="normal"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center text-white text-center max-w-[450px]">
          <h1 className="text-3xl font-extrabold">Stream Smarter. Learn Faster. Enjoy More</h1>
          <h2 className="text-lg font-base text-muted-foreground">Discover high-quality videos crafted for you.</h2>
          <button className="bg-white rounded-full h-10 px-6 text-foreground w-fit">Get Started</button>
        </div>
      </div>
    </div>
  );
}
