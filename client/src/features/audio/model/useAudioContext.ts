import { useContext } from 'react'

import { AudioContext } from './AudioContext'

export const useAudioContext = () => {
    const context = useContext(AudioContext)

    if (!context) {
        throw new Error('useAudio must be used within an AudioProvider')
    }

    return context
}
