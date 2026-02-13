import Play from "@/public/play.svg"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useVideoById } from "../../hooks/use-get-video-by-id";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { formatTimeAgo, formatCount } from "../../utils/format-time";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import ShareIcon from "@/public/share-icon.svg"
import VideoLikeButton from "./video-like-button";
import { VideoComments } from "./video-comments";
import { VideoSkeleton } from "./video-skeleton";
import { Video } from "../../hooks/use-infinite-videos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleSubscribeChannel } from "../../services/subscribe-user";
import { toast } from "react-toastify";

const VideoDialog = ({ video }: { video: Video }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <DialogTriggerButton />
                </DialogTrigger>
                <DialogContent className="sm:max-w-150 max-h-[90%] min-w-[80%] sm:overflow-hidden border-none p-4 pt-0 flex flex-col">
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
            <DrawerContent className=" max-h-[90%] border-none px-4 no-scrollbar">
                <VideoDialogContent isOpen={isOpen} video={video} />
            </DrawerContent>
        </Drawer>
    )
};

const DialogTriggerButton = () => (
    <div className="absolute  inset-0 flex items-center justify-center z-10 cursor-pointer">
        <div className="flex size-16 items-center justify-center rounded-full bg-black/20 backdrop-blur transition duration-100 ease-linear group-hover:bg-white/40 hover:bg-white/40 scale-100">
            <Play className="fill-current" />
        </div>
    </div>
)


const VideoDialogContent = ({ video, isOpen }: { video: Video, isOpen: boolean }) => {
    const { data: session } = useSession();
    // Fetch only happens when isOpen is true
    const {
        data: videoData,
        isLoading,
        isError
    } = useVideoById(video._id, session?.accessToken, isOpen);

    const videoInfo = videoData?.[0];

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: () => toggleSubscribeChannel(video.channel._id),

        onMutate: async () => {
            // Cancel outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ["video", video._id] });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData<Video[]>(["video", video._id]);

            // Optimistically update the cache
            queryClient.setQueryData(["video", video._id], (old: Video[]) => {
                if (!old) return old;

                // Assuming videoInfo is the first element based on your code: videoData?.[0]
                return old.map((item, index: number) => {
                    if (index === 0) {
                        const currentSubscription = item.channel.isSubscribed;
                        return {
                            ...item,
                            channel: {
                                ...item.channel,
                                isSubscribed: !currentSubscription

                            }
                        };
                    }
                    return item;
                });
            });

            return { previousData };
        },
        onError: (err, variables, context) => {
            // Rollback if the API fails
            queryClient.setQueryData(["video", video._id], context?.previousData);
            toast.error("Could not able to subscribe");
        },
        onSettled: () => {
            // Sync with server in the background
            queryClient.invalidateQueries({ queryKey: ["video", video._id] });
        },
    });

    return (
        <div className="flex flex-col  lg:flex-row gap-3 overflow-hidden overflow-y-auto no-scrollbar min-h-75">
            <div className="flex flex-col gap-3 grow">
                <div className="sm:h-auto h-50 object-cover w-full mt-6 flex items-center justify-center">
                    {isLoading ? (
                        <VideoSkeleton />
                    ) : isError ? (
                        <p className="text-destructive">Failed to load video.</p>
                    ) : (
                        <video
                            src={videoInfo?.videoFile} // URL from your backend/Cloudinary
                            controls
                            autoPlay
                            className="max-h-100 w-full h-full rounded-xl "
                            poster={video?.thumbnail}
                        >
                            Your browser does not support the video tag.
                        </video>
                    )}
                </div>
                <DialogTitle className="text-xl font-bold text-foreground line-clamp-2 mb-1">{videoInfo?.title}</DialogTitle>

                {/* Channel Info and Action Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 justify-between w-full">
                    {/* Channel Avatar */}
                    <div className="size-8 sm:size-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                            width={40}
                            height={40}
                            src={videoInfo?.channel?.avatar || "/logo.png"}
                            alt={videoInfo?.channel?.username || "avatar"}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    {/* Channel Details */}
                    <div className="hidden sm:flex flex-col ">
                        <p className="font-semibold text-foreground text-sm line-clamp-1">{videoInfo?.channel?.fullName}</p>
                        <p className="text-muted-foreground text-xs">{videoInfo?.channel?.subscribersCount} subscribers</p>
                    </div>

                    {/* Subscribe Button */}
                    <Button size="sm" className="sm:ml-2 text-xs h-7 font-medium sm:h-8 sm:text-sm rounded-full" disabled={isPending} onClick={() => {
                        mutate()
                    }}>
                        {videoInfo?.channel?.isSubscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                    <div className="ml-auto grid grid-cols-2 bg-black/20 rounded-full">
                        <div className="flex gap-2 items-center border-r px-3">
                            <VideoLikeButton
                                videoId={video._id}
                                likesCount={formatCount(videoInfo?.likesCount)}
                            />
                        </div>
                        <div className="flex gap-2 items-center px-3 text-sm sm:text-base [&_svg]:size-4 sm:[&_svg]:size-6">
                            <ShareIcon /> Share
                        </div>
                    </div>
                </div>
                <div className="p-3 bg-secondary/30">
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
            <div className="flex flex-col lg:w-[40%] shrink-0 sm:py-6 max-h-full overflow-hidden">
                {/* Video Title and Actions */}
                <p className="text-xl font-semibold pb-3 border-b">{videoInfo?.comments} Comments</p>

                <VideoComments videoId={video._id} />
            </div>
        </div>
    )
}



export default VideoDialog