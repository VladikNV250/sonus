import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { initGuitarInput, pitchProcessorUrl } from '@/core'

import { AudioContext } from '../model'
import { StartListeningScreen } from './StartListeningScreen'

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isStarted, setIsStarted] = useState(false)

    const audioContextRef = useRef<AudioContext | null>(null)
    const pitchProcessorRef = useRef<AudioWorkletNode | null>(null)
    const frequencyHandlersRef = useRef(new Set<(frequency: number) => void>())

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

    const subscribeToFrequency = useCallback((handler: (frequency: number) => void) => {
        frequencyHandlersRef.current.add(handler)
        return () => frequencyHandlersRef.current.delete(handler)
    }, [])

    const start = async () => {
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

            pitchProcessorNode.port.onmessage = (event) => {
                const { type, frequency } = event.data as {
                    type: string
                    frequency: number
                }

                if (type === 'frequency') {
                    frequencyHandlersRef.current.forEach((handler) => handler(frequency))
                }
            }

            guitarSource.connect(pitchProcessorNode)

            setIsStarted(true)
        } catch (error) {
            console.error('❌ Failed to initialize audio pipeline:', error)
        }
    }

    return (
        <AudioContext.Provider value={{ subscribeToFrequency }}>
            {children}
            <StartListeningScreen isStarted={isStarted} start={start} />
        </AudioContext.Provider>
    )
}
