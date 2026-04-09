import { NOTES, type Pitch, type PitchData } from '@/entities/pitch'

export const getPitchData = (frequency: number, targetMidiNote?: number): PitchData | null => {
    if (!Number.isFinite(frequency) || frequency <= 0) return null

    const floatMidiNote = 12 * Math.log2(frequency / 440) + 69

    const midiNote = targetMidiNote ?? Math.round(floatMidiNote)
    if (!Number.isInteger(midiNote) || midiNote < 0 || midiNote > 127) return null

    const note = NOTES[midiNote % 12]
    const octave = Math.floor(midiNote / 12) - 1
    const cents = Math.round((floatMidiNote - midiNote) * 100)

    return { note, octave, cents }
}

export const getMidiNoteFromName = (pitch: Pitch): number => {
    const noteIndex = NOTES.indexOf(pitch.note)
    if (noteIndex === -1) {
        throw new Error(`Invalid note name: ${pitch.note}`)
    }

    const midi = (pitch.octave + 1) * 12 + noteIndex
    if (midi < 0 || midi > 127) {
        throw new Error(`Invalid octave for MIDI range: ${pitch.octave}`)
    }
    return midi
}
