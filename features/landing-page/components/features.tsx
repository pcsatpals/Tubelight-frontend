"use client";

import SectionButton from './section-button'
import { ChartGantt } from 'lucide-react'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { useEffect, useRef } from 'react';

const TubeLightFeatures = () => {
    return (
        <section className='flex flex-col gap-4 w-full items-center'>
            <SectionHeadingContent />
            <FeatureSwiper />
        </section>

    )
}



const SectionHeadingContent = () => (
    <div className='flex flex-col gap-2 items-center text-center md:max-w-[60%] max-w-screen w-full mt-20 pb-6'>
        <SectionButton id="features" href='#features' className='md:text-base text-sm'>
            <ChartGantt />
            Tubelight  features
        </SectionButton>
        <p className="md:text-5xl font-base mt-2 font-figtree font-semibold">Built for creators. <br />
            Powered by simplicity.</p>
        <p className="font-base text-muted-foreground md:text-base text-sm sm:max-w-full max-w-[80%]">
            Built to support creativity at every step, <br /> Tubelight empowers creators to share their stories with confidence.
        </p>
    </div>
)


const featuresData = [
    {
        title: "Lightning Fast Performance",
        description:
            "Experience ultra-smooth interactions and instant responses powered by optimized architecture.",
        video: "/slide-1.mp4",
    },
    {
        title: "Secure by Design",
        description:
            "Built with enterprise-grade security to keep your data safe at every layer.",
        video: "/slide-3.mp4",
    },
    {
        title: "Seamless Collaboration",
        description:
            "Work together in real time with tools designed for modern, distributed teams.",
        video: "/slide-4.mp4",
    },
    {
        title: "Customizable Workflows",
        description:
            "Tailor every process to your team’s needs with flexible workflow management.",
        video: "/slide-5.mp4",
    },
    {
        title: "Advanced Analytics",
        description:
            "Gain insights with detailed reports and real-time analytics for better decisions.",
        video: "/slide-6.mp4",
    },
    {
        title: "Multi-Platform Support",
        description:
            "Access your workspace seamlessly from web, mobile, and desktop devices.",
        video: "/slide-7.mp4",
    },
    {
        title: "Intuitive UI/UX",
        description:
            "Navigate easily with a clean and intuitive interface designed for productivity.",
        video: "/slide-8.mp4",
    },
    {
        title: "Reliable Customer Support",
        description:
            "Get help whenever you need it from our responsive and knowledgeable support team.",
        video: "/slide-9.mp4",
    },
];


const FeatureSwiper = () => {
    return (
        <Swiper
            loop
            speed={1000}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            effect="coverflow"
            grabCursor
            centeredSlides
            slideToClickedSlide
            slidesPerView={3}
            watchSlidesProgress
            coverflowEffect={{
                rotate: 10,
                stretch: 10,
                depth: 200,
                modifier: 1,
                slideShadows: true,
            }}
            pagination={false}
            modules={[EffectCoverflow, Autoplay]}
            className="w-full xl:h-[600px] lg:h-[500px] md:h-[400px] sm:h-[250px] max-xs:h-[200px] h-[180px]"
        >
            {featuresData.map((slideData, i) => (
                <SwiperSlide key={i} className="h-[300px] max-w-[500px] rounded-[24px] overflow-hidden">
                    <VideoSlide slideData={slideData} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

const VideoSlide = ({ slideData }: {
    slideData: {
        title: string;
        description: string;
        video: string;
    }
}) => {
    const { isActive } = useSwiperSlide();
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isActive) {
            video.currentTime = 0;
            video.play().catch(() => { });
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isActive]);

    return (
        <div className='relative h-full w-full'>
            <video
                ref={videoRef}
                src={slideData.video}
                muted
                playsInline
                className="w-full h-full object-cover "
            />
            <div className={`bg-transparent backdrop-blur-md flex flex-col gap-2 absolute bottom-0 xl:px-8 xl:py-6 md:p-5 rounded-t-[20px] transition-all duration-1000 md:block hidden ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-lg font-semibold">{slideData.title}</p>
                <p className="text-sm text-muted-foreground">
                    {slideData.description}
                </p>
            </div>
        </div>
    );
};

export default TubeLightFeatures
