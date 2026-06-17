export type ThemeProviderState = {
    theme: Theme
    setTheme: (theme: Theme) => void
}

export type Theme = 'dark' | 'light'
