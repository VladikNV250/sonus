import { createContext } from 'react'

interface AudioContextProps {
    subscribeToFrequency: (handler: (frequency: number) => void) => () => void
}

export const AudioContext = createContext<AudioContextProps | null>(null)
