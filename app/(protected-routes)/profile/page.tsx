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
    console.log(dashboardData)
    return (
        <div className='flex flex-col py-10 overflow-y-auto'
        >
            <div className='px-10 pb-10 border-b'>
                <div className='bg-no-repeat bg-cover rounded-2xl overflow-hidden' style={{
                    backgroundImage: `url(${user?.coverImage || ""})`,
                }}>
                    <div className='px-10 py-10 flex gap-10 items-center h-fit w-full bg-background/80'>
                        <Avatar className="h-40 w-40 shrink-0">
                            <AvatarImage src={user?.image || ""} alt={user.name || "User"} className='w-full h-full' />
                        </Avatar>
                        <div className='flex flex-col gap-2 '>
                            <h1 className='capitalize text-4xl font-semibold'>{user.name}</h1>
                            <p className='flex items-center [&_svg]:size-4'>@{dashboardData.username} <Dot className='text-muted-foreground' />
                                <span className='text-sm text-muted-foreground flex items-center'> {dashboardData.totalSubscribers} subscriber <Dot className='text-muted-foreground' /> {dashboardData.videosDetails.length} {dashboardData.videosDetails.length > 1 ? "videos" : "video"}</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Display user info */}
            <div className='px-10 pb-10 border-b flex flex-col gap-10 pt-4'>
                <Button className='text-xl flex gap-2 w-fit rounded-full'>
                    <Play /> Videos
                </Button>
                <VideoGrids videos={dashboardData.videosDetails as Video[]} />
            </div>
        </div>
    );
}

export default UserProfile
