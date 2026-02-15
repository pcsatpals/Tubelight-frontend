import { Video } from "@/features/dashboard/hooks/use-infinite-videos";
import VideoItem from "../common/video-item";

interface PlaylistVideoListProps {
    videos: Video[];
    ownerUsername?: string;
    currentUsername?: string;
}

const PlaylistVideoList = ({ videos, ownerUsername, currentUsername }: PlaylistVideoListProps) => {
    return (
        <div className="grow flex flex-col gap-4 py-4">
            {videos.map((video: Video, ix: number) => (
                <VideoItem
                    key={video._id}
                    video={video}
                    index={ix}
                    ownerUsername={ownerUsername}
                    currentUsername={currentUsername}
                />
            ))}
        </div>
    );
};

export default PlaylistVideoList;
