import { Toaster } from 'sonner'

import { useTheme } from '@/shared/lib'

export const ToastProvider = () => {
    const { theme } = useTheme()

    return (
        <Toaster
            theme={theme}
            position="bottom-center"
            toastOptions={{
                className:
                    'bg-white/95 dark:bg-[#1e1c28]/95 border border-black/10 dark:border-white/10 text-neutral-900 dark:text-white backdrop-blur-xl',
                style: {
                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
                },
            }}
        />
    )
}
