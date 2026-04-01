import { type FC } from 'react'

import { type Preset, PRESETS } from '../model'

interface Props {
    selectedPreset: Preset
    onSelectPreset: (presetId: Preset['id']) => void
}

export const PresetSelector: FC<Props> = ({ selectedPreset, onSelectPreset }) => {
    return (
        <div className="mt-6 w-full max-w-[200px] relative z-20 animate-in fade-in slide-in-from-top-4 duration-500">
            <select
                value={selectedPreset?.id || 'standard'}
                onChange={(e) => onSelectPreset(e.target.value)}
                className="w-full appearance-none bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl px-5 py-3 text-center text-sm font-semibold outline-none focus:bg-white/10 transition-colors cursor-pointer"
            >
                {PRESETS.map((preset) => (
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
