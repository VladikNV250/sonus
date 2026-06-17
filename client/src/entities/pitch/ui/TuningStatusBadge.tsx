import React, { type FC } from 'react'

import { cn } from '@/shared/lib'
import { GlassPanel } from '@/shared/ui'

import type { PitchData } from '../model'

interface Props {
    cents: PitchData['cents'] | null
    isPerfect: boolean
}

export const TuningStatusBadge: FC<Props> = ({ cents, isPerfect }) => {
    if (cents === null) return null

    return (
        <GlassPanel
            intensity="light"
            className="px-6 py-2 mt-2 rounded-full border-none bg-black/5 dark:bg-white/5"
        >
            <span
                className={cn(
                    'text-sm font-bold tracking-widest uppercase transition-colors',
                    isPerfect
                        ? 'text-green-600 dark:text-green-400'
                        : cents < 0
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-red-500 dark:text-red-400',
                )}
            >
                {isPerfect ? 'Perfect' : cents < 0 ? 'Tune Up' : 'Tune Down'}
            </span>
        </GlassPanel>
    )
}
