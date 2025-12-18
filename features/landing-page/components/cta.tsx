"use client";

import { Suspense } from "react";
import SectionHeading from "./common/section-heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ParticleGlobe } from "./common/globe.model";

const CTX = () => (
    <section className="flex my-10 pb-10 md:flex-row flex-col justify-between items-center px-10 w-full mx-auto md:max-w-360">
        <CTASectionHeading />
        <GlobeSection />

    </section>
)


const CTASectionHeading = () => (
    <div className="flex flex-col  items-center md:min-w-1/2 w-full mac">
        <Image
            src={"/logo.svg"}
            height={600}
            width={600}
            alt="Logo"
            className="lg:w-25 w-20 h-fit"
        />
        <SectionHeading
            title="Ready to explore?"
            description="Join Tubelight and discover stories, tools, and inspiration designed to elevate your creativity."
            section={{
                id: "cta"
            }}
            classNames={{
                container: "mt-0 md:max-w-[80%]",
                title: "text-nowrap",
                description: "md:text-sm text-xs w-full"
            }}
            showButton={false}

        />
        <Button className="rounded-full transition-transform duration-500 hover:-translate-y-1 font-medium">Join Now</Button>
    </div>
)

type GlobeSectionProps = {
    /** Optional height (Tailwind or plain CSS) */
    className?: string
}

export function GlobeSection({ className }: GlobeSectionProps) {
    return (
        <div className={className ?? 'relative lg:h-100 h-160 md:w-1/2 w-full'}>
            <ParticleGlobe />
        </div>
    )
}

export default CTX