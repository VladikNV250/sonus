import { z } from 'zod'

import { type CreatePresetParams, CreatePresetSchema } from '@/entities/presets'

type ValidationResult =
    | {
          isValid: true
          data: CreatePresetParams
      }
    | {
          isValid: false
          errors: Partial<Record<keyof CreatePresetParams, string[]>>
      }

export const validateCustomPreset = (preset: unknown): ValidationResult => {
    const result = CreatePresetSchema.safeParse(preset)

    if (result.success) {
        return { isValid: true, data: result.data }
    } else {
        return {
            isValid: false,
            errors: z.flattenError(result.error).fieldErrors,
        }
    }
}
