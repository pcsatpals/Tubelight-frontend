import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserNav } from "./user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";

export async function DashboardHeader() {
    const session = await getServerSession(authOptions);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6">
            <SidebarTrigger className="md:hidden" />
            {session?.user ? (
                <UserNav user={session.user} />
            ) : (
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            )}
        </header>
    );
}