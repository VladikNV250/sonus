import { type ChangeEvent, useEffect, useState } from 'react'

import { getMidiNoteFromName, getPitchData } from '@/core'
import { type Note, type Pitch, type PitchData, smoothPitchData } from '@/entities/pitch'
import { useAudioContext } from '@/features/audio'

import type { TunerMode } from './type'

export const usePitchDetection = () => {
    const { subscribeToFrequency } = useAudioContext()
    const [mode, setMode] = useState<TunerMode>('auto')
    const [targetPitch, setTargetPitch] = useState<Pitch>({ note: 'E', octave: 4 })
    const [pitchData, setPitchData] = useState<PitchData | null>(null)

    useEffect(() => {
        return subscribeToFrequency((frequency) => {
            const selectedMidiNote =
                mode === 'manual' ? getMidiNoteFromName(targetPitch) : undefined
            const rawPitchData = getPitchData(frequency, selectedMidiNote)

            if (!rawPitchData) return

            setPitchData((prevData) => smoothPitchData(rawPitchData, prevData))
        })
    }, [subscribeToFrequency, mode, targetPitch])

    const changeTargetPitch = (event: ChangeEvent<HTMLSelectElement>, key: keyof Pitch) => {
        if (key === 'note') {
            const note = event.target.value as Note
            setTargetPitch((prev) => ({ ...prev, note }))
        } else {
            const octave = Number(event.target.value)
            setTargetPitch((prev) => ({ ...prev, octave }))
        }
    }

    const isPerfect = pitchData?.cents === 0

    return {
        pitchData,
        isPerfect,
        mode,
        setMode,
        targetPitch,
        changeTargetPitch,
    }
}
