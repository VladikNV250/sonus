export interface Pitch {
    note: string
    octave: number
}

export interface Preset {
    id: string
    name: string
    strings: Pitch[]
    isCustom?: boolean
}
