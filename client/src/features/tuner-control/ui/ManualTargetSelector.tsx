import type { ChangeEvent, FC } from 'react'

import { NOTES, type Pitch } from '@/entities/pitch'
import { cn } from '@/shared/lib'

// TODO: same situation as in StartListeningScreen, make it more smart
interface Props {
    mode: 'auto' | 'manual'
    targetPitch: Pitch
    changeTargetPitch: (event: ChangeEvent<HTMLSelectElement>, type: keyof Pitch) => void
}

export const ManualTargetSelector: FC<Props> = ({ mode, targetPitch, changeTargetPitch }) => {
    return (
        <div
            className={cn(
                'absolute bottom-[calc(100%+8px)] left-6 right-6 flex gap-2 transition-all duration-300',
                mode === 'manual'
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none',
            )}
        >
            <div className="relative flex-1">
                <select
                    value={targetPitch?.note}
                    onChange={(e) => changeTargetPitch(e, 'note')}
                    className="w-full appearance-none bg-neutral-900/90 backdrop-blur-2xl border border-white/10 text-white rounded-2xl px-3 py-3 text-center text-sm font-bold shadow-xl outline-none cursor-pointer"
                >
                    {NOTES.map((note) => (
                        <option key={note} value={note} className="bg-neutral-900 text-white">
                            {note}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-[10px]">
                    ▼
                </div>
            </div>

            <div className="relative flex-1">
                <select
                    value={targetPitch?.octave}
                    onChange={(e) => changeTargetPitch(e, 'octave')}
                    className="w-full appearance-none bg-neutral-900/90 backdrop-blur-2xl border border-white/10 text-white rounded-2xl px-3 py-3 text-center text-sm font-bold shadow-xl outline-none cursor-pointer"
                >
                    {Array.from({ length: 7 }, (_, i) => (
                        <option key={i} value={i} className="bg-neutral-900 text-white">
                            Octave {i}
                        </option>
                    ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-[10px]">
                    ▼
                </div>
            </div>
        </div>
    )
}
