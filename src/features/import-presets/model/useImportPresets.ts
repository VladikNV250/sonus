import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { type Preset, PresetSchema, PresetStore } from '@/entities/presets'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

const ImportSchema = z.array(PresetSchema)

export const useImportPresets = () => {
    const queryClient = useQueryClient()
    const { playSound } = useAppSounds()

    const mutation = useMutation({
        mutationFn: async (file: File) => {
            const text = await file.text()
            let parsed: unknown
            try {
                parsed = JSON.parse(text)
            } catch (err) {
                throw new Error('Invalid JSON file', { cause: err })
            }

            const importData = ImportSchema.parse(parsed)
            const existingPresets = await PresetStore.getAll()

            const existingNames = new Set(existingPresets.map((p) => p.name.trim().toLowerCase()))
            const existingIds = new Set(existingPresets.map((p) => p.id))
            const newPresets: Preset[] = []

            for (const preset of importData) {
                const normalizedName = preset.name.trim().toLowerCase()
                if (!existingIds.has(preset.id) && !existingNames.has(normalizedName)) {
                    newPresets.push(preset)
                    existingIds.add(preset.id)
                    existingNames.add(normalizedName)
                }
            }

            if (newPresets.length > 0) {
                await PresetStore.importMany(newPresets)
            }

            return { total: importData.length, added: newPresets.length }
        },
        onSuccess: ({ added }) => {
            void queryClient.invalidateQueries({ queryKey: ['presets'] })
            if (added === 0) {
                toast.info('No new presets imported (all were duplicates)')
                playSound('error')
            } else {
                toast.success(`Successfully imported ${added} preset(s)`)
                playSound('success')
            }
        },
        onError: (err) => {
            console.error('Import failed', err)
            toast.error(err instanceof z.ZodError ? 'Invalid preset format' : err.message)
            playSound('error')
        },
    })

    const importFile = (file: File) => {
        mutation.mutate(file)
    }

    return {
        importFile,
        isImporting: mutation.isPending,
    }
}
