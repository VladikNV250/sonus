import { describe, expect, it, vi } from 'vitest'

vi.mock('@/shared/api/db', () => ({
    initDB: vi.fn(),
}))

import { validateCustomPreset } from './validateCustomPreset'

describe('validateCustomPreset', () => {
    it('should validate a correct preset successfully', () => {
        const validPreset = {
            name: 'My Custom Preset',
            strings: [
                { note: 'E', octave: 2 },
                { note: 'A', octave: 2 },
                { note: 'D', octave: 3 },
                { note: 'G', octave: 3 },
                { note: 'B', octave: 3 },
                { note: 'E', octave: 4 },
            ],
        }

        const result = validateCustomPreset(validPreset)
        expect(result.isValid).toBe(true)
    })

    it('should fail if name is too short', () => {
        const invalidPreset = {
            name: 'A',
            strings: [
                { note: 'E', octave: 2 },
                { note: 'A', octave: 2 },
                { note: 'D', octave: 3 },
                { note: 'G', octave: 3 },
                { note: 'B', octave: 3 },
                { note: 'E', octave: 4 },
            ],
        }

        const result = validateCustomPreset(invalidPreset)
        expect(result.isValid).toBe(false)
        if (!result.isValid) {
            expect(result.errors?.name).toBeDefined()
        }
    })

    it('should fail if preset does not have exactly 6 strings', () => {
        const invalidPreset = {
            name: 'Custom',
            strings: [{ note: 'E', octave: 2 }],
        }

        const result = validateCustomPreset(invalidPreset)
        expect(result.isValid).toBe(false)
        if (!result.isValid) {
            expect(result.errors?.strings).toBeDefined()
        }
    })

    it('should fail if any string is missing a note or octave', () => {
        const invalidPreset = {
            name: 'Custom',
            strings: [
                { octave: 2 }, // Missing note
                { note: 'A', octave: 2 },
                { note: 'D', octave: 3 },
                { note: 'G', octave: 3 },
                { note: 'B', octave: 3 },
                { note: 'E', octave: 4 },
            ],
        }

        const result = validateCustomPreset(invalidPreset)
        expect(result.isValid).toBe(false)
        if (!result.isValid) {
            expect(result.errors?.strings).toBeDefined()
        }
    })
})
