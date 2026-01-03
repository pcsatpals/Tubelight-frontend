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
                    <main className="h-full bg-radial from-[#010002] via-[#240a45] to-black">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </QueryProvider>
    )
}