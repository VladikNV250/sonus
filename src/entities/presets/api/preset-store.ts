import { v4 as uuidv4 } from 'uuid'

import { dbPromise } from '@/shared/api'

import { mapToDomain, mapToDTO } from '../lib'
import type { CreatePresetParams, Preset } from '../model'

export const PresetStore = {
    async getAll(): Promise<Preset[]> {
        const db = await dbPromise
        const all = await db.getAll('presets')

        return all.map(mapToDomain)
    },

    async getById(id: string): Promise<Preset | undefined> {
        const db = await dbPromise
        const dto = await db.get('presets', id)
        return dto ? mapToDomain(dto) : undefined
    },

    async add(params: CreatePresetParams): Promise<Preset> {
        const db = await dbPromise

        const newPreset: Preset = {
            ...params,
            id: uuidv4(),
            isCustom: true,
        }
        await db.put('presets', mapToDTO(newPreset))
        return newPreset
    },

    async importMany(presets: Preset[]): Promise<Preset[]> {
        const db = await dbPromise
        const tx = db.transaction('presets', 'readwrite')

        for (const preset of presets) {
            void tx.store.put(mapToDTO(preset))
        }

        await tx.done
        return presets
    },

    async delete(id: string): Promise<void> {
        const db = await dbPromise
        await db.delete('presets', id)
    },
}
