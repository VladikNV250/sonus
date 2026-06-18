import { z } from 'zod'

import { type Pitch, PitchSchema } from '@/entities/pitch'

export interface Preset {
    readonly id: string
    name: string
    strings: Pitch[]
    isCustom?: boolean
}

export const CreatePresetSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters long'),
    strings: z
        .array(PitchSchema)
        .length(6, 'Preset must have 6 strings')
        .refine(
            (strings) => strings.every((s) => s.note && s.octave !== undefined),
            'All strings must have a note and octave',
        ),
})

export type CreatePresetParams = z.infer<typeof CreatePresetSchema>
