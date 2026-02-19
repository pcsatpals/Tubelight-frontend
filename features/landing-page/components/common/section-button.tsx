import LiquidGlassButton from '@/components/ui/liquid-glass-button'
import { cn } from '@/lib/utils'
import React from 'react'

const SectionButton = (
    {
        className,
        children,
        ...props
    }: React.ComponentProps<"a">) => {
    return (
        <LiquidGlassButton className='rounded-full'>
            <a className={cn('h-12 px-6  [&_svg]:size-4 flex items-center text-center gap-2', className)}
                {...props}>
                {children}
            </a>
        </LiquidGlassButton>
    )
}

export default SectionButton
