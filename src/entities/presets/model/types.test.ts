import { describe, expect, it } from 'vitest'

import { PresetSchema } from './types'

describe('PresetSchema', () => {
    it('should validate a correct preset', () => {
        const validPreset = {
            id: '123',
            name: 'Standard Tuning',
            isCustom: true,
            strings: [
                { note: 'E', octave: 2, frequency: 82.41 },
                { note: 'A', octave: 2, frequency: 110.0 },
                { note: 'D', octave: 3, frequency: 146.83 },
                { note: 'G', octave: 3, frequency: 196.0 },
                { note: 'B', octave: 3, frequency: 246.94 },
                { note: 'E', octave: 4, frequency: 329.63 },
            ],
        }

        expect(PresetSchema.safeParse(validPreset).success).toBe(true)
    })

    it('should fail if missing id', () => {
        const invalidPreset = {
            name: 'No ID',
            strings: [
                { note: 'E', octave: 2 },
                { note: 'A', octave: 2 },
                { note: 'D', octave: 3 },
                { note: 'G', octave: 3 },
                { note: 'B', octave: 3 },
                { note: 'E', octave: 4 },
            ],
        }

        expect(PresetSchema.safeParse(invalidPreset).success).toBe(false)
    })

    it('should fail if strings array does not have exactly 6 strings', () => {
        const invalidPreset = {
            id: '123',
            name: '5 Strings',
            strings: [
                { note: 'A', octave: 2 },
                { note: 'D', octave: 3 },
                { note: 'G', octave: 3 },
                { note: 'B', octave: 3 },
                { note: 'E', octave: 4 },
            ],
        }

        expect(PresetSchema.safeParse(invalidPreset).success).toBe(false)
    })
})
