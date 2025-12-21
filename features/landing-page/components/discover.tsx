"use client";

import { Telescope } from 'lucide-react'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { memo, useEffect, useRef } from 'react';
import SectionHeading from './common/section-heading';

const TubeLightDiscover = () => (
    <section className='gap-4 w-full overflow-hidden'>
        <div className='flex flex-col  items-center lg:max-w-370 md:max-w-360 mx-auto overflow-visible'>
            <SectionHeadingContent />
            <DiscoverSwiper />
        </div>
    </section>

)



const SectionHeadingContent = () => (
    <SectionHeading section={{
        icon: Telescope,
        sectionName: "Discover Tubelight",
        id: "discover"
    }}
        title='Built for creators. <br /> Powered by simplicity.'
        description='Built to support creativity at every step, <br /> Tubelight empowers creators to share their stories with confidence.'
    />
)


const discoverData = [
    {
        title: "Lightning Fast Performance",
        description:
            "Experience ultra-smooth interactions and instant responses powered by optimized architecture.",
        video: "/slide-1.webm",
    },
    {
        title: "Secure by Design",
        description:
            "Built with enterprise-grade security to keep your data safe at every layer.",
        video: "/slide-3.webm",
    },
    {
        title: "Seamless Collaboration",
        description:
            "Work together in real time with tools designed for modern, distributed teams.",
        video: "/slide-4.webm",
    },
    {
        title: "Customizable Workflows",
        description:
            "Tailor every process to your team’s needs with flexible workflow management.",
        video: "/slide-5.webm",
    },
    {
        title: "Advanced Analytics",
        description:
            "Gain insights with detailed reports and real-time analytics for better decisions.",
        video: "/slide-6.webm",
    },
    {
        title: "Multi-Platform Support",
        description:
            "Access your workspace seamlessly from web, mobile, and desktop devices.",
        video: "/slide-7.webm",
    },
    {
        title: "Intuitive UI/UX",
        description:
            "Navigate easily with a clean and intuitive interface designed for productivity.",
        video: "/slide-8.webm",
    },
    {
        title: "Reliable Customer Support",
        description:
            "Get help whenever you need it from our responsive and knowledgeable support team.",
        video: "/slide-9.webm",
    },
];


const DiscoverSwiper = () => (
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
        coverflowEffect={{
            rotate: 10,
            stretch: 40,
            depth: 120,
            modifier: 1,
            slideShadows: false,
        }}
        pagination={false}
        modules={[EffectCoverflow, Autoplay]}
        className="w-full xl:h-150 lg:h-125 md:h-100 sm:h-62.5 max-xs:h-50 h-45 overflow-visible!"
    >
        {discoverData.map((slideData, i) => (
            <SwiperSlide key={i} className="h-full w-full rounded-3xl overflow-hidden">
                <VideoSlide slideData={slideData} />
            </SwiperSlide>
        ))}
    </Swiper>
);

const VideoSlide = memo(
    ({
        slideData,
    }: {
        slideData: {
            title: string;
            description: string;
            video: string;
        };
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
            }
        }, [isActive]);

        return (
            <div className="relative h-full w-full">
                <video
                    ref={videoRef}
                    src={slideData.video}
                    muted
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                />

                <div
                    className={`absolute bottom-0 bg-transparent backdrop-blur-md flex-col gap-2 xl:px-8 xl:py-6 lg:p-5 p-3 lg:rounded-3xl rounded-2xl transition-opacity duration-700 md:flex hidden ${isActive ? "opacity-100" : "opacity-0"}`}>
                    <p className="text-lg font-semibold">{slideData.title}</p>
                    <p className="lg:text-sm text-xs text-muted-foreground">
                        {slideData.description}
                    </p>
                </div>
            </div>
        );
    }
);

VideoSlide.displayName = "VideoSlide"

export default TubeLightDiscover
