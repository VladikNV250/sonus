import { type ReactNode, useCallback, useEffect, useRef, useState } from 'react'

import { initAudioInput, pitchProcessorUrl } from '@/core'

import { AudioContext, DebugAudioContext } from '../model'
import { useDebugAudio } from '../model/useDebugAudio'
import { StartListeningScreen } from './StartListeningScreen'

export const AudioProvider = ({ children }: { children: ReactNode }) => {
    const [isStarted, setIsStarted] = useState(false)

    const audioSourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
    const audioStreamRef = useRef<MediaStream | null>(null)
    const audioContextRef = useRef<globalThis.AudioContext | null>(null)
    const pitchProcessorRef = useRef<AudioWorkletNode | null>(null)
    const frequencyHandlersRef = useRef(new Set<(frequency: number) => void>())

    const { isDebug, toggleDebugMode, debugFrequency, setDebugFrequency, isMuted, toggleMute } =
        useDebugAudio({
            audioContextRef,
            audioSourceRef,
            pitchProcessorRef,
        })

    useEffect(() => {
        return () => {
            if (pitchProcessorRef.current) {
                pitchProcessorRef.current.port.onmessage = null
                pitchProcessorRef.current.disconnect()
            }
            if (audioContextRef.current) {
                void audioContextRef.current.close()
            }
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach((track) => track.stop())
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
            const audioInput = await initAudioInput(audioContext)

            if (!audioInput) {
                throw new Error('Failed to access microphone')
            }

            audioStreamRef.current = audioInput.audioStream
            audioSourceRef.current = audioInput.audioSource

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

            audioInput.audioSource.connect(pitchProcessorNode)

            setIsStarted(true)
        } catch (error) {
            console.error('❌ Failed to initialize audio pipeline:', error)
        }
    }

    return (
        <AudioContext.Provider value={{ subscribeToFrequency }}>
            <DebugAudioContext.Provider
                value={{
                    isDebug,
                    toggleDebugMode,
                    debugFrequency,
                    setDebugFrequency,
                    isMuted,
                    toggleMute,
                }}
            >
                {children}
                <StartListeningScreen isStarted={isStarted} start={start} />
            </DebugAudioContext.Provider>
        </AudioContext.Provider>
    )
}
