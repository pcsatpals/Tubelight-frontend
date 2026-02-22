"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { VideoSkeleton } from "../common/video-skeleton";
import { useInfinitePlaylists } from "@/features/playlist/hooks/use-infinite-caurses";
import { useSearchParams } from "next/navigation";
import CaurseCard from "../common/caurse-card";

export const PlaylistGrid = () => {
    const { ref, inView } = useInView();
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfinitePlaylists({ query: query || "" });
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
    console.log(data)

    return (
        <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {data?.pages.map((page) =>
                    page.docs.map((playlist, idx) => (
                        <CaurseCard
                            playlist={playlist}
                            key={idx}
                            hoveredIndex={hoveredIndex}
                            ix={idx}
                            setHoveredIndex={setHoveredIndex}
                        />
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