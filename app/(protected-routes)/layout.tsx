import { DashboardHeader } from "@/features/dashboard/components/layout/dashboard-header"
import { AppSidebar } from "@/features/dashboard/components/layout/sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { QueryProvider } from "@/providers/query-provider"
import { ReactNode } from "react"

export default async function Layout({ children }: { children: ReactNode }) {
    return (
        <QueryProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <main className="h-full bg-radial from-[#28114698] via-[#2a0e4d86] to-black/30">
                        <DashboardHeader />
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </QueryProvider>
    )
}