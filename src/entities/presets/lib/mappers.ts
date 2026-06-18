import type { Note } from '@/entities/pitch'
import type { PresetDTO } from '@/shared/api'

import type { Preset } from '../model'

export const mapToDomain = (dto: PresetDTO): Preset => ({
    id: dto.id,
    name: dto.name,
    strings: dto.strings.map((s) => ({ note: s.note as Note, octave: s.octave })),
    isCustom: dto.isCustom,
})

export const mapToDTO = (domain: Preset): PresetDTO => ({
    id: domain.id,
    name: domain.name,
    strings: domain.strings.map((s) => ({ note: s.note, octave: s.octave })),
    isCustom: domain.isCustom,
})
