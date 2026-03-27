import type { FC } from 'react'

import { cn } from '@/shared/lib'
import { GlassPanel } from '@/shared/ui'

import type { PitchData } from '../model'

interface Props {
    pitchData: PitchData
    isPerfect: boolean
}

export const NoteDisplay: FC<Props> = ({ pitchData, isPerfect }) => {
    return (
        <div className="flex flex-col items-center relative">
            <div className="flex items-start justify-center text-white drop-shadow-2xl">
                <span className="text-[140px] font-bold leading-none tracking-tighter">
                    {pitchData.note}
                </span>
                <span className="text-4xl font-semibold text-white/40 mt-6 ml-1">
                    {pitchData.octave}
                </span>
            </div>

            <GlassPanel
                intensity="light"
                className="px-6 py-2 mt-2 rounded-full border-none bg-white/5"
            >
                <span
                    className={cn(
                        'text-sm font-bold tracking-widest uppercase transition-colors',
                        isPerfect
                            ? 'text-green-400'
                            : pitchData.cents < 0
                              ? 'text-amber-400'
                              : 'text-red-400',
                    )}
                >
                    {isPerfect ? 'Perfect' : pitchData.cents < 0 ? 'Tune Up' : 'Tune Down'}
                </span>
            </GlassPanel>
        </div>
    )
}
