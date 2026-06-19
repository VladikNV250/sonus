import React, { useEffect, useState } from 'react'

import { AudioSettingsContext } from './AudioSettingsContext'
import type { AppSettings, AudioSettings } from './types'
import { AppSettingsSchema } from './types'

const SETTINGS_STORAGE_KEY = 'sonus-app-settings'

export const AudioSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettings] = useState<AppSettings>(() => {
        try {
            const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
            const parsed: unknown = stored ? JSON.parse(stored) : { audio: {} }
            return AppSettingsSchema.parse(parsed)
        } catch {
            return AppSettingsSchema.parse({ audio: {} })
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
        } catch (e) {
            console.error('Failed to save settings to local storage', e)
        }
    }, [settings])

    const updateAudioSettings = (updates: Partial<AudioSettings>) => {
        setSettings((prev) => ({
            ...prev,
            audio: {
                ...prev.audio,
                ...updates,
            },
        }))
    }

    return (
        <AudioSettingsContext.Provider value={{ settings, updateAudioSettings }}>
            {children}
        </AudioSettingsContext.Provider>
    )
}
