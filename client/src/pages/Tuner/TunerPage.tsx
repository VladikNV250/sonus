import { type FC } from 'react'

import { NOTES } from '@/core'
import { usePitchDetection } from '@/features/tuner-control'
import { cn } from '@/shared/lib'

const TunerPage: FC = () => {
    const { pitchData, isStarted, startDetection, mode, setMode, targetPitch, changeTargetPitch } =
        usePitchDetection()

    return (
        <main className="p-32 h-screen w-screen bg-blue-50">
            <header className="fixed top-0 left-0 flex items-center px-10 py-8 justify-between w-full">
                <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Sonus</h1>
                <div className="flex items-start gap-4">
                    <button
                        onClick={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
                        className={cn(
                            'rounded px-6 py-2 font-bold text-white transition-colors cursor-pointer',
                            mode === 'auto'
                                ? 'bg-red-500 hover:bg-red-600'
                                : 'bg-blue-500 hover:bg-blue-600',
                        )}
                    >
                        Auto
                    </button>
                    <div className="space-y-2">
                        <button
                            onClick={() => setMode(mode === 'auto' ? 'manual' : 'auto')}
                            className={cn(
                                'rounded px-6 py-2 font-bold text-white transition-colors cursor-pointer',
                                mode === 'manual'
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-blue-500 hover:bg-blue-600',
                            )}
                        >
                            Manual
                        </button>
                        <div className="flex items-center justify-between">
                            <select
                                value={targetPitch?.note}
                                onChange={(e) => changeTargetPitch(e, 'note')}
                            >
                                {NOTES.map((note) => (
                                    <option key={note} value={note}>
                                        {note}
                                    </option>
                                ))}
                            </select>
                            <select
                                value={targetPitch?.octave}
                                onChange={(e) => changeTargetPitch(e, 'octave')}
                            >
                                {Array.from({ length: 7 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </header>

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
                            {pitchData.cents === 0
                                ? 'Perfect'
                                : pitchData.cents < 0
                                  ? 'Tune Up'
                                  : 'Tune Down'}
                        </p>
                    </div>
                </div>
            )}
        </main>
    )
}

export default TunerPage
