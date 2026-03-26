import { type FC } from 'react'

import { usePitchDetection } from '@/features/tuner-control'
import { cn } from '@/shared/lib'

const TunerPage: FC = () => {
    const { pitchData, isStarted, startDetection } = usePitchDetection()
    return (
        <main className="p-32 h-screen w-screen bg-blue-50">
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Pesun Guitar</h1>
            <div
                className={cn(
                    'fixed top-0 left-0 w-full h-full bg-white/10 backdrop-blur-xs flex items-center justify-center mb-4',
                    isStarted && 'hidden',
                )}
            >
                <button
                    className="rounded px-6 py-2 font-bold text-white transition-colors bg-red-500 hover:bg-red-600 cursor-pointer"
                    onClick={() => void startDetection()}
                    disabled={isStarted}
                >
                    {isStarted ? 'Listening...' : 'Start'}
                </button>
            </div>
            {pitchData && (
                <div className="flex items-center flex-col gap-4">
                    <p className="text-2xl font-bold text-blue-900">
                        {pitchData?.note + pitchData?.octave}
                    </p>
                    <div className="flex items-center gap-4">
                        <p className="text-2xl font-bold text-blue-900 size-20 flex items-center justify-center rounded-full bg-white border border-amber-400 ">
                            {pitchData.cents}
                        </p>

                        <p className="text-2xl font-bold text-blue-900">
                            {pitchData.cents < 0 ? 'Tune Up' : 'Tune Down'}
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}

export default TunerPage
