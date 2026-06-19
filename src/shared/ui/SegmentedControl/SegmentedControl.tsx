import { cn } from '@/shared/lib'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

import {
    segmentedControlItemVariants,
    type SegmentedControlVariants,
    segmentedControlVariants,
} from './variants'

export interface SegmentedControlProps extends SegmentedControlVariants {
    options: { label: string; value: string }[]
    value: string
    onChange: (value: string) => void
    className?: string
}

export const SegmentedControl = ({
    options,
    value,
    onChange,
    className,
}: SegmentedControlProps) => {
    const { playSound } = useAppSounds()

    return (
        <div className={cn(segmentedControlVariants({ className }))}>
            {options.map((option) => {
                const isActive = option.value === value
                return (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => {
                            playSound('click')
                            onChange(option.value)
                        }}
                        className={cn(segmentedControlItemVariants({ isActive }))}
                    >
                        {isActive && (
                            <span className="absolute inset-0 bg-white dark:bg-neutral-800 border border-black/5 dark:border-white/5 rounded-xl shadow-md z-[-1]" />
                        )}
                        {option.label}
                    </button>
                )
            })}
        </div>
    )
}
