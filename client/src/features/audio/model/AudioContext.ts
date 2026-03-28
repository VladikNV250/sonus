import { createContext } from 'react'

interface AudioContextProps {
    isStarted: boolean
    start: () => Promise<void>
    subscribeToFrequency: (handler: (frequency: number) => void) => () => void
}

export const AudioContext = createContext<AudioContextProps | null>(null)
