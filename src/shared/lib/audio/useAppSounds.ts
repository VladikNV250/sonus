import useSound from 'use-sound'

import { useAudioSettings } from '@/entities/audio-settings'
import clickSound from '@/shared/assets/sounds/click.mp3'
import errorSound from '@/shared/assets/sounds/error.mp3'
import pitchSound from '@/shared/assets/sounds/pitch.mp3'
import successSound from '@/shared/assets/sounds/success.mp3'

export type SoundEvent = 'click' | 'pitch' | 'success' | 'error'

const SOUND_ASSETS: Record<SoundEvent, string> = {
    click: clickSound,
    pitch: pitchSound,
    success: successSound,
    error: errorSound,
}

export const useAppSounds = () => {
    const { settings } = useAudioSettings()

    const [playClickSound] = useSound(SOUND_ASSETS.click, { volume: 0.5 })
    const [playPitchSound] = useSound(SOUND_ASSETS.pitch, { volume: 0.8 })
    const [playSuccessSound] = useSound(SOUND_ASSETS.success)
    const [playErrorSound] = useSound(SOUND_ASSETS.error)

    const playSound = (event: SoundEvent) => {
        switch (event) {
            case 'click':
                if (settings.audio.uiSoundsEnabled) {
                    playClickSound()
                }
                break
            case 'pitch':
                if (settings.audio.pitchSoundEnabled) {
                    playPitchSound()
                }
                break
            case 'success':
                if (settings.audio.uiSoundsEnabled) {
                    playSuccessSound()
                }
                break
            case 'error':
                if (settings.audio.uiSoundsEnabled) {
                    playErrorSound()
                }
                break
        }
    }

    return { playSound }
}
