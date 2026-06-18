import { Download } from 'lucide-react'
import type { FC } from 'react'

import { useExportPresets } from '../model/useExportPresets'

export const ExportPresetsButton: FC = () => {
    const { exportCustomPresets } = useExportPresets()

    return (
        <button
            type="button"
            onClick={exportCustomPresets}
            className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer active:scale-95 disabled:cursor-default"
        >
            <Download size={16} />
            Export
        </button>
    )
}
