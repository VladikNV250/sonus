import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

export interface SettingsRowProps {
    icon: ReactNode
    title: string
    description?: string
    action?: ReactNode
    hasBorder?: boolean
    className?: string
}

export const ListTile = ({
    icon,
    title,
    description,
    action,
    hasBorder = true,
    className,
}: SettingsRowProps) => {
    return (
        <div
            className={cn(
                'p-3 pr-4 flex items-center justify-between gap-4 relative bg-black/2 dark:bg-white/1',
                hasBorder && 'border-b border-white/5',
                className,
            )}
        >
            <div className="flex items-center gap-3.5">
                <div className="flex items-center justify-center w-10 h-10 bg-white dark:bg-neutral-800/80 rounded-xl border border-black/5 dark:border-white/5 shrink-0 shadow-sm dark:shadow-none">
                    {icon}
                </div>
                <div className="flex flex-col justify-center">
                    <span className="text-neutral-900 dark:text-white font-medium text-[16px]">
                        {title}
                    </span>
                    {description && (
                        <span className="text-neutral-500 text-[13px] leading-tight">
                            {description}
                        </span>
                    )}
                </div>
            </div>
            {action && <div className="flex items-center shrink-0">{action}</div>}
        </div>
    )
}
