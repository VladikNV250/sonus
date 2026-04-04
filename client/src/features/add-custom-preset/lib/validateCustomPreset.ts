import type { Preset } from '@/entities/presets'

type ValidationResult =
    | {
          isValid: true
      }
    | {
          isValid: false
          errors: Partial<Record<keyof Omit<Preset, 'id'>, string[]>>
      }

export const validateCustomPreset = (preset: Omit<Preset, 'id'>): ValidationResult => {
    const errors: Partial<Record<keyof Omit<Preset, 'id'>, string[]>> = {}

    if (preset.name.trim().length < 2) errors.name = ['Name must be at least 2 characters long']
    const stringErrors: string[] = []
    if (preset.strings.length !== 6) stringErrors.push('Preset must have 6 strings')
    if (preset.strings.some((s) => !s.note || !s.octave))
        stringErrors.push('All strings must have a note and octave')
    if (stringErrors.length > 0) errors.strings = stringErrors

    if (Object.keys(errors).length === 0) {
        return { isValid: true }
    } else {
        return {
            isValid: false,
            errors,
        }
    }
}
