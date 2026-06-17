import { type FC } from 'react'

import { type Preset } from '../model'

interface Props {
    presets: Preset[]
    selectedPreset: Preset | null
    onSelectPreset: (presetId: Preset['id']) => void
}

export const PresetSelector: FC<Props> = ({ presets, selectedPreset, onSelectPreset }) => {
    return (
        <div className="relative w-[180px]">
            <select
                value={selectedPreset?.id ?? presets.at(0)?.id ?? ''}
                onChange={(e) => onSelectPreset(Number(e.target.value))}
                className="w-full appearance-none bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white rounded-2xl px-5 py-3 text-center text-sm font-semibold outline-none focus:bg-black/10 dark:focus:bg-white/10 transition-colors cursor-pointer"
            >
                {presets.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                        {preset.name}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500 dark:text-white/50 text-[10px]">
                ▼
            </div>
        </div>
    )
}
