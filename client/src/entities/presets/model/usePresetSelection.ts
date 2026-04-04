import { useState } from 'react'

import type { Preset } from './types'
import { usePresets } from './usePresets'

export const usePresetSelection = () => {
    const { data: presets = [], isLoading } = usePresets()
    const [selectedPresetId, setSelectedPresetId] = useState<Preset['id'] | null>(null)

    const selectedPreset = presets.find((p) => p.id === selectedPresetId) ?? presets.at(0) ?? null

    return {
        presets,
        selectedPreset,
        isLoading,
        setSelectedPresetId,
    }
}
