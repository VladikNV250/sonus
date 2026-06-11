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
                className="w-full appearance-none bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl px-5 py-3 text-center text-sm font-semibold outline-none focus:bg-white/10 transition-colors cursor-pointer"
            >
                {presets.map((preset) => (
                    <option key={preset.id} value={preset.id} className="bg-neutral-900 text-white">
                        {preset.name}
                    </option>
                ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-[10px]">
                ▼
            </div>
        </div>
    )
}
