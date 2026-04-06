import { cn } from '@/shared/lib'

interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
    className?: string
}

export const Switch = ({ checked, onChange, className }: SwitchProps) => {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={cn(
                'relative inline-flex h-[28px] w-[48px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none',
                checked ? 'bg-orange-500' : 'bg-neutral-700',
                className,
            )}
        >
            <span
                className={cn(
                    'pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-md transition duration-300 ease-in-out',
                    checked ? 'translate-x-[20px]' : 'translate-x-0',
                )}
            />
        </button>
    )
}
