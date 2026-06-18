import type { PresetDTO } from './types'

export const defaultPresetsDTO: PresetDTO[] = [
    {
        id: 'standard',
        name: 'Standard E',
        strings: [
            { note: 'E', octave: 2 },
            { note: 'A', octave: 2 },
            { note: 'D', octave: 3 },
            { note: 'G', octave: 3 },
            { note: 'B', octave: 3 },
            { note: 'E', octave: 4 },
        ],
    },
    {
        id: 'half-step-down',
        name: 'Half Step Down',
        strings: [
            { note: 'D#', octave: 2 },
            { note: 'G#', octave: 2 },
            { note: 'C#', octave: 3 },
            { note: 'F#', octave: 3 },
            { note: 'A#', octave: 3 },
            { note: 'D#', octave: 4 },
        ],
    },
    {
        id: 'drop-d',
        name: 'Drop D',
        strings: [
            { note: 'D', octave: 2 },
            { note: 'A', octave: 2 },
            { note: 'D', octave: 3 },
            { note: 'G', octave: 3 },
            { note: 'B', octave: 3 },
            { note: 'E', octave: 4 },
        ],
    },
    {
        id: 'pantera',
        name: 'Pantera',
        strings: [
            { note: 'C#', octave: 2 },
            { note: 'F#', octave: 2 },
            { note: 'B', octave: 2 },
            { note: 'E', octave: 3 },
            { note: 'G#', octave: 3 },
            { note: 'C#', octave: 4 },
        ],
    },
]
