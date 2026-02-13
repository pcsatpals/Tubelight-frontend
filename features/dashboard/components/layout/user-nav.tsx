"use client"

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut, Loader2 } from "lucide-react";
import { useLogoutMutation } from "@/features/auth/hooks/use-logout";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";



export function UserNav() {
    const { data } = useSession();
    const { mutateAsync, isPending } = useLogoutMutation();

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();

        // toast.promise takes a promise and handles the 3 states: pending, success, error
        await toast.promise(
            mutateAsync(), // This returns a promise because we used mutateAsync
            {
                pending: "Logging out of your session...",
                success: "Logged out successfully! Redirecting...",
                error: "Backend logout failed, but clearing local session.",
            }
        );
    };

    if (!data) return null;

    const { user } = data;
    console.log(user)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="group">
                <button className="flex sm:gap-4 gap-1 items-center w-fit outline-hidden cursor-pointer [&_svg]:size-5 ml-auto">
                    <div className="flex items-center sm:gap-2 gap-1">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={user?.image || ""} alt={user.name || "User"} className="object-cover" />
                        </Avatar>
                        <p className="font-medium text-sm">{user.name}</p>
                    </div>
                    <ChevronDown className="transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2 w-50 bg-background" align="end">
                <DropdownMenuItem
                    onClick={handleLogout}
                    disabled={isPending}
                    className="w-full justify-between focus:bg-destructive/10 cursor-pointer"
                >
                    {isPending ? "Signing Out..." : "Sign Out"}
                    {isPending ? <Loader2 className="animate-spin h-4 w-4" /> : <LogOut className="h-4 w-4" />}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}