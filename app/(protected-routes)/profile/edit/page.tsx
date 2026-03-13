import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { UserCog } from "lucide-react";
import EditProfileForm from "@/features/my-profile/components/common/profile/edit-profile-form";

const EditProfilePage = async () => {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return <div className="p-10 text-center">Please log in to edit your profile.</div>;
    }

    return (
        <div className="flex flex-col py-6 xl:py-10 overflow-y-auto px-3 sm:px-6 lg:px-10">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                    <UserCog className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <p className="text-sm text-muted-foreground">Manage your account settings and profile information.</p>
                </div>
            </div>

            <EditProfileForm user={session.user as {
                id: string;
                name: string;
                email: string;
                image: string;
                coverImage: string;
            }} />
        </div>
    );
};

export default EditProfilePage;
