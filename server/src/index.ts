import express from 'express'
import cors from 'cors'
import { prisma } from './lib/prisma'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(
    cors({
        origin: process.env.CLIENT_URL ?? 'https://localhost:5173',
    }),
)
app.use(express.json())

interface CreatePresetPayload {
    name: string
    strings: {
        note: string
        octave: number
    }[]
}

const validatePresetPayload = (value: unknown): value is CreatePresetPayload => {
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
    try {
        const presets = await prisma.preset.findMany({
            include: {
                strings: {
                    orderBy: {
                        stringNumber: 'asc',
                    },
                },
            },
        })
        res.json(presets)
    } catch (error) {
        console.error('Failed to fetch presets:', error)
        res.status(500).json({ error: 'Failed to fetch presets' })
    }
})

app.post('/api/presets', async (req, res) => {
    try {
        if (!validatePresetPayload(req.body)) {
            return res.status(400).json({ error: 'Invalid preset payload' })
        }

        const newPreset = await prisma.preset.create({
            data: {
                name: req.body.name,
                strings: {
                    create: req.body.strings.map((str, index) => ({
                        note: str.note,
                        octave: str.octave,
                        stringNumber: index + 1,
                    })),
                },
            },
            include: {
                strings: true,
            },
        })

        res.status(201).json(newPreset)
    } catch (error) {
        console.error('Failed to save preset:', error)
        res.status(500).json({ error: 'Failed to save preset' })
    }
})

app.delete('/api/presets/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10)
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid preset ID' })
        }

        await prisma.preset.delete({
            where: { id },
        })

        res.status(204).send()
    } catch (error) {
        console.error('Failed to delete preset:', error)
        res.status(500).json({ error: 'Failed to delete preset (it might not exist)' })
    }
})

const HOST = process.env.HOST || 'localhost'

app.listen(Number(PORT), HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`)
})
