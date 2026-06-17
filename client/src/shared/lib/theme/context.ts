import { createContext } from 'react'

import type { ThemeProviderState } from './types'

const initialState: ThemeProviderState = {
    theme: 'dark',
    setTheme: () => null,
}

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState)
