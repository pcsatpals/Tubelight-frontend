"use client";

import { useState } from 'react'
import { FolderOpen } from 'lucide-react';
import { Playlist } from '@/features/dashboard/hooks/use-infinite-videos';
import CaurseCard from '@/features/dashboard/components/common/caurse-card';

const CaurseGrids = ({ caurses }: { caurses: Playlist[] }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    if (caurses.length == 0) {
        return <p className='text-center py-4 font-figtree flex flex-col gap-4 items-center [&_svg]:size-10'>
            <FolderOpen />
            You have not added any Caurse
        </p>
    }
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {caurses.map((caurse: Playlist, idx: number) => (
                <CaurseCard
                    playlist={caurse}
                    key={idx}
                    hoveredIndex={hoveredIndex}
                    ix={idx}
                    showDropdown
                    setHoveredIndex={setHoveredIndex}
                />
            )
            )}
        </div>
    )
}

export default CaurseGrids
