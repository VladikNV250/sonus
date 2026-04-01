import type { Pitch } from '@/entities/pitch'

export interface Preset {
    readonly id: string
    name: string
    strings: Pitch[]
}
