"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Logo from "@/public/logo.svg";

const NAV_ITEMS = [
    { title: "Home", href: "/dashboard", icon: Home },
    { title: "My Profile", href: "/my-profile", icon: User },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar
            collapsible="icon"
            className="bg-linear-to-b from-background/10 to-black/30 border-r-0"
        >
            {/* Header / Branding */}
            <SidebarHeader className="py-8">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-3 overflow-hidden pl-4 group-data-[collapsible=icon]:pl-0 group-data-[collapsible=icon]:justify-center">
                        <Logo className="shrink-0 size-12" />
                        <div className="flex flex-col shrink-0 transition-all duration-300 group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:w-0">
                            <p className="font-creepster italic text-2xl leading-6 -mt-1 whitespace-nowrap">
                                TUBE LIGHT
                            </p>
                            <p className="font-figtree text-sm text-muted-foreground whitespace-nowrap">
                                A video platform
                            </p>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu className="gap-2">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname.includes(item.href);

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        tooltip={item.title}
                                        className={cn(
                                            "font-semibold font-figtree px-4 h-12 text-xl transition-colors",
                                            "hover:bg-[#28114698] active:bg-destructive/20 [&>svg]:size-5.5",
                                            isActive && "bg-linear-to-br to-[#28114698]  via-[#4a227b] from-black/30 shadow-sm"
                                        )}
                                    >
                                        <Link href={item.href} className="w-full">
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            );
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}