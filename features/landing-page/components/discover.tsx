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
        title='Built for learners. <br /> Powered by simplicity.'
        description='Designed to support growth at every step, <br /> Tubelight empowers learners to share their knowledge with confidence.'
    />
)


const discoverData = [
    {
        title: "Structured Digital Books",
        description:
            "Organize learning into well-structured books made up of guided lessons and practical examples.",
        video: "/slide-1.webm",
    },
    {
        title: "Lesson-Based Learning",
        description:
            "Break complex topics into focused lessons designed for clarity, retention, and real-world understanding.",
        video: "/slide-2.webm",
    },
    {
        title: "Project-Driven Approach",
        description:
            "Learn by building real projects that strengthen your skills and prepare you for real-world development.",
        video: "/slide-3.webm",
    },
    {
        title: "Doubt Resolution System",
        description:
            "Ask questions, get answers, and mark doubts as resolved to keep your learning uninterrupted.",
        video: "/slide-4.webm",
    },
    {
        title: "Progress Tracking",
        description:
            "Track completed lessons, monitor learning progress, and stay consistent with structured milestones.",
        video: "/slide-5.webm",
    },
    {
        title: "Skill-Based Learning Tracks",
        description:
            "Explore curated tracks like Web Development, AI, DevOps, and more — organized for focused growth.",
        video: "/slide-6.webm",
    },
    {
        title: "Clean Learning Experience",
        description:
            "A distraction-free interface designed to keep your focus on learning and building.",
        video: "/slide-7.webm",
    },
    {
        title: "Focused Learning Experience",
        description:
            "Stay distraction-free with a clean interface designed to help you concentrate on lessons and complete projects efficiently.",
        video: "/slide-8.webm",
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
                    className={`glass-card absolute bottom-0  flex-col gap-2 xl:px-8 xl:py-6 lg:p-5 p-3 lg:rounded-3xl rounded-2xl transition-opacity duration-700 md:flex hidden ${isActive ? "opacity-100" : "opacity-0"}`}>
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
