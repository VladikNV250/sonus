import './index.css'

import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import { ThemeProvider } from '@/shared/lib'

import type { Route } from './+types/root'
import { QueryProvider } from './app/providers/QueryProvider'
import { AudioProvider } from './features/audio'

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="Sonus" />
                <link rel="apple-touch-icon" href="/icons/icon-192.png" />
                <meta name="theme-color" content="#0f0f0f" />
                <Meta />
                <Links />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                let theme = localStorage.getItem('sonus-ui-theme');
                                if (theme !== 'dark' && theme !== 'light') {
                                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                                    localStorage.setItem('sonus-ui-theme', theme);
                                }
                                document.documentElement.classList.remove('dark', 'light');
                                document.documentElement.classList.add(theme);
                            } catch (_) {}
                        `,
                    }}
                />
            </head>
            <body suppressHydrationWarning>
                {children}
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

const App = () => {
    return (
        <ThemeProvider>
            <QueryProvider>
                <AudioProvider>
                    <Outlet />
                </AudioProvider>
            </QueryProvider>
        </ThemeProvider>
    )
}

export default App

export const ErrorBoundary = ({ error }: Route.ErrorBoundaryProps) => {
    let message = 'Oops!'
    let details = 'An unexpected error occurred.'
    let stack: string | undefined

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error'
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message
        stack = error.stack
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    )
}
