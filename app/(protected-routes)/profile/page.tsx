import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Video } from '@/features/dashboard/hooks/use-infinite-videos';
import VideoGrids from '@/features/profile/video-grids';
import { authOptions } from '@/lib/auth';
import { AvatarImage } from '@radix-ui/react-avatar';
import axios from 'axios';
import { Dot } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Play from "@/public/play.svg"

const BaseURL = process.env.API_BASE_URL || ""
const UserProfile = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        // Handle unauthenticated state, e.g., redirect to login
        return <p>You must be signed in.</p>;
    }
    const { user } = session;
    const dashboardStats = await axios.get(`${BaseURL}/v1/dashboard/stats`, {
        headers: {
            Authorization: `Bearer ${session.accessToken}`
        }
    })

    const { data: dashboardData } = dashboardStats.data;

    return (
        <div className='flex flex-col py-6 xl:py-10 overflow-y-auto'
        >
            <div className='px-3 sm:px-6 lg:px-10 pb-10 border-b'>
                <div className='bg-no-repeat bg-cover rounded-2xl overflow-hidden' style={{
                    backgroundImage: `url(${user?.coverImage || ""})`,
                }}>
                    <div className='px-3 sm:px-6 lg:px-10 py-5 xl:py-10 flex gap-2 sm:gap-5 xl:gap-10 items-center h-fit w-full bg-background/80'>
                        <Avatar className="h-10 w-10 lg:h-20 lg:w-20 xl:h-40 xl:w-40 shrink-0">
                            <AvatarImage src={user?.image || ""} alt={user.name || "User"} className='w-full h-full' />
                        </Avatar>
                        <div className='flex flex-col gap-2 '>
                            <h1 className='capitalize text-2xl lg:text-3xl xl:text-4xl font-semibold'>{user.name}</h1>
                            <p className='flex items-center text-xs sm:text-sm lg:text-base [&_svg]:size-4'>@{dashboardData.username} <Dot className='text-muted-foreground' />
                                <span className='text-sm text-muted-foreground flex items-center'> {dashboardData.totalSubscribers} subscriber <Dot className='text-muted-foreground' /> {dashboardData.videosDetails.length} {dashboardData.videosDetails.length > 1 ? "videos" : "video"}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Display user info */}
            <div className='px-3 sm:px-6 lg:px-10 pb-10 border-b flex flex-col gap-10 pt-4'>
                <Button variant={"outline"} className='tex-base lg:[&_svg]:size-6 lg:text-xl flex gap-2 w-fit xl:w-35 h-10 rounded-full'>
                    <Play /> Videos
                </Button>
                <VideoGrids videos={dashboardData.videosDetails as Video[]} />
            </div>
        </div>
    );
}

export default UserProfile
