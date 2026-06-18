import { Upload } from 'lucide-react'
import { type FC, useRef } from 'react'

import { useImportPresets } from '../model/useImportPresets'

export const ImportPresetsButton: FC = () => {
    const { importFile, isImporting } = useImportPresets()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            importFile(file)
        }
        // Reset input so the same file can be imported again if needed
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <>
            <input
                type="file"
                accept=".json,application/json"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isImporting}
                className="flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer active:scale-95 disabled:cursor-default disabled:opacity-50"
            >
                <Upload size={16} />
                {isImporting ? 'Importing...' : 'Import'}
            </button>
        </>
    )
}
