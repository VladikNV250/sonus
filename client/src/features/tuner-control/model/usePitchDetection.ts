import { useEffect, useRef, useState } from 'react'

import { getPitchData, initGuitarInput, type PitchData, pitchProcessorUrl } from '@/core'

export const usePitchDetection = () => {
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

            const pitchProcessorNode = new AudioWorkletNode(audioContext, 'pitch-processor')
            pitchProcessorRef.current = pitchProcessorNode

            pitchProcessorNode.port.onmessage = (event) => {
                const { type, frequency } = event.data as { type: string; frequency: number }

                if (type === 'frequency') {
                    const pitchData = getPitchData(frequency)
                    setPitchData(pitchData)
                }
            }

            guitarSource?.connect(pitchProcessorNode)

            setIsStarted(true)
        } catch (error) {
            console.error('❌ Failed to initialize audio pipeline:', error)
        }
    }

    return {
        pitchData,
        isStarted,
        startDetection,
    }
}
