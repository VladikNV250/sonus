import { useState } from 'react'

import { type Preset, PRESETS } from '@/entities/presets'
import { useGuitarPitchDetection } from '@/features/guitar-tuning'

export const useGuitarTunerBoard = () => {
    const [selectedPreset, setSelectedPreset] = useState(PRESETS[0])
    const [activeString, setActiveString] = useState<number | null>(null)
    const pitchData = useGuitarPitchDetection(activeString, selectedPreset)

    const isPerfect = pitchData?.cents === 0

    const selectPreset = (presetId: Preset['id']) => {
        const preset = PRESETS.find((p) => p.id === presetId)
        if (preset) {
            setSelectedPreset(preset)
            setActiveString(null)
        }
    }

    const selectString = (stringIndex: number) => {
        setActiveString(stringIndex)
    }

    return {
        selectedPreset,
        activeString,
        pitchData,
        isPerfect,
        selectPreset,
        selectString,
    }
}
