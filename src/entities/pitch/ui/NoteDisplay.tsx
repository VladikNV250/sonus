import type { FC } from 'react'

import type { PitchData } from '../model'
import { TuningStatusBadge } from './TuningStatusBadge'

interface Props {
    pitchData: PitchData
    isPerfect: boolean
}

export const NoteDisplay: FC<Props> = ({ pitchData, isPerfect }) => {
    return (
        <div className="flex flex-col items-center relative">
            <div className="flex items-start justify-center">
                <span className="text-[140px] font-bold leading-none tracking-tighter pr-4 bg-linear-to-b from-neutral-400 to-neutral-500 dark:from-white dark:to-white/70 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    {pitchData.note}
                </span>
                <span className="text-4xl font-semibold bg-linear-to-b from-neutral-300 to-neutral-400 dark:from-white/60 dark:to-white/30 bg-clip-text text-transparent mt-6 ml-1">
                    {pitchData.octave}
                </span>
            </div>

            <TuningStatusBadge cents={pitchData.cents} isPerfect={isPerfect} />
        </div>
    )
}
