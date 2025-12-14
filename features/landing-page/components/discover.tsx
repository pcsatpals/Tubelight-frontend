"use client";

import { Telescope } from 'lucide-react'
import { Swiper, SwiperSlide, useSwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import required modules
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { useEffect, useRef } from 'react';
import SectionHeading from './common/section-heading';

const TubeLightDiscover = () => (
    <section className='flex flex-col gap-4 w-full items-center'>
        <SectionHeadingContent />
        <DiscoverSwiper />
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
        className="w-full xl:h-150 lg:h-125 md:h-100 sm:h-62.5 max-xs:h-50 h-45"
    >
        {discoverData.map((slideData, i) => (
            <SwiperSlide key={i} className="h-75 max-w-125 rounded-3xl overflow-hidden">
                <VideoSlide slideData={slideData} />
            </SwiperSlide>
        ))}
    </Swiper>
);

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
        }
    }, [isActive]);

    return (
        <div className='relative h-full w-full'>
            <video
                ref={videoRef}
                src={slideData.video}
                muted
                playsInline
                preload='metadata'
                className="w-full h-full object-cover "
            />
            <div className={`bg-transparent backdrop-blur-md flex-col gap-2 absolute bottom-0 xl:px-8 xl:py-6 lg:p-5 p-3 lg:rounded-3xl rounded-2xl transition-all duration-1000 md:flex hidden ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-lg font-semibold">{slideData.title}</p>
                <p className="lg:text-sm text-xs text-muted-foreground">
                    {slideData.description}
                </p>
            </div>
        </div>
    );
};

export default TubeLightDiscover
