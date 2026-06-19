import { Mic } from 'lucide-react'
import { type FC, useState } from 'react'

import { useAppSounds } from '@/shared/lib/audio/useAppSounds'
import { Button, GlassPanel } from '@/shared/ui'

interface Props {
    isStarted: boolean
    start: () => Promise<void>
}

export const StartListeningScreen: FC<Props> = ({ isStarted, start }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { playSound } = useAppSounds()

    if (isStarted) return null

    const handleStart = async () => {
        setIsLoading(true)
        try {
            await start()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-neutral-50/70 dark:bg-neutral-950/70 backdrop-blur-xl animate-in fade-in duration-300">
            <GlassPanel className="p-8 flex flex-col items-center gap-6 w-full max-w-sm shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-4xl mb-2 border border-black/5 dark:border-white/5 shadow-inner">
                    <Mic />
                </div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white text-center tracking-tight">
                    Ready to Tune?
                </h2>
                <p className="text-neutral-500 dark:text-neutral-400 text-center mb-4 max-w-[250px] text-sm leading-relaxed">
                    Start the tuner and allow microphone access to begin.
                </p>
                <Button
                    size="lg"
                    onClick={() => {
                        playSound('click')
                        void handleStart()
                    }}
                    disabled={isLoading}
                    className="w-full shadow-blue-500/20 shadow-xl"
                >
                    {isLoading ? 'Starting...' : 'Start Listening'}
                </Button>
            </GlassPanel>
        </div>
    )
}
