import { Activity, Bug, Download, Palette, Settings, Upload, Volume2 } from 'lucide-react'

import { useDebugAudioContext } from '@/features/audio/model'
import { ExportPresetsButton } from '@/features/export-presets'
import { ImportPresetsButton } from '@/features/import-presets'
import { type Theme, useTheme } from '@/shared/lib'
import { GlassPanel, ListTile, SegmentedControl, Switch } from '@/shared/ui'

export const SettingsPage = () => {
    const { theme, setTheme } = useTheme()
    const { isDebug, toggleDebugMode, debugFrequency, setDebugFrequency, isMuted, toggleMute } =
        useDebugAudioContext()

    return (
        <div className="flex flex-col h-full bg-neutral-50 dark:bg-neutral-950 p-6 pt-12 overflow-y-auto w-full">
            <title>Settings — Sonus</title>
            <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
                <div className="flex items-center gap-3 px-2">
                    <Settings className="text-neutral-900 dark:text-white" size={28} />
                    <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                        Settings
                    </h1>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <span className="px-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        Appearance
                    </span>
                    <GlassPanel className="flex flex-col overflow-hidden p-0">
                        <ListTile
                            icon={<Palette className="text-purple-400" size={20} />}
                            title="Theme"
                            description="Select application theme"
                            hasBorder={false}
                            action={
                                <SegmentedControl
                                    options={[
                                        { label: 'Light', value: 'light' },
                                        { label: 'Dark', value: 'dark' },
                                    ]}
                                    value={theme}
                                    onChange={(v) => setTheme(v as Theme)}
                                />
                            }
                        />
                    </GlassPanel>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <span className="px-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        Presets
                    </span>
                    <GlassPanel className="flex flex-col overflow-hidden p-0">
                        <ListTile
                            icon={<Download className="text-blue-500" size={20} />}
                            title="Export Presets"
                            description="Save your custom presets to a file"
                            action={<ExportPresetsButton />}
                        />
                        <ListTile
                            icon={<Upload className="text-emerald-500" size={20} />}
                            title="Import Presets"
                            description="Load presets from a file"
                            hasBorder={false}
                            action={<ImportPresetsButton />}
                        />
                    </GlassPanel>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <span className="px-2 text-xs font-bold text-neutral-500 uppercase tracking-widest">
                        Developer
                    </span>
                    <GlassPanel className="flex flex-col overflow-hidden p-0">
                        <ListTile
                            icon={<Bug className="text-orange-400" size={20} />}
                            title="Debug Audio Input"
                            description="Mocks input wave"
                            action={
                                <Switch
                                    ariaLabel="Toggle debug audio input"
                                    checked={isDebug}
                                    onChange={() => toggleDebugMode()}
                                />
                            }
                        />

                        <ListTile
                            icon={<Volume2 className="text-blue-400" size={20} />}
                            title="Oscillator Sound"
                            description="Hear the debug tone"
                            action={
                                <Switch
                                    ariaLabel="Toggle oscillator sound"
                                    checked={!isMuted}
                                    onChange={() => toggleMute()}
                                />
                            }
                        />

                        <ListTile
                            icon={<Activity className="text-emerald-400" size={20} />}
                            title="Frequency"
                            description="Hz value"
                            hasBorder={false}
                            action={
                                <input
                                    type="number"
                                    aria-label="Debug frequency in hertz"
                                    value={debugFrequency}
                                    onChange={(e) => setDebugFrequency(Number(e.target.value))}
                                    className="w-20 bg-black/5 dark:bg-neutral-900/50 text-neutral-900 dark:text-white text-right px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 outline-none focus:border-black/30 dark:focus:border-white/30 focus:bg-black/10 dark:focus:bg-neutral-800 transition-colors font-medium"
                                />
                            }
                        />
                    </GlassPanel>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage
