import { Loader, Plus } from 'lucide-react'
import { type FC, useState } from 'react'

import { PresetSelector, usePresetSelection } from '@/entities/presets'
import { CreatePresetSheet } from '@/features/add-custom-preset'

import { PresetTuner } from './PresetTuner'

export const GuitarTunerBoard: FC = () => {
    const { presets, isLoading, selectedPreset, setSelectedPresetId } = usePresetSelection()
    const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)

    if (isLoading) return <Loader />

    return (
        <>
            <div className="w-full flex mt-6 items-center justify-center gap-4">
                <PresetSelector
                    presets={presets}
                    selectedPreset={selectedPreset}
                    onSelectPreset={setSelectedPresetId}
                />
                <button
                    type="button"
                    onClick={() => setIsCreateSheetOpen(true)}
                    aria-label="Create new preset"
                    className="flex items-center cursor-pointer justify-center w-11 h-11 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-150"
                >
                    <Plus className="size-5" />
                </button>
            </div>

            <PresetTuner key={selectedPreset?.id} selectedPreset={selectedPreset} />

            <CreatePresetSheet
                isOpen={isCreateSheetOpen}
                onClose={() => setIsCreateSheetOpen(false)}
            />
        </>
    )
}
