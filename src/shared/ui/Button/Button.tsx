import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/shared/lib'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'

import { type ButtonVariants, buttonVariants } from './variants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, type = 'button', size, onClick, ...props }, ref) => {
        const { playSound } = useAppSounds()

        return (
            <button
                ref={ref}
                type={type}
                className={cn(buttonVariants({ variant, size, className }))}
                onClick={(e) => {
                    playSound('click')
                    onClick?.(e)
                }}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'
