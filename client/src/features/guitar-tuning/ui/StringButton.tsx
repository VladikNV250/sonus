import React from 'react'

import type { Pitch } from '@/entities/pitch'
import { cn } from '@/shared/lib'

interface Props {
    pitch: Pitch
    selectedString: number | null
    stringNumber: number
    onSelect: () => void
    position: {
        top: string
        left?: string
        right?: string
    }
}

export const StringButton = ({
    pitch,
    selectedString,
    stringNumber,
    onSelect,
    position,
}: Props) => {
    const isActive = stringNumber === selectedString

    return (
        <button
            onClick={onSelect}
            className={cn(
                'absolute flex items-center justify-center w-[52px] h-[52px] rounded-full border-[2.5px] transition-all duration-300 bg-neutral-900/90 backdrop-blur-md cursor-pointer',
                isActive
                    ? 'border-amber-400 text-amber-400 scale-[1.15] shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                    : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white',
            )}
            style={position}
        >
            <span className="font-bold text-lg">{pitch.note}</span>
            <span className="text-[10px] ml-0.5 mt-2 opacity-60 font-semibold">{pitch.octave}</span>
        </button>
    )
}
