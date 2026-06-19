import { Trash2 } from 'lucide-react'
import { type FC, useState } from 'react'

import { type Preset } from '@/entities/presets'
import { useAppSounds } from '@/shared/lib/audio/useAppSounds'
import { ConfirmDialog } from '@/shared/ui'

import { useDeletePreset } from '../model'

interface Props {
    presetId: Preset['id']
}

export const DeletePresetButton: FC<Props> = ({ presetId }) => {
    const { mutate, isPending } = useDeletePreset()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const { playSound } = useAppSounds()

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    playSound('click')
                    setIsConfirmOpen(true)
                }}
                disabled={isPending}
                aria-label="Delete preset"
                className="flex items-center cursor-pointer justify-center w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-500 dark:text-white/60 hover:text-red-500 dark:hover:text-red-400 hover:bg-black/10 dark:hover:bg-white/10 hover:border-red-500/30 dark:hover:border-red-400/30 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none"
            >
                <Trash2 className="size-5" />
            </button>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={() => mutate(presetId, { onSuccess: () => setIsConfirmOpen(false) })}
                isPending={isPending}
                title="Delete Preset?"
                description="This action cannot be undone. Are you sure you want to delete this preset?"
                confirmText="Delete"
                icon={<Trash2 className="size-6" />}
                variant="danger"
            />
        </>
    )
}
