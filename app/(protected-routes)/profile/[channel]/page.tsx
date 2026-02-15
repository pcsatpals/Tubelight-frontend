import { Avatar } from "@/components/ui/avatar";
import { authOptions } from "@/lib/auth";
import { AvatarImage } from "@radix-ui/react-avatar";
import axios from "axios";
import { Dot } from "lucide-react";
import { getServerSession } from "next-auth";
import ProfileContent from "@/features/my-profile/components/layout/profile-content";
import { redirect } from "next/navigation";

const BaseURL = process.env.API_BASE_URL || "";

const UserProfile = async ({
    params,
}: {
    params: Promise<{ channel: string }>;
}) => {
    const { channel } = await params;

    const session = await getServerSession(authOptions);
    if (!session?.user) redirect("/login");

    let dashboardData;

    try {
        const { data } = await axios.get(
            `${BaseURL}/v1/users/c/${channel}`,
            {
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );

        dashboardData = data?.data;
    } catch {
        redirect("/dashboard");
    }

    if (!dashboardData) redirect("/dashboard");

    if (session.user.username == dashboardData.username) redirect("/profile");

    const {
        coverImage,
        avatar,
        fullName,
        username,
        subscribersCount,
        videosDetails = [],
        playlistsDetails = [],
    } = dashboardData;

    return (
        <div className="flex flex-col py-6 xl:py-10 overflow-y-auto">
            <div className="px-3 sm:px-6 lg:px-10 pb-10 border-b">
                <div
                    className="bg-no-repeat bg-cover rounded-2xl overflow-hidden"
                    style={{ backgroundImage: `url(${coverImage || ""})` }}
                >
                    <div className="px-3 sm:px-6 lg:px-10 py-5 xl:py-10 flex gap-2 sm:gap-5 xl:gap-10 items-center h-fit w-full bg-background/80">
                        <Avatar className="h-10 w-10 lg:h-20 lg:w-20 xl:h-40 xl:w-40 shrink-0">
                            <AvatarImage
                                src={avatar || ""}
                                alt={fullName || "User"}
                                className="w-full h-full object-cover"
                            />
                        </Avatar>

                        <div className="flex flex-col gap-2">
                            <h1 className="capitalize text-2xl lg:text-3xl xl:text-4xl font-semibold">
                                {fullName}
                            </h1>

                            <p className="flex items-center text-xs sm:text-sm lg:text-base [&_svg]:size-4">
                                @{username}
                                <Dot className="text-muted-foreground" />
                                <span className="text-sm text-muted-foreground flex items-center">
                                    {subscribersCount} Learners
                                    <Dot className="text-muted-foreground" />
                                    {videosDetails.length}{" "}
                                    {videosDetails.length > 1 ? "Courses" : "Course"}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <ProfileContent
                videos={videosDetails}
                caurses={playlistsDetails}
            />
        </div>
    );
};

export default UserProfile;
