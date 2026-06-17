import { useEffect, useState } from 'react'

import { ThemeProviderContext } from './context'
import type { Theme } from './types'

type Props = {
    children: React.ReactNode
    storageKey?: string
}

const isTheme = (value: string | null): value is Theme => value === 'dark' || value === 'light'

export const ThemeProvider = ({ children, storageKey = 'sonus-ui-theme', ...props }: Props) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'dark'
        const storedTheme = localStorage.getItem(storageKey)
        if (isTheme(storedTheme)) return storedTheme

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    const value = {
        theme,
        setTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme)
            setTheme(theme)
        },
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    )
}
