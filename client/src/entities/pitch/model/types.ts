export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export interface PitchData extends Pitch {
    cents: number
}

export interface Pitch {
    note: Note
    octave: number
}
