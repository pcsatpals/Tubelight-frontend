"use client"
import { BookOpen, Code, Footprints, LogIn } from 'lucide-react';
import SectionHeading from './common/section-heading';

const howItWorksData = [
    {
        title: "Explore Courses",
        description:
            "Browse structured video courses designed to guide you step-by-step through practical skills and real-world concepts.",
        content: (
            <div className="shadow-lg shadow-white/10 flex relative h-full w-full flex-col bg-[url(/explore.avif)] border border-[#222] items-center justify-center gap-2 text-white bg-no-repeat overflow-hidden rounded-3xl bg-center bg-cover [&_svg]:z-10 [&_svg]:relative">
                <div className="absolute bg-black/80 w-full h-full top-0 right-0 left-0 z-0" />
                <BookOpen size={40} />
                <span className="text-sm uppercase tracking-wide relative z-10">
                    Explore
                </span>
            </div>
        ),
    },
    {
        title: "Start Watching",
        description:
            "Sign in to access a personalized video learning experience with structured lessons, guided explanations, and seamless progress tracking.",
        content: (
            <div className="shadow-lg shadow-white/10 flex relative h-full w-full flex-col border border-[#222] bg-[url(/learn.avif)] items-center justify-center gap-2 text-white bg-no-repeat overflow-hidden rounded-3xl bg-center bg-cover [&_svg]:z-10 [&_svg]:relative">
                <div className="absolute bg-black/80 w-full h-full top-0 right-0 left-0 z-0" />
                <LogIn size={40} />
                <span className="text-sm uppercase tracking-wide relative z-10">
                    Learn
                </span>
            </div>
        ),
    },
    {
        title: "Practice & Build",
        description:
            "Apply what you learn by building real-world projects and strengthening your practical understanding through hands-on coding.",
        content: (
            <div className="shadow-lg shadow-white/10 flex relative h-full w-full flex-col border border-[#222] bg-[url(/code.avif)] items-center justify-center gap-2 text-white bg-no-repeat overflow-hidden rounded-3xl bg-center bg-cover [&_svg]:z-10 [&_svg]:relative">
                <div className="absolute bg-black/80 w-full h-full top-0 right-0 left-0 z-0" />
                <Code size={40} />
                <span className="text-sm uppercase tracking-wide relative z-10">
                    Build
                </span>
            </div>
        ),
    },
];


const HowItWorks = () => {
    return (
        <section
            className="flex flex-col gap-4 w-full items-center"
        >
            <SectionHeadingContent />
            <div
                className={`w-full transition-all  flex flex-col gap-5 md:max-w-360 mx-auto w-full xl:p-10 p-6`}
            >
                {howItWorksData.map((item, index) => (
                    <div key={index} className='flex xl:flex-row flex-col gap-10 justify-between sticky top-[100px] glass-card p-5 sm:p-10 rounded-3xl  gap-2 h-[calc(100vh-100px)] min-h-fit md:max-h-[700px] w-full'>
                        <div className='flex flex-col gap-2 min-w-1/2 my-auto'>
                            <h3 className='text-2xl xl:text-3xl font-semibold text-muted-foreground'>Step {index + 1}</h3>
                            <h3 className='xl:text-4xl text-3xl font-semibold'>{item.title}</h3>
                            <p className='text-sm text-muted-foreground'>{item.description}</p>
                        </div>
                        <div className='w-full h-[200px] [&_svg]:transition-all hover:[&_svg]:scale-120  sm:h-[600px] max-h-full'>
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

const SectionHeadingContent = () => (
    <SectionHeading section={{
        icon: Footprints,
        sectionName: "How it works",
        id: "steps"
    }}
        title="Simple. Focused. Powerful."
        description='Getting started with TubeLight takes just a few steps. <br /> Choose a book, start a lesson, and begin building real skills.'
    />
)

export default HowItWorks
