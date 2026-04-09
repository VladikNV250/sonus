import type { FC } from 'react'

import { GlassPanel, SegmentedControl } from '@/shared/ui'

const options = [
    { label: 'Auto', value: 'auto' },
    { label: 'Manual', value: 'manual' },
]

// TODO: same situation as in StartListeningScreen, make it more smart
interface Props {
    mode: 'auto' | 'manual'
    setMode: (mode: 'auto' | 'manual') => void
}

export const TuningModeToggle: FC<Props> = ({ mode, setMode }) => {
    return (
        <GlassPanel className="p-1.5 rounded-[22px] shadow-2xl">
            <SegmentedControl
                options={options}
                value={mode}
                onChange={(val) => setMode(val as 'auto' | 'manual')}
            />
        </GlassPanel>
    )
}
