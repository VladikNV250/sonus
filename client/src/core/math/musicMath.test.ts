import { describe, expect, it } from 'vitest'

import { getMidiNoteFromName, getPitchData } from './musicMath'

describe('getPitchData', () => {
    it('correctly identifies A4 at 440Hz', () => {
        const result = getPitchData(440)
        expect(result).toEqual({ note: 'A', octave: 4, cents: 0 })
    })

    it('correctly identifies C4 (Middle C) at 261.63Hz', () => {
        const result = getPitchData(261.625)
        expect(result?.note).toBe('C')
        expect(result?.octave).toBe(4)
        expect(result?.cents).toBeCloseTo(0, -1) // roughly 0
    })

    it('handles slightly sharp frequencies', () => {
        const result = getPitchData(445) // Slightly sharp A4
        expect(result?.note).toBe('A')
        expect(result?.octave).toBe(4)
        expect(result?.cents).toBeGreaterThan(0)
    })

    it('handles slightly flat frequencies', () => {
        const result = getPitchData(435) // Slightly flat A4
        expect(result?.note).toBe('A')
        expect(result?.octave).toBe(4)
        expect(result?.cents).toBeLessThan(0)
    })

    it('returns null for invalid frequencies (negative, zero, NaN)', () => {
        expect(getPitchData(-100)).toBeNull()
        expect(getPitchData(0)).toBeNull()
        expect(getPitchData(NaN)).toBeNull()
        expect(getPitchData(Infinity)).toBeNull()
    })

    it('forces calculation relative to targetMidiNote if provided', () => {
        // Even if frequency is exactly A4 (440Hz), if we tell it the target is A#4 (70),
        // it should return A#4 with a huge flat cent value.
        const result = getPitchData(440, 70) // 70 is A#4
        expect(result?.note).toBe('A#')
        expect(result?.octave).toBe(4)
        expect(result?.cents).toBeLessThan(-50)
    })
})

describe('getMidiNoteFromName', () => {
    it('correctly returns MIDI note for A4', () => {
        expect(getMidiNoteFromName({ note: 'A', octave: 4 })).toBe(69)
    })

    it('correctly returns MIDI note for C4 (Middle C)', () => {
        expect(getMidiNoteFromName({ note: 'C', octave: 4 })).toBe(60)
    })

    it('throws error on invalid note name', () => {
        // @ts-expect-error - intentional invalid type to test runtime check
        expect(() => getMidiNoteFromName({ note: 'H', octave: 4 })).toThrow()
    })

    it('throws error on octave out of bounds', () => {
        expect(() => getMidiNoteFromName({ note: 'C', octave: 10 })).toThrow()
        expect(() => getMidiNoteFromName({ note: 'A', octave: -3 })).toThrow()
    })
})
