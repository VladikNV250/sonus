import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import type { Preset } from './data/types'
import { randomUUID } from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const DATA_PATH = path.join(__dirname, 'data', 'presets.json')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const readPresets = async (): Promise<Preset[]> => {
    try {
        const data = await fs.readFile(DATA_PATH, 'utf-8')
        const parsed = JSON.parse(data)
        if (!Array.isArray(parsed)) {
            throw new Error('Invalid presets format')
        }
        return parsed as Preset[]
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return []
        }
        throw error
    }
}

const writePresets = async (presets: Preset[]): Promise<void> => {
    await fs.writeFile(DATA_PATH, JSON.stringify(presets, null, 4), 'utf-8')
}

const validatePresetPayload = (value: unknown): value is Omit<Preset, 'id'> => {
    if (!value || typeof value !== 'object') return false
    const candidate = value as { name?: unknown; strings?: unknown }
    return (
        typeof candidate.name === 'string' &&
        Array.isArray(candidate.strings) &&
        candidate.strings.length > 0 &&
        candidate.strings.every(
            (p) =>
                p &&
                typeof p === 'object' &&
                typeof (p as { note?: unknown }).note === 'string' &&
                Number.isInteger((p as { octave?: unknown }).octave),
        )
    )
}

app.get('/api/presets', async (req, res) => {
    const presets = await readPresets()
    res.json(presets)
})

let writeQueue: Promise<void> = Promise.resolve()
app.post('/api/presets', async (req, res) => {
    try {
        if (!validatePresetPayload(req.body)) {
            return res.status(400).json({ error: 'Invalid preset payload' })
        }
        const newPreset = req.body as Preset
        if (!newPreset.id) newPreset.id = randomUUID()
        newPreset.isCustom = true

        await (writeQueue = writeQueue.then(async () => {
            const presets = await readPresets()
            presets.push(newPreset)
            await writePresets(presets)
        }))

        res.status(201).json(newPreset)
    } catch (error) {
        res.status(500).json({ error: 'Failed to save preset' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
