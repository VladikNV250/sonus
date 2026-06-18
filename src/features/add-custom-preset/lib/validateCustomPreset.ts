import { type CreatePresetParams, CreatePresetSchema } from '@/entities/presets'

type ValidationResult =
    | {
          isValid: true
      }
    | {
          isValid: false
          errors: Partial<Record<keyof CreatePresetParams, string[]>>
      }

export const validateCustomPreset = (preset: unknown): ValidationResult => {
    const result = CreatePresetSchema.safeParse(preset)

    if (result.success) {
        return { isValid: true }
    } else {
        return {
            isValid: false,
            errors: result.error.flatten().fieldErrors,
        }
    }
}
