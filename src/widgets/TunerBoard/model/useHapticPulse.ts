import { useEffect } from 'react'

export const useHapticPulse = (isPerfect: boolean) => {
    useEffect(() => {
        if (isPerfect && 'vibrate' in navigator) {
            navigator.vibrate(30)
        }
    }, [isPerfect])
}
