"use client";

import { UserNav } from "./user-nav";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TopSearchBar from "./top-search-bar";
import { Plus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
    const pathName = usePathname()
    return (
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-6">
            <SidebarTrigger className="md:invisible" />
            <TopSearchBar />
            <div className="flex gap-4 items-center">
                {!pathName.includes("videos") && <Link
                    href="/videos/create"
                    className={cn(buttonVariants(), "rounded-full border")}>
                    <Plus />
                    Create
                </Link>}
                <UserNav />
            </div>
        </header>
    );
}