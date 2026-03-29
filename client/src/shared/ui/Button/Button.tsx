import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/shared/lib'

import { type ButtonVariants, buttonVariants } from './variants'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, type = 'button', size, ...props }, ref) => {
        return (
            <button
                ref={ref}
                type={type}
                className={cn(buttonVariants({ variant, size, className }))}
                {...props}
            />
        )
    },
)
Button.displayName = 'Button'
