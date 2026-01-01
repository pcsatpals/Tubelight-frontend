import Image from "next/image";
import { Video } from "../../hooks/use-infinite-videos";
import { formatDuration } from "../../utils/format-duration";
import VideoDialog from "./video-dailog";

export interface VideoCardProps {
    video: Video;
}

export const VideoCard = ({ video }: VideoCardProps) => {
    return (
        <>
            <div className="flex flex-col gap-3 w-full group cursor-pointer border-8 transition-all border-transparent bg-transparent hover:bg-background/60 hover:border-background/10 pb-4 rounded-xl overflow-hidden">
                {/* Thumbnail Container */}
                <div className="relative aspect-video w-full overflow-hidden  bg-slate-800">
                    <Image
                        src={video.thumbnail}
                        alt={video.title || "video thumbnail"}
                        width={800}
                        height={800}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                        {formatDuration(video.duration)}
                    </span>
                    <VideoDialog video={video} />
                </div>

                {/* Info Section */}
                <div className="flex gap-3 px-4">
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
                    <div className="flex flex-col">
                        <h3 className="text-white font-semibold leading-snug line-clamp-2">
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

        </>
    );
};






export default VideoDialog
