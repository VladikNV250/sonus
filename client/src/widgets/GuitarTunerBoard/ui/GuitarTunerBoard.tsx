import { Loader, Plus } from 'lucide-react'
import { type FC, useState } from 'react'

import { PresetSelector, usePresetSelection } from '@/entities/presets'
import { CreatePresetSheet } from '@/features/add-custom-preset'
import { DeletePresetButton } from '@/features/delete-preset'

import { PresetTuner } from './PresetTuner'

export const GuitarTunerBoard: FC = () => {
    const { presets, isLoading, isError, selectedPreset, setSelectedPresetId } =
        usePresetSelection()
    const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false)

    if (isLoading) return <Loader className="animate-spin" />
    if (isError) return <p className="mt-8 text-sm text-red-300">Failed to load presets.</p>

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
                    className="flex items-center cursor-pointer justify-center w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60 hover:text-neutral-900 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 hover:border-black/20 dark:hover:border-white/20 active:scale-95 transition-all duration-150"
                >
                    <Plus className="size-5" />
                </button>
                {selectedPreset && <DeletePresetButton presetId={selectedPreset.id} />}
            </div>

            {selectedPreset ? (
                <PresetTuner key={selectedPreset.id} selectedPreset={selectedPreset} />
            ) : (
                <p className="mt-10 text-sm text-neutral-500 dark:text-white/60">
                    No presets yet. Create one to start tuning.
                </p>
            )}

            <CreatePresetSheet
                isOpen={isCreateSheetOpen}
                onClose={() => setIsCreateSheetOpen(false)}
            />
        </>
    )
}
