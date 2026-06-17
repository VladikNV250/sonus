import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type Preset } from '@/entities/presets'
import { ApiClient } from '@/shared/api/api-client'

export const useDeletePreset = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: Preset['id']) => ApiClient.delete(`/presets/${id}`),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['presets'] })
            toast.success('Preset deleted successfully')
        },
        onError: () => {
            toast.error('Failed to delete preset')
        },
    })
}
