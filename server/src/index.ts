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
        return JSON.parse(data)
    } catch {
        return []
    }
}

const writePresets = async (presets: Preset[]): Promise<void> => {
    await fs.writeFile(DATA_PATH, JSON.stringify(presets, null, 4), 'utf-8')
}

app.get('/api/presets', async (req, res) => {
    const presets = await readPresets()
    res.json(presets)
})

app.post('/api/presets', async (req, res) => {
    try {
        const newPreset = req.body as Preset
        const presets = await readPresets()

        if (!newPreset.id) {
            newPreset.id = randomUUID()
        }

        newPreset.isCustom = true

        presets.push(newPreset)
        await writePresets(presets)

        res.status(201).json(newPreset)
    } catch (error) {
        res.status(500).json({ error: 'Failed to save preset' })
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
