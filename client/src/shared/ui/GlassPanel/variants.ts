import { cva, type VariantProps } from 'class-variance-authority'

const intensity = {
    light: 'bg-black/20 backdrop-blur-md border-white/5',
    medium: 'bg-neutral-900/40 backdrop-blur-xl border-white/10',
    heavy: 'bg-white/10 backdrop-blur-2xl border-white/20',
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
