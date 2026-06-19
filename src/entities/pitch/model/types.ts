import { z } from 'zod'

export const NoteSchema = z.enum(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])

export type Note = z.infer<typeof NoteSchema>

export const PitchSchema = z.object({
    note: NoteSchema,
    octave: z.number().int().min(1).max(6),
})

export type Pitch = z.infer<typeof PitchSchema>

export interface PitchData extends Pitch {
    cents: number
}
