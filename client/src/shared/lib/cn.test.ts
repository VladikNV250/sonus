import { describe, expect, it } from 'vitest'

import { cn } from './cn'

describe('cn utility', () => {
    it('merges tailwind classes properly', () => {
        expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white')
    })

    it('handles conditional classes properly', () => {
        const isTrue = true
        const isFalse = false
        // clsx handles the conditionals, twMerge merges them
        expect(cn('base-class', isTrue && 'true-class', isFalse && 'false-class')).toBe(
            'base-class true-class',
        )
    })

    it('resolves tailwind class conflicts using twMerge', () => {
        // twMerge should pick the last one that conflicts (px-4 overrides p-2 horizontally)
        // Actually p-2 and px-4 conflict, the last one wins its specific axes.
        expect(cn('p-2', 'px-4')).toBe('p-2 px-4') // well, p-2 sets all, px-4 overrides x. twMerge handles it intelligently.
        expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500') // blue wins because it comes later
    })

    it('handles arrays and undefined', () => {
        expect(cn(['foo', 'bar'], undefined, null, 'baz')).toBe('foo bar baz')
    })
})
