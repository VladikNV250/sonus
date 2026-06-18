import { type ChangeEvent, useState } from 'react'

import type { Pitch } from '@/entities/pitch'
import { STRING_LABELS } from '@/entities/pitch'
import type { CreatePresetParams } from '@/entities/presets'

import { DEFAULT_STRINGS } from '../consts'
import { validateCustomPreset } from '../lib'
import type { StringLabel } from './types'
import { useAddPreset } from './useAddPreset'

export const useCreatePreset = (onClose: () => void) => {
    const [name, setName] = useState('')
    const [userPitches, setUserPitches] = useState<Partial<Record<StringLabel, Partial<Pitch>>>>({})
    const [showErrors, setShowErrors] = useState(false)
    const { addPreset, isPending, error } = useAddPreset()

    const pitches = STRING_LABELS.map((label, index) => {
        const defaultPitch = DEFAULT_STRINGS[index]
        const userPitch = userPitches[label]

        return {
            ...defaultPitch,
            ...userPitch,
        }
    })

    const preset: CreatePresetParams = {
        name,
        strings: pitches,
    }

    const updatePitch = (label: StringLabel, pitch: Partial<Pitch>) => {
        setUserPitches((prev) => ({
            ...prev,
            [label]: {
                ...prev[label],
                ...pitch,
            },
        }))
    }

    const changeName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const reset = () => {
        setName('')
        setUserPitches({})
        setShowErrors(false)
    }

    const validationResult = validateCustomPreset(preset)
    const validationErrors = showErrors && !validationResult.isValid ? validationResult.errors : {}
    const errors = {
        ...validationErrors,
        ...(error ? { root: [error.message] } : {}),
    }

    const handleSave = () => {
        if (!validateCustomPreset(preset).isValid) {
            setShowErrors(true)
            return
        }

        addPreset(preset, () => {
            onClose()
            reset()
        })
    }

    return {
        name,
        changeName,
        pitches,
        updatePitch,
        reset,
        errors,
        isPending,
        handleSave,
    }
}
