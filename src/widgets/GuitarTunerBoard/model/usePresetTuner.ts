import { useState } from 'react'

import type { Preset } from '@/entities/presets'
import { useGuitarPitchDetection } from '@/features/guitar-tuning'

export const usePresetTuner = (selectedPreset: Preset | null) => {
    const [activeString, setActiveString] = useState<number | null>(null)
    const pitchData = useGuitarPitchDetection(activeString, selectedPreset)

    const isPerfect = pitchData?.cents === 0

    return {
        activeString,
        pitchData,
        isPerfect,
        selectString: setActiveString,
    }
}
