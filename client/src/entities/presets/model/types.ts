import type { Pitch } from '@/entities/pitch'

export interface Preset {
    readonly id: string
    name: string
    strings: Pitch[]
    isCustom?: boolean
}

export interface CreatePresetParams {
    name: string
    strings: Pitch[]
}
