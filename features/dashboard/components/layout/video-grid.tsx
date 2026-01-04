"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteVideos } from "../../hooks/use-infinite-videos";
import { VideoSkeleton } from "../common/video-skeleton";
import { VideoCard } from "../common/video-card";
import { AnimatePresence, motion } from "motion/react";

export const VideoGrid = () => {
    const { ref, inView } = useInView();
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteVideos();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        if (inView && hasNextPage) fetchNextPage();
    }, [inView, hasNextPage, fetchNextPage]);

    if (status === "pending") {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => <VideoSkeleton key={i} />)}
            </div>
        );
    }

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data?.pages.map((page) =>
                    page.docs.map((video, idx) => (
                        <div key={video._id}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="w-full h-full relative group block"
                        >
                            <AnimatePresence>
                                {hoveredIndex === idx && (
                                    <motion.span
                                        className="absolute inset-0 h-full w-full bg-background/80 block rounded-3xl"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.15 },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.15, delay: 0.2 },
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                            <VideoCard video={video} />
                        </div>
                    ))
                )}
            </div>

            {/* Sentinel for Infinite Scroll */}
            <div ref={ref} className="h-10">
                {isFetchingNextPage && <p>Loading more...</p>}
            </div>
        </section>
    );
};