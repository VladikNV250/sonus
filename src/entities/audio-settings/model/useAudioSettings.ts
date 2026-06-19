import { useContext } from 'react'

import { AudioSettingsContext } from './AudioSettingsContext'

export const useAudioSettings = () => {
    const context = useContext(AudioSettingsContext)
    if (context === undefined) {
        throw new Error('useAudioSettings must be used within an AudioSettingsProvider')
    }
    return context
}
