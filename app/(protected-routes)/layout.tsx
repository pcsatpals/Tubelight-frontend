import { AppSidebar } from "@/features/dashboard/components/layout/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { QueryProvider } from "@/providers/query-provider"
import { ReactNode } from "react"
import { DashboardHeader } from "@/features/dashboard/components/layout/dashboard-header"

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <main className="h-full flex flex-col bg-radial from-[#010002] via-[#240a45] to-black">
                        <DashboardHeader />
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </QueryProvider>
    )
}