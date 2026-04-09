import { describe, expect, it } from 'vitest'

import { smoothPitchData } from './smoothPitchData'

describe('smoothPitchData', () => {
    it('returns raw data if prev is null (first tick)', () => {
        const raw = { note: 'A' as const, octave: 4, cents: 10 }
        const result = smoothPitchData(raw, null)
        expect(result).toEqual(raw)
    })

    it('applies EMA smoothing when note and octave are the same', () => {
        const prev = { note: 'A' as const, octave: 4, cents: 10 }
        const raw = { note: 'A' as const, octave: 4, cents: 20 }

        // default alpha is 0.2
        // smoothed = 20 * 0.2 + 10 * 0.8 = 4 + 8 = 12
        expect(smoothPitchData(raw, prev).cents).toBe(12)
    })

    it('returns raw data and breaks smoothing if note changes', () => {
        const prev = { note: 'A' as const, octave: 4, cents: -50 }
        const raw = { note: 'D' as const, octave: 3, cents: 5 }

        const result = smoothPitchData(raw, prev)
        expect(result).toEqual(raw)
    })

    it('returns raw data if octave changes', () => {
        const prev = { note: 'A' as const, octave: 4, cents: 10 }
        const raw = { note: 'A' as const, octave: 5, cents: 5 }

        const result = smoothPitchData(raw, prev)
        expect(result).toEqual(raw)
    })

    it('uses custom alpha parameter', () => {
        const prev = { note: 'C' as const, octave: 3, cents: 0 }
        const raw = { note: 'C' as const, octave: 3, cents: 100 }

        const result = smoothPitchData(raw, prev, 0.5)
        // smoothed = 100 * 0.5 + 0 = 50
        expect(result.cents).toBe(50)
    })
})
