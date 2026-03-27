import type { FC } from 'react'

import { cn } from '@/shared/lib'

import { getGlowColor } from '../lib'
import type { PitchData } from '../model'

interface Props {
    pitchData: PitchData | null
}

export const TunerBackground: FC<Props> = ({ pitchData }) => {
    return (
        <div
            className={cn(
                'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] blur-[120px] rounded-full transition-colors duration-700 pointer-events-none',
                getGlowColor(pitchData),
            )}
        />
    )
}
