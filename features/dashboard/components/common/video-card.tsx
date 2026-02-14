import Image from "next/image";
import { Video } from "../../hooks/use-infinite-videos";
import { formatDuration } from "../../utils/format-duration";
import { AnimatePresence, motion } from "motion/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, EllipsisVertical, Trash2 } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteVideo } from "../../services/delete-video";
import VideoDialog from "./video-dialog";



export interface VideoCardProps {
    video: Video;
    setHoveredIndex: (ix: null | number) => void;
    ix: number;
    hoveredIndex: number | null;
    showDeleteDropdown?: boolean;
}

export const VideoCard = ({ video, setHoveredIndex, hoveredIndex, ix, showDeleteDropdown = false }: VideoCardProps) => {
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
                {showDeleteDropdown && <DeleteVideoDropdown videoId={video._id} />}

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
                                {new Date(video.createdAt).toLocaleDateString("en-IN", {
                                    timeZone: "UTC",
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const DeleteVideoDropdown = ({ videoId }: { videoId: string }) => {
    const deleteVideoMutation = useMutation({
        mutationFn: () => deleteVideo(videoId),
    });

    const handleDelete = () => {
        toast.promise(deleteVideoMutation.mutateAsync(), {
            error: "Failed to delete Video",
            pending: "Deleting video...",
            success: {
                render: function () {
                    window.location.reload();
                    return "Video deleted successfully";
                },
                icon: Check
            },
        });
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="absolute top-4 right-4 z-10">
                <button className="flex sm:gap-4 gap-1 items-center w-fit outline-hidden cursor-pointer [&_svg]:size-5 ml-auto">
                    <EllipsisVertical />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-30 bg-background" align="end">
                <DropdownMenuItem
                    className="w-full justify-between focus:bg-destructive/10 cursor-pointer"
                    onClick={handleDelete}
                >
                    Delete
                    <Trash2 className="h-4 w-4" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default VideoCard
