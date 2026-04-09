import type { PitchData } from '../model'

// Determine glow color based on tuning accuracy
export const getGlowColor = (pitchData: PitchData | null): string => {
    if (!pitchData) return 'rgba(59, 130, 246, 0.1)' // bg-blue-500/10

    // Cap the deviation at 50 cents
    const deviation = Math.min(Math.abs(pitchData.cents), 50)

    // 0 = perfectly in tune, 1 = maximum out of tune (50 cents or more)
    const normalized = deviation / 50

    // Transition Hue: 142 (Green) down to 0 (Red)
    const hue = Math.round(142 * (1 - normalized))

    // Transition Saturation: 71% (Green-ish) to 84% (Red-ish)
    const saturation = Math.round(71 + 13 * normalized)

    // Transition Lightness: 45% (Green-ish) to 60% (Red-ish)
    const lightness = Math.round(45 + 15 * normalized)

    // Transition Alpha: 0.2 (in tune) to 0.1 (out of tune)
    const alpha = (0.2 - 0.1 * normalized).toFixed(2)

    return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
}
