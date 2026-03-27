import type { PitchData } from '../model'

// Determine glow color based on tuning accuracy
// TODO: determine color based on pitchData.cents.
// For example, as pitchData.cents approaches 0, the color should transition from red to green.
export const getGlowColor = (pitchData: PitchData | null) => {
    if (!pitchData) return 'bg-blue-500/10'
    if (pitchData.cents === 0) return 'bg-green-500/20'
    if (Math.abs(pitchData.cents) > 20) return 'bg-red-500/10'
    return 'bg-amber-500/10'
}
