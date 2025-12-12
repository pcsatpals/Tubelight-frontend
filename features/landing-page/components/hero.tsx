import BlurText from '@/components/animation/BlurText'
import LightPillar from '@/components/animation/LightPillar'
import StarBorder from '@/components/animation/StarBorder'
import { TrainTrack } from 'lucide-react'

const HeroSection = () => {
  return (
    <div>
      <LightPillar
        topColor="#5227ff"
        bottomColor="#ff9ffc"
        intensity={0.8}
        rotationSpeed={1}
        glowAmount={0.002}
        pillarWidth={1.6}
        pillarHeight={0.2}
        noiseIntensity={0.5}
        pillarRotation={90}
        interactive={false}
        mixBlendMode="normal"
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center text-white text-center max-w-screen w-full">
        <div className='h-12 px-6 rounded-full bg-[#ffffff0d] border border-[#ffffff0d] [&_svg]:size-4 backdrop-blur-lg flex items-center
      text-center gap-2'>
          <TrainTrack />
          Introducing Tubelight
        </div>
        <BlurText
          text="Stream Smarter. Learn Faster. Enjoy More"
          delay={50}
          animateBy="words"
          direction="top"
          className="md:text-6xl text-2xl mb-2 max-w-[60%] justify-center font-figtree font-extrabold"
        />
        <BlurText
          text="Discover high-quality videos crafted for you."
          delay={5}
          animateBy="words"
          direction="top"
          className="md:text-xl font-base text-muted-foreground font-figtree font-medium"
        />
        <StarBorder
          as="button"
          className="h-12 mt-4"
          color="cyan"
          speed="5s"
        >
          <div className="w-full h-full flex items-center">
            Get Started
          </div>
        </StarBorder>

      </div>
    </div>
  )
}

export default HeroSection
