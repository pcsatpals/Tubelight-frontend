import SectionHeading from '@/features/landing-page/components/common/section-heading'
import Image from 'next/image'
import { Button } from '../ui/button'

const Footer = () => (
    <footer className='relative w-full bg-black mb-10 md:max-w-360 mx-auto h-full 2xl:px-0 px-10'>
        {/* A blurry div */}
        <div className='absolute left-1/2 -translate-x-1/2 bottom-2  w-[10%] xl:border-300 sm:border-200 border-150  border-transparent  border-b-blue-300 to-blue-200 blur-3xl h-60' />
        <FooterContent />
    </footer>
)

export default Footer


const FooterContent = () => (
    <div className='w-full h-full xl:p-10 p-6 bg-black/30 border border-[#222] rounded-3xl backdrop-blur-xl'>
        <div className="flex flex-col items-center md:min-w-1/2 w-full">
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
    </div>
)