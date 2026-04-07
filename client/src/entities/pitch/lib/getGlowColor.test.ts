import { describe, expect, it } from 'vitest'

import { getGlowColor } from './getGlowColor'

describe('getGlowColor', () => {
    it('returns default blue-500/10 when pitchData is null', () => {
        expect(getGlowColor(null)).toBe('rgba(59, 130, 246, 0.1)')
    })

    it('returns maximum green (in tune) when cents deviation is 0', () => {
        const result = getGlowColor({ note: 'A', octave: 4, cents: 0 })
        // Hue = 142 (green), Sat = 71%, Light = 45%, Alpha = 0.20
        expect(result).toBe('hsla(142, 71%, 45%, 0.20)')
    })

    it('returns maximum red (out of tune) when cents deviation is 50', () => {
        const result = getGlowColor({ note: 'A', octave: 4, cents: 50 })
        // normalized = 1
        // Hue = 0, Sat = 84%, Light = 60%, Alpha = 0.10
        expect(result).toBe('hsla(0, 84%, 60%, 0.10)')
    })

    it('returns maximum red when cents deviation is -50 (flat)', () => {
        const result = getGlowColor({ note: 'A', octave: 4, cents: -50 })
        expect(result).toBe('hsla(0, 84%, 60%, 0.10)')
    })

    it('caps the devation at 50, even if it is > 50', () => {
        const result = getGlowColor({ note: 'A', octave: 4, cents: 80 })
        expect(result).toBe('hsla(0, 84%, 60%, 0.10)')
    })

    it('returns an intermediate color when deviation is modest', () => {
        // deviation = 25 -> normalized = 0.5
        // hue = 142 * 0.5 = 71
        // sat = 71 + 13*0.5 = 77.5 => 78%
        // light = 45 + 15*0.5 = 52.5 => 53%
        // alpha = 0.20 - 0.05 = 0.15
        const result = getGlowColor({ note: 'A', octave: 4, cents: 25 })
        expect(result).toBe('hsla(71, 78%, 53%, 0.15)')
    })
})
