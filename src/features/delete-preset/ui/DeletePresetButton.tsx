import { Trash2 } from 'lucide-react'
import { type FC, useState } from 'react'

import { type Preset } from '@/entities/presets'
import { Button, ConfirmDialog } from '@/shared/ui'

import { useDeletePreset } from '../model'

interface Props {
    presetId: Preset['id']
}

export const DeletePresetButton: FC<Props> = ({ presetId }) => {
    const { mutate, isPending } = useDeletePreset()
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    return (
        <>
            <Button
                variant="icon-danger"
                size="icon-sm"
                onClick={() => setIsConfirmOpen(true)}
                disabled={isPending}
                aria-label="Delete preset"
                className="rounded-2xl"
            >
                <Trash2 className="size-5" />
            </Button>

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
