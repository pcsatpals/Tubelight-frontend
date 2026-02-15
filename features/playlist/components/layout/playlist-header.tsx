import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Play from "@/public/play.svg";
import { Download } from "lucide-react";
import ShareIcon from "@/public/share-icon.svg";

interface CaurseOwner {
    username: string;
    avatar: string;
}

interface CaurseData {
    name: string;
    thumbnail: string;
    description: string;
    videosCount: number;
    owner?: CaurseOwner;
}

interface PlaylistHeaderProps {
    caurseData: CaurseData;
    currentUsername?: string;
}

const PlaylistHeader = ({ caurseData, currentUsername }: PlaylistHeaderProps) => {
    return (
        <div className="w-full xl:max-w-[35%] xl:p-4 relative h-fit xl:h-full rounded-3xl overflow-hidden">
            <div className="w-full h-full cursor-pointer p-4 transition-all bg-transparent pb-4 rounded-xl overflow-hidden relative z-20">
                <div className="w-full h-full relative z-10 flex flex-col lg:flex-row xl:flex-col gap-2">
                    <div className="relative aspect-video h-[170px] xl:max-h-[185px] flex w-full overflow-visible">
                        <Image
                            src={caurseData.thumbnail}
                            alt={caurseData.name || "Caurse thumbnail"}
                            width={800}
                            height={800}
                            className="h-full w-full shrink-0 object-cover transition-transform duration-300 rounded shadow-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-white font-semibold text-white flex items-center text-xl">
                            {caurseData.name}
                        </h3>
                        <div className="flex xl:flex-col gap-2">
                            <div className="flex gap-3 items-center">
                                {/* Channel Avatar */}
                                <div className="h-5 w-5 shrink-0 overflow-hidden rounded-full bg-slate-700">
                                    <Image
                                        width={400}
                                        height={400}
                                        src={caurseData.owner?.avatar || "/default-avatar.png"}
                                        alt={caurseData.owner?.username || "owner Avatar"}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <Link
                                    href={
                                        currentUsername === caurseData.owner?.username
                                            ? `/profile`
                                            : `/profile/${caurseData.owner?.username}`
                                    }
                                    className="text-slate-400 text-sm my-1 hover:text-white transition-colors"
                                >
                                    {caurseData.owner?.username}
                                </Link>
                            </div>
                            <div className="text-slate-400 text-xs flex items-center gap-1 before:content-['•'] before:mr-1 xl:before:content-none xl:before:mr-0">
                                <span>Caurse</span>
                                <span className="before:content-['•'] before:mr-1">
                                    {caurseData.videosCount} videos
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 xl:line-clamp-3">
                            {caurseData.description}
                        </p>
                        <div className="mt-2 gap-2 flex items-center justify-between">
                            <Button className="w-[140px] rounded-full">
                                <Play />
                                Start Learning
                            </Button>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center [&_svg]:size-4">
                                    <Download />
                                </button>
                                <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center [&_svg]:size-4">
                                    <ShareIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 left-0 h-full w-full bg-linear-to-b from-[#0068c930] via-[#0068c920] to-black/20 p-5 blur-lg">
                    <Image
                        src={caurseData.thumbnail}
                        alt={caurseData.name || "playlist thumbnail"}
                        width={800}
                        height={800}
                        className="h-full mt-30 w-full max-h-[155px] w-[155px] shrink-0 object-cover transition-transform duration-300 opacity-30 rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default PlaylistHeader;
