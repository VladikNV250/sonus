import type { PitchData } from '../model'

export const smoothPitchData = (raw: PitchData, prev: PitchData | null, alpha = 0.2) => {
    if (!prev || raw.note !== prev.note || raw.octave !== prev.octave) {
        return raw
    }

    const smoothedCents = raw.cents * alpha + prev.cents * (1 - alpha)

    return {
        ...raw,
        cents: Math.round(smoothedCents),
    }
}
