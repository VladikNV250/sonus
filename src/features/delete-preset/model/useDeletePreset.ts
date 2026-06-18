import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type Preset, PresetStore } from '@/entities/presets'

export const useDeletePreset = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: Preset['id']) => PresetStore.delete(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['presets'] })
            toast.success('Preset deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete preset')
        },
    })
}
