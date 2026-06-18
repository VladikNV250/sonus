import { type DBSchema, openDB } from 'idb'

import { defaultPresetsDTO } from './seed'
import type { PresetDTO } from './types'

export interface SonusDB extends DBSchema {
    presets: {
        key: string
        value: PresetDTO
    }
}

export const initDB = async () => {
    return openDB<SonusDB>('sonus-db', 1, {
        upgrade(db) {
            // migration: seed default presets and create presets store
            if (!db.objectStoreNames.contains('presets')) {
                const store = db.createObjectStore('presets', { keyPath: 'id' })
                for (const preset of defaultPresetsDTO) {
                    void store.put(preset)
                }
            }
        },
    })
}

export const dbPromise = initDB()
