import { toast } from 'sonner'

import { usePresets } from '@/entities/presets'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

export const useExportPresets = () => {
    const { data: presets = [] } = usePresets()
    const { playSound } = useAppSounds()

    const exportCustomPresets = () => {
        const customPresets = presets.filter((p) => p.isCustom)

        if (customPresets.length === 0) {
            toast.info('No custom presets to export')
            playSound('error')
            return false
        }

        const dataStr = JSON.stringify(customPresets, null, 2)
        const blob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'sonus_presets.json'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)

        return true
    }

    return { exportCustomPresets }
}
