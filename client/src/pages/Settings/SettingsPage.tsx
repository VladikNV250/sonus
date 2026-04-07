import { Activity, Bug, Settings, Volume2 } from 'lucide-react'

import { useDebugAudioContext } from '@/features/audio/model'
import { GlassPanel, ListTile, Switch } from '@/shared/ui'

export const SettingsPage = () => {
    const { isDebug, toggleDebugMode, debugFrequency, setDebugFrequency, isMuted, toggleMute } =
        useDebugAudioContext()

    return (
        <div className="flex flex-col h-full bg-neutral-950 p-6 pt-12 overflow-y-auto w-full">
            <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
                <div className="flex items-center gap-3 px-2">
                    <Settings className="text-white" size={28} />
                    <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
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
                                    className="w-20 bg-neutral-900/50 text-white text-right px-3 py-1.5 rounded-lg border border-white/10 outline-none focus:border-white/30 focus:bg-neutral-800 transition-colors font-medium"
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
