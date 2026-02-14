"use client";

import { useState } from "react";
import { Playlist, Video } from "@/features/dashboard/hooks/use-infinite-videos";
import VideoGrids from "../common/profile/video-grids";
import CaurseGrids from "../common/profile/caurse-grid";


const ProfileContent = ({ videos, caurses }: { videos: Video[], caurses: Playlist[] }) => {
    const [activeTab, setActiveTab] = useState("Lesson Videos");
    return (
        <div className='px-3 sm:px-6 lg:px-10 pb-10 border-b flex flex-col gap-10 pt-4'>
            <div className="flex relative gap-4 w-fit">
                {["Caurse Videos", "Caurses"].map((tab) => {
                    return (
                        <button className="text-sm font-semibold h-10 px-2" onClick={() => setActiveTab(tab)} key={tab}>{tab}</button>
                    )
                })}
                <div
                    className="h-[1px] rounded-full absolute bg-white bottom-0 transition-all"
                    style={{
                        left: activeTab === "Caurse Videos" ? "-3%" : "65%",
                        width: activeTab === "Caurse Videos" ? "120px" : "70px"
                    }} />
            </div>
            {activeTab == "Caurse Videos" ? <VideoGrids videos={videos} /> : <CaurseGrids caurses={caurses} />}
        </div>

    )
}

export default ProfileContent