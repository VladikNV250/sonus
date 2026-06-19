import { forwardRef, type InputHTMLAttributes } from 'react'

import { cn } from '@/shared/lib'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, type = 'text', ...props }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={cn(
                    'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-neutral-900 dark:text-white outline-none focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-neutral-500 dark:placeholder:text-white/20',
                    className,
                )}
                {...props}
            />
        )
    },
)
Input.displayName = 'Input'
