import { PlaylistGrid } from '@/features/dashboard/components/layout/playlist-grid'
import { Suspense } from 'react'

const Dashboard = () => {
    return (
        <div className="p-4 overflow-auto ">
            <Suspense fallback={<div>Loading...</div>}>
                <PlaylistGrid />
            </Suspense>
        </div>
    )
}

export default Dashboard
