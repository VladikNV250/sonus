import { createContext } from 'react'

export interface AudioContextProps {
    subscribeToFrequency: (handler: (frequency: number) => void) => () => void
}

export interface DebugAudioContextProps {
    isDebug: boolean
    toggleDebugMode: () => void
    debugFrequency: number
    setDebugFrequency: (freq: number) => void
    isMuted: boolean
    toggleMute: () => void
}

export const AudioContext = createContext<AudioContextProps | null>(null)
export const DebugAudioContext = createContext<DebugAudioContextProps | null>(null)
