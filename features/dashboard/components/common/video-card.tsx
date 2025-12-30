import Image from "next/image";
import { Video } from "../../hooks/use-infinite-videos";
import { formatDuration } from "../../utils/format-duration";
import Play from "@/public/play.svg"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useVideoById } from "../../hooks/use-get-video-by-id";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { formatTimeAgo, formatViews } from "../../utils/format-time";
interface VideoCardProps {
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




const VideoDialog = ({ video }: VideoCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    // Fetch only happens when isOpen is true
    const {
        data: videoData,
        isLoading,
        isError
    } = useVideoById(video._id, session?.accessToken, isOpen);

    const videoInfo = videoData?.[0]
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
                    <button className="flex size-16 items-center justify-center rounded-full bg-black/20 backdrop-blur transition duration-100 ease-linear group-hover:bg-white/40 hover:bg-white/40 scale-100">
                        <Play className="fill-current" />
                    </button>
                </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-150 max-h-[90%]  border-none p-4">
                <div className="h-75 object-cover w-full mt-6 flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2 text-white">
                            <Loader2 className="animate-spin size-8" />
                            <p className="text-sm">Loading video...</p>
                        </div>
                    ) : isError ? (
                        <p className="text-destructive">Failed to load video.</p>
                    ) : (
                        <video
                            src={videoInfo?.videoFile} // URL from your backend/Cloudinary
                            controls
                            autoPlay
                            className="w-full h-full rounded-xl object-cover"
                            poster={video?.thumbnail}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                {/* Optional: Video info below the player */}
                <div className="flex flex-col overflow-y-auto bg-background">
                    {/* Video Title and Actions */}
                    <div className="pb-3 border-b border-border">
                        <DialogTitle className="text-xl font-bold text-foreground line-clamp-2 mb-3">{videoInfo?.title}</DialogTitle>

                        {/* Channel Info and Action Buttons */}
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {/* Channel Avatar */}
                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                    <Image
                                        width={40}
                                        height={40}
                                        src={videoInfo?.channel?.avatar || "/logo.png"}
                                        alt={videoInfo?.channel?.username || "avatar"}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Channel Details */}
                                <div className="flex flex-col">
                                    <p className="font-semibold text-foreground text-sm">{videoInfo?.channel?.fullName}</p>
                                    <p className="text-muted-foreground text-xs">{videoInfo?.channel?.subscribersCount} subscribers</p>
                                </div>

                                {/* Subscribe Button */}
                                <Button size="sm" className="ml-2 rounded-full">
                                    {videoInfo?.channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                                </Button>
                            </div>
                        </div>

                        <div className="p-4 bg-secondary/30 overflow-y-auto">
                            {/* Metadata Row */}
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                                <span>{formatViews(videoInfo?.views)} views</span>
                                <span>•</span>
                                <span>{formatTimeAgo(videoInfo?.createdAt)}</span>
                            </div>

                            {/* Description Box */}
                            <p className="text-sm text-foreground whitespace-pre-line line-clamp-4">
                                {videoInfo?.description}
                            </p>
                        </div>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default VideoDialog
