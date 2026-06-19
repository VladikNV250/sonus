import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { type CreatePresetParams, PresetStore } from '@/entities/presets'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

export const useAddPreset = () => {
    const queryClient = useQueryClient()
    const { playSound } = useAppSounds()

    const mutation = useMutation({
        mutationFn: (newPreset: CreatePresetParams) => PresetStore.add(newPreset),
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['presets'] })
            toast.success('Preset created successfully')
            playSound('success')
        },
        onError: () => {
            toast.error('Failed to create preset')
            playSound('error')
        },
    })

    const addPreset = (preset: CreatePresetParams, onSuccess?: () => void) => {
        mutation.mutate(preset, { onSuccess })
    }

    return {
        addPreset,
        ...mutation,
    }
}
