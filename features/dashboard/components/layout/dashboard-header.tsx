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
            {!pathName.includes("videos") && <TopSearchBar />}
            <div className="flex lg:gap-4 gap-1 items-center">
                {!pathName.includes("videos") && <Link
                    href="/videos/create"
                    className={cn(buttonVariants(), "xl:rounded-full border h-6 w-6 xl:w-fit xl:h-8 font-semibold")}>
                    <Plus />
                    <span className="xl:block hidden"> Create </span>
                </Link>}
                <UserNav />
            </div>
        </header>
    );
}