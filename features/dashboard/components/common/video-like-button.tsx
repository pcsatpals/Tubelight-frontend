import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Video } from "../../hooks/use-infinite-videos";
import { toast } from "react-toastify";
import { AnimatedThumbsUp } from "@/components/common/animated-thumbs-up";
import { toggleVideoLike } from "../../services/toggle-video-like";
import CountUp from "@/components/ui/CountUp";

const VideoLikeButton = ({ videoId, likesCount }: { videoId: string, likesCount?: string }) => {
    const queryClient = useQueryClient();
    const lastNumberSystemDigit = likesCount?.includes("K") ? "K" : likesCount?.includes("M") ? "M" : ""
    const likesInNumbers = likesCount?.includes("K") ? Number(likesCount.split("K")[0]) : likesCount?.includes("M") ? Number(likesCount.split("M")[0]) : Number(likesCount);

    const { mutate } = useMutation({
        mutationFn: () => toggleVideoLike(videoId),

        onMutate: async () => {
            // Cancel outgoing refetches so they don't overwrite our optimistic update
            await queryClient.cancelQueries({ queryKey: ["video", videoId] });

            // Snapshot the previous value
            const previousData = queryClient.getQueryData<Video[]>(["video", videoId]);

            // Optimistically update the cache
            queryClient.setQueryData(["video", videoId], (old: Video[]) => {
                if (!old) return old;

                // Assuming videoInfo is the first element based on your code: videoData?.[0]
                return old.map((item, index: number) => {
                    if (index === 0) {
                        const currentlyLiked = item.isLiked;
                        return {
                            ...item,
                            isLiked: !currentlyLiked,
                            likesCount: currentlyLiked
                                ? Math.max(0, item.likesCount - 1)
                                : item.likesCount + 1,
                        };
                    }
                    return item;
                });
            });

            return { previousData };
        },
        onError: (err, variables, context) => {
            // Rollback if the API fails
            queryClient.setQueryData(["video", videoId], context?.previousData);
            toast.error("Could not update like status");
        },
        onSettled: () => {
            // Sync with server in the background
            queryClient.invalidateQueries({ queryKey: ["video", videoId] });
        },
    });

    // Use the current cache state for the UI
    const videoData = queryClient.getQueryData<Video[]>(["video", videoId]);
    const isLiked = videoData?.[0]?.isLiked;

    return (
        <>
            <AnimatedThumbsUp
                liked={isLiked}
                onChange={() => mutate()}
                variant="compact"
            />
            <span className="flex items-center">
                <CountUp
                    from={0}
                    to={likesInNumbers}
                    separator=","
                    direction="up"
                    duration={1}
                    className="count-up-text"
                />
                {lastNumberSystemDigit}
            </span>
        </>
    );
};

export default VideoLikeButton