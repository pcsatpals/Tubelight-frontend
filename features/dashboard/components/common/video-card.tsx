import Image from "next/image";
import { Video } from "../../hooks/use-infinite-videos";
import { formatDuration } from "../../utils/format-duration";
import VideoDialog from "./video-dialog";
import { AnimatePresence, motion } from "motion/react";

export interface VideoCardProps {
    video: Video;
    setHoveredIndex: (ix: null | number) => void;
    ix: number;
    hoveredIndex: number | null
}

export const VideoCard = ({ video, setHoveredIndex, hoveredIndex, ix }: VideoCardProps) => {
    return (
        <div key={video._id}
            onMouseEnter={() => setHoveredIndex(ix)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="w-full h-full relative group block"
        >
            <AnimatePresence>
                {hoveredIndex === ix && (
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
            <div className="flex flex-col gap-3 w-full h-full cursor-pointer p-2 transition-all bg-transparent pb-4 rounded-xl overflow-hidden relative z-20">
                {/* Thumbnail Container */}
                <div className="relative aspect-video flex w-full overflow-hidden  bg-slate-800 rounded-xl">
                    <Image
                        src={video.thumbnail}
                        alt={video.title || "video thumbnail"}
                        width={800}
                        height={800}
                        className="h-full w-full shrink-0 object-cover transition-transform duration-300 "
                    />
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                        {formatDuration(video.duration)}
                    </span>
                    <VideoDialog video={video as Video} />
                </div>

                {/* Info Section */}
                <div className="flex gap-3 px-4 grow">
                    {/* Channel Avatar */}
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-700">
                        <Image
                            width={400}
                            height={400}
                            src={video.channel?.avatar || "/default-avatar.png"}
                            alt={video.channel?.username}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Text Details */}
                    <div className="flex flex-col grow">
                        <h3 className="text-white font-semibold leading-snug line-clamp-2 grow flex items-center">
                            {video.title}
                        </h3>
                        <p className="text-slate-400 text-sm my-1 hover:text-white transition-colors">
                            {video.channel?.username}
                        </p>
                        <div className="text-slate-400 text-xs flex items-center gap-1">
                            <span>{video.views} views</span>
                            <span className="before:content-['•'] before:mr-1">
                                {new Date(video.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};






export default VideoDialog
