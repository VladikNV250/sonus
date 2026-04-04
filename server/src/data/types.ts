export type Note = 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#' | 'A' | 'A#' | 'B'

export interface Pitch {
    note: Note
    octave: number
}

export interface Preset {
    id: string
    name: string
    strings: Pitch[]
    isCustom?: boolean
}
