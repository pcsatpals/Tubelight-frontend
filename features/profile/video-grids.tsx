"use client";

import { useState } from 'react'
import { Video } from '../dashboard/hooks/use-infinite-videos';
import { VideoCard } from '../dashboard/components/common/video-card';
import { FolderOpen } from 'lucide-react';

const VideoGrids = ({ videos }: { videos: Video[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (videos.length == 0) {
        return <p className='text-center py-4 font-figtree flex flex-col gap-4 items-center [&_svg]:size-10'>
            <FolderOpen />
            You have not added any video
        </p>
    }
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
