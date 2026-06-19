import { z } from 'zod'

export const AudioSettingsSchema = z.object({
    uiSoundsEnabled: z.boolean().default(true),
    pitchSoundEnabled: z.boolean().default(true),
})

export const AppSettingsSchema = z.object({
    audio: AudioSettingsSchema,
})

export type AudioSettings = z.infer<typeof AudioSettingsSchema>
export type AppSettings = z.infer<typeof AppSettingsSchema>

export interface AudioSettingsContextProps {
    settings: AppSettings
    updateAudioSettings: (updates: Partial<AudioSettings>) => void
}
