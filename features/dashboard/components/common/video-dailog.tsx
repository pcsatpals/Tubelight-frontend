import Play from "@/public/play.svg"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useVideoById } from "../../hooks/use-get-video-by-id";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { formatTimeAgo, formatCount } from "../../utils/format-time";
import { VideoCardProps } from "./video-card";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ShareIcon from "@/public/share-icon.svg"
import VideoLikeButton from "./video-like-button";

const VideoDialog = ({ video }: VideoCardProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <DialogTriggerButton />
                </DialogTrigger>
                <DialogContent className="sm:max-w-150 max-h-[90%] min-w-[80%] overflow-y-auto no-scrollbar  border-none p-4">
                    <VideoDialogContent isOpen={isOpen} video={video} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger>
                <DialogTriggerButton />
            </DrawerTrigger>
            <DrawerContent className=" max-h-[90%] border-none p-4">
                <VideoDialogContent isOpen={isOpen} video={video} />
            </DrawerContent>
        </Drawer>
    )
};

const DialogTriggerButton = () => (
    <div className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer">
        <div className="flex size-16 items-center justify-center rounded-full bg-black/20 backdrop-blur transition duration-100 ease-linear group-hover:bg-white/40 hover:bg-white/40 scale-100">
            <Play className="fill-current" />
        </div>
    </div>
)


const VideoDialogContent = ({ video, isOpen }: VideoCardProps & { isOpen: boolean }) => {
    const { data: session } = useSession();
    // Fetch only happens when isOpen is true
    const {
        data: videoData,
        isLoading,
        isError
    } = useVideoById(video._id, session?.accessToken, isOpen);

    const videoInfo = videoData?.[0]

    if (!videoInfo) return null;

    return (
        <div className="flex flex-col  lg:flex-row gap-3 h-full overflow-y-auto ">
            <div className="flex flex-col gap-3 grow">
                <div className="sm:h-auto h-50 object-cover w-full mt-6 flex items-center justify-center">
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
                <DialogTitle className="text-xl font-bold text-foreground line-clamp-2 mb-3">{videoInfo?.title}</DialogTitle>

                {/* Channel Info and Action Buttons */}
                <div className="flex items-center gap-3 justify-between mb-3 w-full">
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
                        <p className="font-semibold text-foreground text-sm line-clamp-1">{videoInfo?.channel?.fullName}</p>
                        <p className="text-muted-foreground text-xs">{videoInfo?.channel?.subscribersCount} subscribers</p>
                    </div>

                    {/* Subscribe Button */}
                    <Button size="sm" className="ml-2 rounded-full">
                        {videoInfo?.channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                    <div className="ml-auto grid grid-cols-2 bg-black/20 rounded-full">
                        <div className="flex gap-2 items-center border-r px-3">
                            <VideoLikeButton videoId={video._id} />
                            {formatCount(videoInfo.likesCount)}
                        </div>
                        <div className="flex gap-2 items-center px-3 [&_svg]:size-6"><ShareIcon /> Share</div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col lg:w-[40%] shrink-0 sm:py-6">
                {/* Video Title and Actions */}
                <div className="pb-3 border-b border-border">


                    <div className="p-4 bg-secondary/30 overflow-y-auto">
                        {/* Metadata Row */}
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
                            <span>{formatCount(videoInfo?.views)} views</span>
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
        </div>
    )
}



export default VideoDialog