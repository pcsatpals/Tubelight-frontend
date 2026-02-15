"use client";

import Image from "next/image";
import { Playlist } from "../../hooks/use-infinite-videos";
import { AnimatePresence, motion } from "motion/react";
import { Check, EllipsisVertical, TextAlignStart, Trash2 } from "lucide-react";
import { deletePlaylist } from "../../services/delete-playlist";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export interface PlaylistCardProps {
    playlist: Playlist;
    setHoveredIndex: (ix: null | number) => void;
    ix: number;
    hoveredIndex: number | null;
    showDropdown?: boolean
}

const CaurseCard = ({ playlist, setHoveredIndex, hoveredIndex, ix, showDropdown = false }: PlaylistCardProps) => {
    const router = useRouter();
    return (
        <div key={playlist._id}
            onMouseEnter={() => setHoveredIndex(ix)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="w-full h-full relative group block"
            onClick={() => router.push(`/profile/caurses/${playlist._id}`)}
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
                <div className="relative aspect-video max-h-[225px] flex w-full overflow-visible rounded-xl">
                    <Image
                        src={playlist.thumbnail}
                        alt={playlist.name || "playlist thumbnail"}
                        width={800}
                        height={800}
                        className="h-full w-full shrink-0 object-cover transition-transform duration-300  rounded-xl"
                    />
                    <div className="absolute -z-10 inset-0 w-[calc(100%-8px)] left-1 right-1 h-full -top-1 rounded-[20px] bg-black/60" />
                    <div className="absolute -z-20 inset-0 w-[calc(100%-16px)] left-2 right-2 h-full -top-2 rounded-[20px] bg-white/20" />
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-[3px] rounded flex items-center gap-1 [&_svg]:size-4">
                        <TextAlignStart className="text-muted-foreground mr-1" />  {playlist.videosCount} {playlist.videosCount > 1 ? " videos" : " video"}
                    </span>
                </div>
                {showDropdown && <DeleteVideoDropdown playlistId={playlist._id} />}
                <div className="flex flex-col gap-1 pl-2">
                    <p className="text-muted-foreground text-xs">View full Caurse</p>
                    <div className="flex flex-col">
                        <p className="font-semibold">{playlist.name}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DeleteVideoDropdown = ({ playlistId }: { playlistId: string }) => {
    const deleteVideoMutation = useMutation({
        mutationFn: () => deletePlaylist(playlistId),
    });

    const handleDelete = () => {
        toast.promise(deleteVideoMutation.mutateAsync(), {
            error: "Failed to delete Video",
            pending: "Deleting video...",
            success: {
                render: function () {
                    window.location.reload();
                    return "Playlist deleted successfully";
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

export default CaurseCard
