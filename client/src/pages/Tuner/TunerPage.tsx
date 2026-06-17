import { type FC } from 'react'

import { TunerBoard } from '@/widgets/TunerBoard'

const TunerPage: FC = () => {
    return (
        <main className="h-full min-h-[600px] w-full max-w-md mx-auto flex flex-col items-center justify-between relative overflow-hidden bg-neutral-50 dark:bg-neutral-950 font-sans">
            <title>Sonus</title>
            <meta
                name="description"
                content="A precise chromatic tuner for guitar and other instruments."
            />
            <header className="w-full flex flex-col items-center justify-center p-6 z-10 pt-[env(safe-area-inset-top)]">
                <h1 className="text-xl font-bold tracking-widest text-neutral-800/80 dark:text-white/80 uppercase mt-4">
                    Sonus
                </h1>
                <h4 className="text-xs font-medium text-neutral-500/80 dark:text-white/40 tracking-[0.2em] uppercase mt-1.5">
                    Chromatic Tuner
                </h4>
            </header>
            <TunerBoard />
        </main>
    )
}

export default TunerPage
