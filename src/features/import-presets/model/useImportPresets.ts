import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { z } from 'zod'

import { type Preset, PresetSchema, PresetStore } from '@/entities/presets'

const ImportSchema = z.array(PresetSchema)

export const useImportPresets = () => {
    const queryClient = useQueryClient()

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
            const newPresets: Preset[] = []

            for (const preset of importData) {
                if (!existingNames.has(preset.name.trim().toLowerCase())) {
                    newPresets.push(preset)
                    existingNames.add(preset.name.trim().toLowerCase())
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
            } else {
                toast.success(`Successfully imported ${added} preset(s)`)
            }
        },
        onError: (err) => {
            console.error('Import failed', err)
            toast.error(err instanceof z.ZodError ? 'Invalid preset format' : err.message)
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
