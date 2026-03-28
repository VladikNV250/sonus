import { NoteDisplay, PitchIndicator, TunerBackground } from '@/entities/pitch'
import { ManualTargetSelector, TuningModeToggle, usePitchDetection } from '@/features/tuner-control'

import { ListeningLoader } from './ListeningLoader'

export const TunerBoard = () => {
    const { pitchData, mode, setMode, targetPitch, changeTargetPitch, isPerfect } =
        usePitchDetection()

    return (
        <>
            <TunerBackground pitchData={pitchData} />

            <section className="flex-1 w-full flex flex-col items-center justify-center z-10 px-6 pb-28">
                {pitchData ? (
                    <div className="flex flex-col items-center gap-12 w-full animate-in fade-in zoom-in duration-300">
                        <PitchIndicator cents={pitchData.cents} isPerfect={isPerfect} />
                        <NoteDisplay pitchData={pitchData} isPerfect={isPerfect} />
                    </div>
                ) : (
                    <ListeningLoader />
                )}
            </section>

            <section className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-[320px] px-6 z-20">
                <ManualTargetSelector
                    mode={mode}
                    targetPitch={targetPitch}
                    changeTargetPitch={changeTargetPitch}
                />

                <TuningModeToggle mode={mode} setMode={setMode} />
            </section>
        </>
    )
}
