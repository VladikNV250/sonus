import { type FC } from 'react'

import { type Note, NOTES, OCTAVES, type Pitch } from '@/entities/pitch'

import type { StringLabel } from '../model'

interface Props {
    string: Pitch
    stringLabel: StringLabel
    updatePitch: (stringLabel: StringLabel, pitch: Partial<Pitch>) => void
}

export const StringPitchControl: FC<Props> = ({ string, stringLabel, updatePitch }) => {
    return (
        <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-500/50 dark:text-white/35 w-6 text-right">
                {stringLabel}
            </span>

            <select
                value={string.note}
                onChange={(e) =>
                    updatePitch(stringLabel, {
                        note: e.target.value as Note,
                    })
                }
                className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2.5 rounded-xl text-neutral-900 dark:text-white text-sm outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors"
            >
                {NOTES.map((n) => (
                    <option key={n} value={n}>
                        {n}
                    </option>
                ))}
            </select>

            <select
                value={string.octave}
                onChange={(e) =>
                    updatePitch(stringLabel, {
                        octave: Number(e.target.value),
                    })
                }
                className="w-20 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-2.5 rounded-xl text-neutral-900 dark:text-white text-sm outline-none focus:border-black/20 dark:focus:border-white/20 transition-colors"
            >
                {OCTAVES.map((o) => (
                    <option key={o} value={o}>
                        Oct {o}
                    </option>
                ))}
            </select>
        </div>
    )
}
