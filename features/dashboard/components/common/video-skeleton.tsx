// features/videos/components/common/VideoSkeleton.tsx
export const VideoSkeleton = () => {
    return (
        <div className="flex flex-col gap-3 w-full animate-pulse">
            {/* Thumbnail Skeleton */}
            <div className="aspect-video w-full bg-slate-700 rounded-xl" />

            <div className="flex gap-3">
                {/* Avatar Skeleton */}
                <div className="h-9 w-9 rounded-full bg-slate-700 shrink-0" />

                <div className="flex flex-col gap-2 w-full">
                    {/* Title Skeleton */}
                    <div className="h-4 w-[90%] bg-slate-700 rounded" />
                    {/* Metadata Skeleton */}
                    <div className="h-3 w-[60%] bg-slate-700 rounded" />
                </div>
            </div>
        </div>
    );
};