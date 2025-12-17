"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { GlobeModel } from "./common/globe.model";
import SectionHeading from "./common/section-heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as THREE from "three";

const CTX = () => (
    <section className="flex md:flex-row flex-col justify-between items-center px-10 w-full mx-auto md:max-w-360">
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
        <div className={className ?? 'relative lg:h-250 h-160 md:w-1/2 w-full'}>
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 1.2]}              // lower DPR
                gl={{
                    powerPreference: 'low-power',
                    antialias: false,         // big win on weak GPUs
                }}
            >
                {/* Basic lighting for a clean globe */}
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} />

                {/* Orbit controls but damped and non‑zoom to avoid heavy interactions */}
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableDamping
                    dampingFactor={0.08}
                    autoRotate
                    rotateSpeed={-1}
                    autoRotateSpeed={0.2}       // small, not -1
                />

                <Suspense fallback={null}>
                    <GlobeModel />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default CTX