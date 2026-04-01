import { type FC } from 'react'

import guitarImage from '@/../public/guitar-headstock.png'
import { PitchIndicator, TuningStatusBadge } from '@/entities/pitch'
import { PresetSelector } from '@/entities/presets'
import { StringButton } from '@/features/guitar-tuning'

import { STRING_BUTTON_POSITIONS } from '../consts'
import { useGuitarTunerBoard } from '../model'

export const GuitarTunerBoard: FC = () => {
    const { selectedPreset, activeString, pitchData, isPerfect, selectPreset, selectString } =
        useGuitarTunerBoard()

    return (
        <>
            <div className="w-full flex justify-center">
                <PresetSelector selectedPreset={selectedPreset} onSelectPreset={selectPreset} />
            </div>

            <div className="flex flex-col items-center w-full mt-16">
                <PitchIndicator cents={pitchData?.cents ?? 0} isPerfect={isPerfect} />
                <TuningStatusBadge cents={pitchData?.cents ?? null} isPerfect={isPerfect} />
            </div>

            <section className="flex-1 w-full max-w-sm flex items-end justify-center relative mt-6 pb-16">
                <div className="absolute -bottom-1/10 flex flex-col items-center justify-center pointer-events-none">
                    <img src={guitarImage} alt="Guitar" className="" />
                </div>

                <div className="w-full h-[320px] relative z-10">
                    {selectedPreset.strings.map((pitch, index) => (
                        <StringButton
                            // eslint-disable-next-line react/no-array-index-key
                            key={pitch.note + pitch.octave + index}
                            pitch={pitch}
                            selectedString={activeString}
                            stringNumber={index}
                            onSelect={() => selectString(index)}
                            position={STRING_BUTTON_POSITIONS[index]}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}
