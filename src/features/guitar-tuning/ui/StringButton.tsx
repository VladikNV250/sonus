import React from 'react'

import type { Pitch } from '@/entities/pitch'
import { cn } from '@/shared/lib'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

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
    const { playSound } = useAppSounds()

    return (
        <button
            onClick={() => {
                playSound('click')
                onSelect()
            }}
            className={cn(
                'absolute flex items-center justify-center w-[52px] h-[52px] rounded-full border-[2.5px] transition-all duration-300 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md cursor-pointer',
                isActive
                    ? 'border-amber-400 text-amber-400 scale-[1.15] shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                    : 'border-black/20 dark:border-white/20 text-neutral-500 dark:text-white/70 hover:border-black/40 dark:hover:border-white/40 hover:text-neutral-900 dark:hover:text-white',
            )}
            style={position}
        >
            <span className="font-bold text-lg">{pitch.note}</span>
            <span className="text-[10px] ml-0.5 mt-2 opacity-60 font-semibold">{pitch.octave}</span>
        </button>
    )
}
