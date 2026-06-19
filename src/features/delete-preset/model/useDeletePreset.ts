import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type Preset, PresetStore } from '@/entities/presets'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

export const useDeletePreset = () => {
    const queryClient = useQueryClient()
    const { playSound } = useAppSounds()

    return useMutation({
        mutationFn: (id: Preset['id']) => PresetStore.delete(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['presets'] })
            toast.success('Preset deleted successfully')
            playSound('success')
        },
        onError: () => {
            toast.error('Failed to delete preset')
            playSound('error')
        },
    })
}
