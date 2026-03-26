import { NOTES } from '../tuning'

export const getPitchData = (frequency: number) => {
    if (!Number.isFinite(frequency) || frequency <= 0) return null

    const floatMidiNote = 12 * Math.log2(frequency / 440) + 69

    const midiNote = Math.round(floatMidiNote)

    const note = NOTES[midiNote % 12]
    const octave = Math.floor(midiNote / 12) - 1
    const cents = Math.round((floatMidiNote - midiNote) * 100)

    return { note, octave, cents }
}
