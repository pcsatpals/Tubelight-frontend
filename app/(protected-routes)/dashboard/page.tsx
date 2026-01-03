import { DashboardHeader } from '@/features/dashboard/components/layout/dashboard-header'
import { VideoGrid } from '@/features/dashboard/components/layout/video-grid'

const Dashboard = () => {
    return (
        <>
            <DashboardHeader />
            <div className="p-4 overflow-auto ">
                <VideoGrid />
            </div>
        </>
    )
}

export default Dashboard
