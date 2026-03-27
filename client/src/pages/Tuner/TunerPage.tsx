import { type FC } from 'react'

import { TunerBoard } from '@/widgets/TunerBoard'

const TunerPage: FC = () => {
    // Small haptic feedback when perfectly in tune

    return (
        <main className="h-full min-h-[600px] w-full max-w-md mx-auto flex flex-col items-center justify-between relative overflow-hidden bg-neutral-950 font-sans">
            <header className="w-full flex items-center justify-center p-6 z-10 pt-[env(safe-area-inset-top)]">
                <h1 className="text-xl font-bold tracking-widest text-white/80 uppercase mt-4">
                    Sonus
                </h1>
            </header>
            <TunerBoard />
        </main>
    )
}

export default TunerPage
