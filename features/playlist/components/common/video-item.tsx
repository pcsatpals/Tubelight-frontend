import { Video } from "@/features/dashboard/hooks/use-infinite-videos";
import VideoDialog from "@/features/dashboard/components/common/video-dialog";
import Image from "next/image";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";

interface VideoItemProps {
    video: Video;
    index: number;
    ownerUsername?: string;
    currentUsername?: string;
}

const VideoItem = ({ video, index, ownerUsername, currentUsername }: VideoItemProps) => {
    return (
        <div key={video._id}>
            <VideoDialog
                video={video}
                trggerButton={
                    <div className="flex sm:gap-4 gap-2 hover:bg-black/30 rounded-2xl p-3 xl:p-4 items-center w-full">
                        <p className="text-muted-foreground text-sm">
                            {index + 1}
                        </p>
                        <Image
                            src={video.thumbnail}
                            alt={video.title || "video thumbnail"}
                            width={800}
                            height={800}
                            className="h-[100px] w-[180px] shrink-0 object-cover transition-transform duration-300 rounded shadow-sm"
                        />
                        <div className="flex flex-col min-h-full h-[100px] grow">
                            <h3 className="text-white font-semibold text-white flex items-center sm:text-xl text-left">
                                {video.title}
                            </h3>
                            <div className="text-slate-400 sm:items-center sm:text-xs flex gap-1">
                                <Link
                                    href={currentUsername === ownerUsername ? `/profile` : `/profile/${ownerUsername}`}
                                    className="text-slate-400 text-[10px] sm:text-sm my-1 hover:text-white transition-colors">
                                    {ownerUsername}
                                </Link>
                                <span className="before:content-['•'] before:mr-1 hidden sm:block">
                                    {video.views} views
                                </span>
                                <span className="before:content-['•'] before:mr-1 hidden sm:block">
                                    {new Date(video.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                        <EllipsisVertical />
                    </div>
                }
            />
        </div>
    );
};

export default VideoItem;
