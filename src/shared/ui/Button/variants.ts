import { cva, type VariantProps } from 'class-variance-authority'

const variant = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    glass: 'bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20',
    danger: 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20',
    ghost: 'text-neutral-500 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white',
    save: 'font-semibold text-violet-400 disabled:text-gray-500',
    'danger-ghost': 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
    icon: 'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20',
    'icon-danger':
        'bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60 hover:text-red-500 dark:hover:text-red-400 hover:bg-black/10 dark:hover:bg-white/10 hover:border-red-500/30 dark:hover:border-red-400/30',
}

const size = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-14 px-6 text-base',
    lg: 'h-16 px-8 text-lg',
    icon: 'h-14 w-14',
    'icon-sm': 'h-11 w-11',
}

export const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    {
        variants: {
            variant,
            size,
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
