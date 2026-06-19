import { cva, type VariantProps } from 'class-variance-authority'

const intensity = {
    light: 'bg-black/5 dark:bg-black/20 backdrop-blur-md border-black/5 dark:border-white/5',
    medium: 'bg-black/10 dark:bg-neutral-900/40 backdrop-blur-xl border-black/10 dark:border-white/10',
    heavy: 'bg-black/15 dark:bg-white/10 backdrop-blur-2xl border-black/20 dark:border-white/20',
}

export const glassPanelVariants = cva('rounded-3xl border shadow-xl', {
    variants: {
        intensity,
    },
    defaultVariants: {
        intensity: 'medium',
    },
})

export type GlassPanelVariants = VariantProps<typeof glassPanelVariants>
