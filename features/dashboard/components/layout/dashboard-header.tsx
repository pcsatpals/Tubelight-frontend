import { UserNav } from "./user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TopSearchBar from "./top-search-bar";

export function DashboardHeader() {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6">
            <SidebarTrigger className="md:invisible" />
            <TopSearchBar />
            <UserNav />
        </header>
    );
}