import { cn } from '@/lib/utils'
import React from 'react'

const SectionButton = (
    {
        className,
        children,
        ...props
    }: React.ComponentProps<"a">) => {
    return (
        <a className={cn('h-12 px-6 rounded-full bg-[#ffffff0d] border border-[#ffffff0d] [&_svg]:size-4 backdrop-blur-lg flex items-center      text-center gap-2', className)}
            {...props}>
            {children}
        </a>
    )
}

export default SectionButton
