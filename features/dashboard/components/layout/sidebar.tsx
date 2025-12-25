import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import Logo from "@/public/logo.svg";

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" className="bg-linear-to-b from-background/10 to-black/30">
            <SidebarHeader className="[&_svg]:size-14 py-8">
                <SidebarMenu>
                    <SidebarMenuItem className="flex flex-row items-center overflow-hidden pl-4 group-data-[collapsible=icon]:pl-0 ">
                        <Logo className="shrink-0" />
                        <div className="flex flex-col shrink-0 w-fit">
                            <p className="font-creepster italic text-2xl leading-6 -mt-1">TUBE LIGHT</p>
                            <p className="font-figtree text-sm">A video platform</p>
                        </div>
                        {/* <SidebarTrigger className="ml-auto group-data-[collapsible=icon]:hidden" /> */}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="">
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarTrigger className="mx-auto hidden w-fit group-data-[collapsible=icon]:block" />
            </SidebarFooter>
        </Sidebar>
    )
}