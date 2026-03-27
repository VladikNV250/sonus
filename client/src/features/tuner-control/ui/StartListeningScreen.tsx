import type { FC } from 'react'

import { Button, GlassPanel } from '@/shared/ui'

// TODO: add global state to make component more smart
// for now, it's just a UI component that just pass callback for function
// without implementing any logic of starting listening
interface Props {
    isStarted: boolean
    onStart: () => void
}

export const StartListeningScreen: FC<Props> = ({ isStarted, onStart }) => {
    if (isStarted) return null

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-neutral-950/70 backdrop-blur-xl animate-in fade-in duration-300">
            <GlassPanel className="p-8 flex flex-col items-center gap-6 w-full max-w-sm shadow-2xl">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-4xl mb-2 border border-white/5 shadow-inner">
                    🎙️
                </div>
                <h2 className="text-2xl font-bold text-white text-center tracking-tight">
                    Ready to Tune?
                </h2>
                <p className="text-neutral-400 text-center mb-4 max-w-[250px] text-sm leading-relaxed">
                    Start the tuner and allow microphone access to begin.
                </p>
                <Button size="lg" onClick={onStart} className="w-full shadow-blue-500/20 shadow-xl">
                    Start Listening
                </Button>
            </GlassPanel>
        </div>
    )
}
