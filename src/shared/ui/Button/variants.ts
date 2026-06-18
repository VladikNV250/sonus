import { cva, type VariantProps } from 'class-variance-authority'

const variant = {
    primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20',
    secondary: 'bg-neutral-800 text-white hover:bg-neutral-700',
    glass: 'bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/20',
    danger: 'bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20',
}

const size = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-14 px-6 text-base',
    lg: 'h-16 px-8 text-lg',
    icon: 'h-14 w-14',
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
