import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { Preset } from '@/entities/presets'
import { ApiClient } from '@/shared/api'

export const useAddPreset = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: (newPreset: Omit<Preset, 'id'>) =>
            ApiClient.post<Preset>('/presets', newPreset),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['presets'] })
        },
    })

    const addPreset = (preset: Omit<Preset, 'id'>, onSuccess?: () => void) => {
        mutation.mutate(preset, { onSuccess })
    }

    return {
        addPreset,
        ...mutation,
    }
}
