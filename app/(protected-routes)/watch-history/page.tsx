import { authOptions } from "@/lib/auth";
import axios from "axios";
import { getServerSession } from "next-auth";
import VideoGrids from "@/features/my-profile/components/common/profile/video-grids";
import { History } from "lucide-react";

const BaseURL = process.env.API_BASE_URL || "";

const WatchHistoryPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return <div className="p-10 text-center">Please log in to view your watch history.</div>;
    }

    let watchHistory = [];
    try {
        const response = await axios.get(`${BaseURL}/v1/users/history`, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        console.log(response.data);
        watchHistory = response.data.data;
    } catch (error) {
        console.error("Error fetching watch history:", error);
    }

    return (
        <div className="flex flex-col py-6 xl:py-10 overflow-y-auto px-3 sm:px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <History className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Watch History</h1>
                    <p className="text-sm text-muted-foreground">Keep track of the videos you've watched.</p>
                </div>
            </div>

            <div className="mt-4">
                {watchHistory.length > 0 ? (
                    <VideoGrids videos={watchHistory} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-background/50 rounded-3xl border border-dashed border-muted-foreground/20">
                        <History className="w-16 h-16 text-muted-foreground/30 mb-4" />
                        <h2 className="text-xl font-semibold text-muted-foreground">No watch history found</h2>
                        <p className="text-muted-foreground/60 text-center max-w-md mt-2">
                            Videos you watch will appear here. Start exploring and learning!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WatchHistoryPage;
