"use client";

import React, { useState } from 'react'
import { Video } from '../dashboard/hooks/use-infinite-videos';
import { VideoCard } from '../dashboard/components/common/video-card';

const VideoGrids = ({ videos }: { videos: Video[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video: Video, idx: number) => (
                <VideoCard
                    video={video}
                    key={idx}
                    hoveredIndex={hoveredIndex}
                    ix={idx}
                    setHoveredIndex={setHoveredIndex}
                />
            ))}
        </div>
    )
}

export default VideoGrids
