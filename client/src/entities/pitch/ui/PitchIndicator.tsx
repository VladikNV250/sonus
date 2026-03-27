import { type FC } from 'react'

import { cn } from '@/shared/lib'

import type { PitchData } from '../model'

interface Props {
    cents: PitchData['cents']
    isPerfect: boolean
}

export const PitchIndicator: FC<Props> = ({ cents, isPerfect }) => {
    const offset = (Math.max(-50, Math.min(50, cents)) / 50) * 50

    return (
        <div className="relative w-full max-w-[320px] h-20 flex items-center justify-center">
            <div className="w-full h-[3px] bg-white/10 rounded-full relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[3px] h-8 bg-white/30 -translate-y-1/2 rounded-full" />
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-0.5 h-4 bg-white/10 -translate-y-1/2 rounded-full" />
                <div className="absolute top-1/2 left-3/4 -translate-x-1/2 w-0.5 h-4 bg-white/10 -translate-y-1/2 rounded-full" />

                <div
                    className="absolute top-1/2 transition-all duration-50 pointer-events-none"
                    style={{
                        left: `calc(50% + ${offset}%)`,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <div
                        className={cn(
                            'w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors shadow-[0_0_10px_rgba(255,255,255,0.6)]',
                            isPerfect ? 'bg-green-400' : 'bg-white',
                        )}
                    />

                    <div
                        className={cn(
                            'absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 flex items-center justify-center min-w-[40px] h-[40px] rounded-full font-mono text-[13px] font-bold shadow-[0_4px_15px_rgba(255,255,255,0.3)] transition-all duration-50',
                            isPerfect
                                ? 'bg-green-400 text-black scale-110 shadow-green-500/50'
                                : 'bg-white text-black',
                        )}
                    >
                        {cents > 0 ? '+' : ''}
                        {Math.round(cents)}

                        <div
                            className={cn(
                                'absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px]',
                                isPerfect ? 'border-t-green-400' : 'border-t-white',
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
