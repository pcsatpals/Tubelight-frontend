import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { Footprints, LogIn, Play, Sparkles } from 'lucide-react';
import React from 'react'
import SectionHeading from './common/section-heading';

const howItWorksData = [
    {
        title: "Explore Content",
        description:
            "Browse a curated collection of videos and discover inspiring stories from creators around the world.",
        content: (
            <div className="flex relative h-full w-full flex-col bg-[url(/htw-1.jpeg)] border border-[#222] items-center justify-center gap-2 text-white bg-no-repeat overflow-hidden rounded-3xl bg-center bg-cover [&_svg]:z-10 [&_svg]:relative"
            >
                <div className='absolute bg-black/70 w-full h-full top-0 right-0 left-0 z-0' />
                <Play size={40} />
                <span className="text-sm uppercase tracking-wide relative z-10">Discover</span>
            </div>
        ),
    },
    {
        title: "Sign In to Continue",
        description:
            "Sign in to unlock personalization, saved videos, and a seamless viewing experience across devices.",
        content: (
            <div className="flex relative h-full w-full flex-col border border-[#222] bg-[url(/htw-2.jpg)] items-center justify-center gap-2 text-white bg-no-repeat overflow-hidden rounded-3xl bg-center bg-cover [&_svg]:z-10 [&_svg]:relative"
            >
                <div className='absolute bg-black/70 w-full h-full top-0 right-0 left-0 z-0' />
                <LogIn size={40} />
                <span className="text-sm uppercase tracking-wide relative z-10">Access</span>
            </div>
        ),
    },
    {
        title: "Watch & Create",
        description:
            "Experience smooth playback and creator-friendly tools designed to help you share your ideas.",
        content: (
            <div className="flex relative h-full w-full flex-col border border-[#222] bg-[url(/htw-3.jpg)] items-center justify-center gap-2 text-white bg-no-repeat overflow-hidden rounded-3xl bg-center bg-cover [&_svg]:z-10 [&_svg]:relative"
            >
                <div className='absolute bg-black/70 w-full h-full top-0 right-0 left-0 z-0' />
                <Sparkles size={40} />
                <span className="text-sm uppercase tracking-wide relative z-10">Create</span>
            </div>
        ),
    },
];

const HowItWorks = () => {
    return (
        <section className='flex flex-col gap-4 w-full items-center'>
            <SectionHeadingContent />
            <StickyScroll content={howItWorksData} />
        </section>
    )
}

const SectionHeadingContent = () => (
    <SectionHeading section={{
        icon: Footprints,
        sectionName: "How it works",
        id: "steps"
    }}
        title="Simple. Fast. Effortless."
        description='Getting started with Tubelight takes just a few steps. <br /> No learning curve — just create, explore, and enjoy.'
    />
)

export default HowItWorks
