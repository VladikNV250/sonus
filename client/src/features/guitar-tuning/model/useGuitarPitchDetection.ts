import { useEffect, useState } from 'react'

import { getMidiNoteFromName, getPitchData } from '@/core'
import { type PitchData, smoothPitchData } from '@/entities/pitch'
import type { Preset } from '@/entities/presets'
import { useAudioContext } from '@/features/audio'

export const useGuitarPitchDetection = (
    activeString: number | null,
    selectedPreset: Preset | null,
) => {
    const { subscribeToFrequency } = useAudioContext()
    const [pitchData, setPitchData] = useState<PitchData | null>(null)

    useEffect(() => {
        return subscribeToFrequency((frequency) => {
            if (activeString === null || selectedPreset === null) {
                setPitchData(null)
                return
            }

            const selectedMidiNote = getMidiNoteFromName(selectedPreset.strings[activeString])
            const rawPitchData = getPitchData(frequency, selectedMidiNote)

            if (!rawPitchData) return

            setPitchData((prevData) => smoothPitchData(rawPitchData, prevData))
        })
    }, [activeString, selectedPreset, subscribeToFrequency])

    return pitchData
}
