import { Loader, Plus } from 'lucide-react'
import { type FC, useState } from 'react'

import { PresetSelector, usePresetSelection } from '@/entities/presets'
import { CreatePresetSheet } from '@/features/add-custom-preset'
import { DeletePresetButton } from '@/features/delete-preset'
import { Button } from '@/shared/ui'

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
                <Button
                    variant="icon"
                    size="icon-sm"
                    onClick={() => setIsCreateSheetOpen(true)}
                    aria-label="Create new preset"
                    className="rounded-2xl"
                >
                    <Plus className="size-5" />
                </Button>
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
