import { type FC } from 'react'

import guitarImage from '@/../public/guitar-headstock.png'
import { PitchIndicator, STRING_LABELS, TuningStatusBadge } from '@/entities/pitch'
import type { Preset } from '@/entities/presets'
import { StringButton } from '@/features/guitar-tuning'

import { STRING_BUTTON_POSITIONS } from '../consts'
import { usePresetTuner } from '../model'

interface Props {
    selectedPreset: Preset | null
}

export const PresetTuner: FC<Props> = ({ selectedPreset }) => {
    const { activeString, pitchData, isPerfect, selectString } = usePresetTuner(selectedPreset)

    return (
        <>
            <div className="flex flex-col items-center w-full mt-16">
                <PitchIndicator cents={pitchData?.cents ?? 0} isPerfect={isPerfect} />
                <TuningStatusBadge cents={pitchData?.cents ?? null} isPerfect={isPerfect} />
            </div>

            <section className="flex-1 w-full max-w-sm flex items-end justify-center relative mt-6 pb-16">
                <div className="absolute -bottom-1/10 flex flex-col items-center justify-center pointer-events-none">
                    <img src={guitarImage} alt="Guitar" className="" />
                </div>

                <div className="w-full h-[320px] relative z-10">
                    {selectedPreset?.strings.map((pitch, index) => (
                        <StringButton
                            key={STRING_LABELS[index]}
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
