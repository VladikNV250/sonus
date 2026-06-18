export interface PresetDTO {
    id: string
    name: string
    strings: {
        note: string
        octave: number
    }[]
    isCustom?: boolean
}
