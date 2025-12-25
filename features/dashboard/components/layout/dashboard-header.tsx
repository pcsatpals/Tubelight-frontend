import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UserNav } from "./user-nav";

export async function DashboardHeader() {
    const session = await getServerSession(authOptions);

    return (
        <header className="flex h-16 shrink-0 items-center justify-end gap-2 px-6">
            {session?.user ? (
                <UserNav user={session.user} />
            ) : (
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
            )}
        </header>
    );
}