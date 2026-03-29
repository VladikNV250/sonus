import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/shared/lib'

import { type GlassPanelVariants, glassPanelVariants } from './variants'

export interface GlassPanelProps extends HTMLAttributes<HTMLDivElement>, GlassPanelVariants {}

export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
    ({ className, intensity, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(glassPanelVariants({ intensity, className }))}
                {...props}
            />
        )
    },
)
GlassPanel.displayName = 'GlassPanel'
