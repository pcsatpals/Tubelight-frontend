import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PlaylistHeader from "@/features/playlist/components/layout/playlist-header";
import PlaylistVideoList from "@/features/playlist/components/layout/playlist-video-list";

const BaseURL = process.env.API_BASE_URL || "";

const CaurseDetails = async ({
    params,
}: {
    params: Promise<{ caurse: string }>;
}) => {
    const { caurse } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/login");

    let caurseData;
    try {
        const { data } = await axios.get(
            `${BaseURL}/v1/playlist/${caurse}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        caurseData = data?.data;
    } catch {
        redirect("/dashboard");
    }

    if (!caurseData) redirect("/dashboard");

    return (
        <div className="flex xl:flex-row flex-col xl:gap-6 p-4 lg:p-6 xl:py-10 overflow-y-auto graw border">
            <PlaylistHeader
                caurseData={caurseData}
                currentUsername={session.user.username}
            />
            <PlaylistVideoList
                videos={caurseData.videos}
                ownerUsername={caurseData.owner?.username}
                currentUsername={session.user.username}
            />
        </div>
    );
};

export default CaurseDetails;
