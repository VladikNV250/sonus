import type { Pitch } from '@/entities/pitch'

export interface Preset {
    readonly id: number
    name: string
    strings: Pitch[]
    isCustom?: boolean
}
