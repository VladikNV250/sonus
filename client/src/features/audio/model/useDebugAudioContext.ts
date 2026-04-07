import { useContext } from 'react'

import { DebugAudioContext } from './AudioContext'

export const useDebugAudioContext = () => {
    const context = useContext(DebugAudioContext)

    if (!context) {
        throw new Error('useDebugAudioContext must be used within an AudioProvider')
    }

    return context
}
