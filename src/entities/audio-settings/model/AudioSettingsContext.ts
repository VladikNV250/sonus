import { createContext } from 'react'

import type { AudioSettingsContextProps } from './types'

export const AudioSettingsContext = createContext<AudioSettingsContextProps | undefined>(undefined)
