"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { GlobeModel } from "./common/globe.model";
import SectionHeading from "./common/section-heading";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CTX = () => (
    <section className="flex md:flex-row flex-col justify-between items-center p-10 w-full mx-auto md:max-w-360">
        <CTASectionHeading />
        {/* <GlobeCanvas /> */}
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

const GlobeCanvas = () => (
    <section className="relative lg:h-150 h-100 md:w-1/2 w-full">
        <Canvas
            camera={{
                position: [0, 0, 8],
                fov: 45,
                near: 0.1,
                far: 100,
            }}
            className="h-full w-full"
        >
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} />

            <Suspense fallback={null}>
                <GlobeModel />
            </Suspense>

            <OrbitControls
                enableZoom={false}
                enablePan={false}
                minDistance={10}
                rotateSpeed={-1}
                autoRotate
                maxDistance={14}
            />
        </Canvas>
    </section>
);

export default CTX