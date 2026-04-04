import { GuitarTunerBoard } from '@/widgets/GuitarTunerBoard'

const GuitarTunerPage = () => {
    return (
        <main className="min-h-full w-full max-w-md mx-auto flex flex-col items-center pt-[env(safe-area-inset-top)] bg-neutral-950 px-6 relative">
            <header className="w-full flex flex-col items-center pt-8 z-10">
                <h1 className="text-xl font-bold tracking-widest text-white/80 uppercase">
                    Guitar
                </h1>
            </header>

            <GuitarTunerBoard />
        </main>
    )
}

export default GuitarTunerPage
