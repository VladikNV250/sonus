import { cva, type VariantProps } from 'class-variance-authority'

export const segmentedControlVariants = cva(
    'flex p-1 rounded-2xl bg-black/5 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-inner',
)

const isActive = {
    true: 'text-neutral-900 dark:text-white',
    false: 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200',
}

export const segmentedControlItemVariants = cva(
    'relative flex-1 py-3 px-6 text-sm font-semibold rounded-xl transition-all duration-300 z-10 cursor-pointer',
    {
        variants: {
            isActive,
        },
        defaultVariants: {
            isActive: false,
        },
    },
)

export type SegmentedControlVariants = VariantProps<typeof segmentedControlVariants>
export type SegmentedControlItemVariants = VariantProps<typeof segmentedControlItemVariants>
