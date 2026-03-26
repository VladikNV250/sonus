import { type ChangeEvent, useEffect, useRef, useState } from 'react'

import {
    getMidiNoteFromName,
    getPitchData,
    initGuitarInput,
    type Note,
    type PitchData,
    pitchProcessorUrl,
} from '@/core'

export const usePitchDetection = () => {
    const [mode, setMode] = useState<'auto' | 'manual'>('auto')
    const [targetPitch, setTargetPitch] = useState<{ note: Note; octave: number } | null>(null)
    const audioContextRef = useRef<AudioContext | null>(null)
    const pitchProcessorRef = useRef<AudioWorkletNode | null>(null)
    const [pitchData, setPitchData] = useState<PitchData | null>(null)

    const [isStarted, setIsStarted] = useState(false)

    useEffect(() => {
        return () => {
            if (pitchProcessorRef.current) {
                pitchProcessorRef.current.port.onmessage = null
                pitchProcessorRef.current.disconnect()
            }
            if (audioContextRef.current) {
                void audioContextRef.current.close()
            }
        }
    }, [])

    useEffect(() => {
        if (!pitchProcessorRef.current) return

        pitchProcessorRef.current.port.onmessage = (event) => {
            const { type, frequency } = event.data as { type: string; frequency: number }

            if (type === 'frequency') {
                if (mode === 'manual' && targetPitch) {
                    const midiNote = getMidiNoteFromName(targetPitch.note, targetPitch.octave)

                    const pitchData = getPitchData(frequency, midiNote)
                    setPitchData(pitchData)
                } else {
                    const pitchData = getPitchData(frequency)
                    setPitchData(pitchData)
                }
            }
        }
    }, [mode, targetPitch, isStarted])

    const changeTargetPitch = (event: ChangeEvent<HTMLSelectElement>, type: 'note' | 'octave') => {
        if (type === 'note') {
            const note = event.target.value as Note
            setTargetPitch((prev) => ({ note, octave: prev?.octave ?? 4 }))
        } else {
            const octave = Number(event.target.value)
            setTargetPitch((prev) => ({ note: prev?.note ?? 'E', octave }))
        }
    }

    const startDetection = async () => {
        if (isStarted) return

        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new window.AudioContext()
            }

            const audioContext = audioContextRef.current

            if (audioContext.state === 'suspended') {
                await audioContext.resume()
            }

            await audioContext.audioWorklet.addModule(pitchProcessorUrl)
            const guitarSource = await initGuitarInput(audioContext)

            if (!guitarSource) {
                throw new Error('Failed to access microphone')
            }

            const pitchProcessorNode = new AudioWorkletNode(audioContext, 'pitch-processor')
            pitchProcessorRef.current = pitchProcessorNode

            guitarSource.connect(pitchProcessorNode)

            setIsStarted(true)
        } catch (error) {
            console.error('❌ Failed to initialize audio pipeline:', error)
        }
    }

    return {
        pitchData,
        isStarted,
        startDetection,
        mode,
        setMode,
        targetPitch,
        changeTargetPitch,
    }
}
