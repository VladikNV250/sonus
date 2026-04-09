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
            <div className="flex items-start justify-center text-white drop-shadow-2xl">
                <span className="text-[140px] font-bold leading-none tracking-tighter">
                    {pitchData.note}
                </span>
                <span className="text-4xl font-semibold text-white/40 mt-6 ml-1">
                    {pitchData.octave}
                </span>
            </div>

            <TuningStatusBadge cents={pitchData.cents} isPerfect={isPerfect} />
        </div>
    )
}
