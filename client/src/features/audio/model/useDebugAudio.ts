import { type RefObject, useEffect, useRef, useState } from 'react'

interface UseDebugAudioProps {
    audioContextRef: RefObject<globalThis.AudioContext | null>
    audioSourceRef: RefObject<MediaStreamAudioSourceNode | null>
    pitchProcessorRef: RefObject<AudioWorkletNode | null>
}

export const useDebugAudio = ({
    audioContextRef,
    audioSourceRef,
    pitchProcessorRef,
}: UseDebugAudioProps) => {
    const [isDebug, setIsDebug] = useState(false)
    const [debugFrequency, setDebugFrequency] = useState(440)
    const [isMuted, setIsMuted] = useState(true)

    const oscillatorRef = useRef<OscillatorNode | null>(null)
    const gainRef = useRef<GainNode | null>(null)

    useEffect(() => {
        if (oscillatorRef.current) {
            oscillatorRef.current.frequency.value = debugFrequency
        }
    }, [debugFrequency])

    useEffect(() => {
        if (gainRef.current) {
            gainRef.current.gain.value = isMuted ? 0 : 0.1
        }
    }, [isMuted])

    const toggleMute = () => setIsMuted((prev) => !prev)

    const toggleDebugMode = () => {
        const audioContext = audioContextRef.current
        const processor = pitchProcessorRef.current
        if (!processor || !audioContext) return

        if (!isDebug) {
            if (audioSourceRef.current) {
                audioSourceRef.current.disconnect(processor)
            }

            const osc = audioContext.createOscillator()
            const gain = audioContext.createGain()

            osc.type = 'sine'
            osc.frequency.value = debugFrequency
            gain.gain.value = isMuted ? 0 : 0.1

            osc.connect(processor)
            osc.connect(gain)
            gain.connect(audioContext.destination)

            osc.start()

            oscillatorRef.current = osc
            gainRef.current = gain
        } else {
            if (oscillatorRef.current) {
                oscillatorRef.current.disconnect()
                oscillatorRef.current.stop()
                oscillatorRef.current = null
            }

            if (gainRef.current) {
                gainRef.current.disconnect()
                gainRef.current = null
            }

            if (audioSourceRef.current) {
                audioSourceRef.current.connect(processor)
            }
        }

        setIsDebug((prev) => !prev)
    }

    return {
        isDebug,
        toggleDebugMode,
        debugFrequency,
        setDebugFrequency,
        isMuted,
        toggleMute,
    }
}
