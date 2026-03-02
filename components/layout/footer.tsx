import SectionHeading from '@/features/landing-page/components/common/section-heading'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Heart } from 'lucide-react'

const Footer = () => (
    <footer className='relative w-full bg-black max-w-[1920px] mx-auto h-[400px] sm:h-[500px] xl:h-[700px] '>
        {/* A blurry div */}
        <div className='absolute left-0 top-0  bg-linear-to-b from-black/100 via-black/80 to-black w-full h-full z-10' />
        <FooterContent />
    </footer>
)

export default Footer


const FooterContent = () => (
    <div className='w-full relative h-full '>
        <Image
            src={"/bg-image2.png"}
            height={600}
            width={600}
            alt="Logo"
            className="w-full h-full max-h-full object-cover"
        />
        <div className='w-full h-fit  z-10 absolute bottom-0 '>
            <div className="flex flex-col items-center md:min-w-1/2 w-full xl:px-10 px-6">
                <Image
                    src={"/logo.svg"}
                    height={600}
                    width={600}
                    alt="Logo"
                    className="lg:w-25 w-20 h-fit"
                />
                <SectionHeading
                    title="Ready to explore?"
                    description="Join Tubelight and discover stories, tools, and inspiration <br /> designed to elevate your creativity."
                    section={{
                        id: "footer"
                    }}
                    classNames={{
                        container: "mt-0 md:max-w-[80%]",
                        title: "text-nowrap",
                        description: "md:text-sm text-xs w-full"
                    }}
                    showButton={false}

                />
                <Button className="rounded-full w-fit transition-transform duration-500 hover:-translate-y-1 font-medium">Get Started</Button>
            </div>
            <div className="bg-[#1e043d7a] [&_svg]:size-4 text-xs flex gap-1 items-center justify-center h-10 font-jakarta-sans font-light w-full mt-10">
                <p className="pr-1 border-r border-white/20">© 2026</p>
                <div className="flex items-center gap-0.75 w-fit">
                    <span className="border-b border-white/20">Built</span>
                    with <Heart className="mt-px" /> by Satpal Singh
                </div>
            </div>
        </div>
    </div>
)