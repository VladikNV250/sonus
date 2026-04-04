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
            <span className="text-xs text-white/35 w-6 text-right">{stringLabel}</span>

            <select
                value={string.note}
                onChange={(e) =>
                    updatePitch(stringLabel, {
                        note: e.target.value as Note,
                    })
                }
                className="flex-1 bg-white/5 border border-white/10 p-2.5 rounded-xl text-white text-sm outline-none focus:border-white/20 transition-colors"
            >
                {NOTES.map((n) => (
                    <option key={n} value={n} className="bg-neutral-900">
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
                className="w-20 bg-white/5 border border-white/10 p-2.5 rounded-xl text-white text-sm outline-none focus:border-white/20 transition-colors"
            >
                {OCTAVES.map((o) => (
                    <option key={o} value={o} className="bg-neutral-900">
                        Oct {o}
                    </option>
                ))}
            </select>
        </div>
    )
}
