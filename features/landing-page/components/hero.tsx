import BlurText from '@/components/animation/BlurText'
import LightPillar from '@/components/animation/LightPillar'
import StarBorder from '@/components/animation/StarBorder'
import { TrainTrack } from 'lucide-react'
import SectionButton from './common/section-button'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className='relative h-full xl:min-h-150 lg:min-h-160 sm:min-h-137.5 min-h-125 shrink-0 flex items-center justify-center font-figtree xl:-mt-26 sm:-mt-28'>
      {/* Lighting Canvas */}
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

      {/* Hero Content */}
      <HeroSectionContent />
      {/* A bounce Button  */}
      <BounceButton />
      {/* A div to mixup the hero with the feature section */}
      <div className='absolute bg-black shrink-0  bottom-0 translate-y-1/2 h-25 blur-3xl w-full left-0 right-0' />
    </section>
  )
}



const HeroSectionContent = () => (
  <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center text-center max-w-screen w-full ">
    <SectionButton href='' id="home" className='md:text-base text-sm'>
      <TrainTrack />
      Introducing Tubelight
    </SectionButton>
    <BlurText
      text="Stream Smarter. Learn Faster. Enjoy More"
      delay={50}
      animateBy="words"
      direction="top"
      className="lg:text-6xl md:text-4xl text-3xl mb-2 md:max-w-[55%] lg:max-w-[60%] justify-center font-figtree font-extrabold"
    />
    <BlurText
      text="Discover high-quality videos crafted for you."
      delay={5}
      animateBy="words"
      direction="top"
      className="md:text-xl font-base text-muted-foreground font-figtree font-medium sm:max-w-full max-w-[80%] flex justify-center"
    />
    <StarBorder
      className="h-12 mt-4"
      color="cyan"
      speed="5s"
    >
      <div className="w-full h-full flex items-center">
        Get Started
      </div>
    </StarBorder>
  </div>
)



const BounceButton = () => (
  <Link href="#discover" className='absolute sm:bottom-[5%] bottom-0 flex flex-col items-center gap-2 hover:[&_p]:underline'>
    <div
      className='sm:h-16 h-12 border border-[#8b21b149] sm:w-8 w-6  rounded-full backdrop-blur-2xl bg-linear-to-b from-[#3004312a] via-[#4a056f30] via-60% lg:to-[#3408397c] md:to-[#18071b] to-[#0c020f] overflow-hidden'
    >
      <div className='w-full h-full  backdrop-blur-2xl flex justify-center p-2.5 items-end'>
        <div className="sm:h-4 h-2 w-1.25 bg-white rounded-full animate-bounce"></div>
      </div>
    </div>
    <p className='font-light text-[#611d7a92] relative z-20 text-sm'>Scroll into view</p>
  </Link>
)

export default HeroSection