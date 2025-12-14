"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type StickyScrollItem = {
    title: string;
    description: string;
    content?: React.ReactNode;
};

type StickyScrollProps = {
    content: StickyScrollItem[];
    contentClassName?: string;
};

export const StickyScroll: React.FC<StickyScrollProps> = ({
    content,
    contentClassName,
}) => {
    const [activeCard, setActiveCard] = useState<number>(0);
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ["start start", "end start"],
    });

    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);

        const closestBreakpointIndex = cardsBreakpoints.reduce<number>(
            (closestIndex, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                const closestDistance = Math.abs(
                    latest - cardsBreakpoints[closestIndex],
                );
                return distance < closestDistance ? index : closestIndex;
            },
            0,
        );

        setActiveCard(closestBreakpointIndex);
    });

    const linearGradients: string[] = [
        "linear-gradient(to bottom right, #a77ae1, #1e063d)",
        "linear-gradient(to bottom right, #ec4899, #6366f1)",
        "linear-gradient(to bottom right, #f97316, #eab308)",
    ];

    // ✅ Derived value — NO state, NO effect
    const backgroundGradient =
        linearGradients[activeCard % linearGradients.length];

    return (
        <motion.div
            ref={ref}
            data-aos="fade"
            className="relative flex sm:h-screen h-fit  justify-center w-full overflow-y-auto no-scrollbar rounded-md p-10"
        >
            <div className="relative flex items-start px-4 w-full max-w-3xl h-full">
                <div className="w-full h-full">
                    {content.map((item, index) => (
                        <div key={`${item.title}-${index}`} className="h-full my-auto shrink-0 sm:py-20 py-6 ">
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className=" mb-3 max-w-sm text-lg text-slate-300 max-sm:opacity-100!"
                            >
                                Step {index + 1}
                            </motion.p>
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="sm:text-3xl text-2xl  font-bold text-slate-100  max-sm:opacity-100!"
                            >
                                {item.title}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="sm:mt-8 mt-4 sm:text-base text-sm max-w-sm text-slate-300  max-sm:opacity-100!"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className={cn(
                    "sm:block sm:sticky hidden xl:top-[calc(50%-15rem)] lg:top-[calc(50%-12.5rem)] md:top-[calc(50%-10rem)] xl:h-120 lg:h-100 h-80 xl:w-100 w-120 overflow-visible rounded-2xl shadow-2xl ",
                    contentClassName,
                )}
            >
                <div
                    style={{ background: backgroundGradient }}
                    className="blur-3xl h-full w-full" />
                <div
                    style={{ background: backgroundGradient }}
                    className="blur-none absolute z-20 w-full h-full top-0 left-0 rounded-3xl">
                    {content[activeCard]?.content ?? null}
                </div>
            </div>
        </motion.div>
    );
};
