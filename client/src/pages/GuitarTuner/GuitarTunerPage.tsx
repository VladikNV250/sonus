import { useState } from 'react'

import { cn } from '@/shared/lib'
import { GlassPanel } from '@/shared/ui'

const PRESETS = [
    { id: 'standard', name: 'Standard E', strings: ['E2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
    {
        id: 'half-step-down',
        name: 'Half Step Down',
        strings: ['D#2', 'G#2', 'C#3', 'F#3', 'A#3', 'D#4'],
    },
    { id: 'drop-d', name: 'Drop D', strings: ['D2', 'A2', 'D3', 'G3', 'B3', 'E4'] },
]

const GuitarTunerPage = () => {
    const [selectedPreset, setSelectedPreset] = useState(PRESETS[0])
    const [activeString, setActiveString] = useState<number | null>(null)
    const [mockCents, setMockCents] = useState(0)

    const handleStringClick = (index: number) => {
        setActiveString(index)
        // Deterministic mock out-of-tune value for UI demo
        const mockValues = [-15, 0, 25, -2, -28, 12]
        setMockCents(mockValues[index % mockValues.length])
    }

    return (
        <main className="min-h-full w-full max-w-md mx-auto flex flex-col items-center pt-[env(safe-area-inset-top)] pb-32 bg-neutral-950 px-6 relative">
            <header className="w-full flex flex-col items-center pt-8 z-10">
                <h1 className="text-xl font-bold tracking-widest text-white/80 uppercase">
                    Guitar
                </h1>

                {/* Preset Dropdown mock */}
                <div className="mt-6 w-full max-w-[200px] relative z-20 animate-in fade-in slide-in-from-top-4 duration-500">
                    <select
                        value={selectedPreset?.id || 'standard'}
                        onChange={(e) => {
                            const preset = PRESETS.find((p) => p.id === e.target.value)
                            if (preset) {
                                setSelectedPreset(preset)
                                setActiveString(null)
                            }
                        }}
                        className="w-full appearance-none bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl px-5 py-3 text-center text-sm font-semibold outline-none focus:bg-white/10 transition-colors cursor-pointer"
                    >
                        {PRESETS.map((preset) => (
                            <option
                                key={preset.id}
                                value={preset.id}
                                className="bg-neutral-900 text-white"
                            >
                                {preset.name}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50 text-[10px]">
                        ▼
                    </div>
                </div>
            </header>

            {/* Interactive Guitar Section */}
            <section className="flex-1 w-full max-w-sm flex items-center justify-center relative mt-6">
                {/* Visual Placeholder for the Guitar Headstock */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40 pointer-events-none">
                    <div className="w-20 h-[300px] border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
                        <span className="text-white/40 text-xs font-semibold uppercase text-center w-min rotate-90 tracking-widest leading-relaxed">
                            Guitar Headstock
                        </span>
                    </div>
                </div>

                {/* String Buttons */}
                <div className="w-full h-[320px] relative z-10">
                    {[0, 1, 2].map((i) => {
                        // Left strings: Typically thickest (E2, A2, D3)
                        const isActive = activeString === i
                        const note = selectedPreset?.strings[i]
                        return (
                            <button
                                key={`left-${i}`}
                                onClick={() => handleStringClick(i)}
                                className={cn(
                                    'absolute flex items-center justify-center w-[52px] h-[52px] rounded-full border-[2.5px] transition-all duration-300 bg-neutral-900/90 backdrop-blur-md cursor-pointer',
                                    isActive
                                        ? 'border-amber-400 text-amber-400 scale-[1.15] shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                                        : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white',
                                )}
                                style={{ top: `${i * 38}%`, left: '8%' }}
                            >
                                <span className="font-bold text-lg">
                                    {note?.replace(/[\d]/, '')}
                                </span>
                                <span className="text-[10px] ml-0.5 mt-2 opacity-60 font-semibold">
                                    {note?.match(/[\d]/)?.[0]}
                                </span>
                            </button>
                        )
                    })}
                    {[3, 4, 5].map((i) => {
                        // Right strings: Thinnest (G3, B3, E4)
                        const index = 5 - (i - 3) // Bottom up: 5, 4, 3
                        const isActive = activeString === index
                        const note = selectedPreset?.strings[index]
                        return (
                            <button
                                key={`right-${i}`}
                                onClick={() => handleStringClick(index)}
                                className={cn(
                                    'absolute flex items-center justify-center w-[52px] h-[52px] rounded-full border-[2.5px] transition-all duration-300 bg-neutral-900/90 backdrop-blur-md cursor-pointer',
                                    isActive
                                        ? 'border-amber-400 text-amber-400 scale-[1.15] shadow-[0_0_25px_rgba(251,191,36,0.2)]'
                                        : 'border-white/20 text-white/70 hover:border-white/40 hover:text-white',
                                )}
                                style={{ top: `${(i - 3) * 38}%`, right: '8%' }}
                            >
                                <span className="font-bold text-lg">
                                    {note?.replace(/[\d]/, '')}
                                </span>
                                <span className="text-[10px] ml-0.5 mt-2 opacity-60 font-semibold">
                                    {note?.match(/[\d]/)?.[0]}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </section>

            {/* Active Tuning UI Bottom Indicator (Mock) */}
            {activeString !== null && (
                <div className="w-full absolute bottom-[120px] left-0 px-6 pointer-events-none">
                    <GlassPanel
                        intensity="heavy"
                        className="p-6 pb-8 relative overflow-hidden flex flex-col items-center animate-in slide-in-from-bottom-6 fade-in duration-300 shadow-2xl"
                    >
                        <h2 className="text-xs font-bold text-white/40 mb-3 uppercase tracking-widest">
                            String {activeString + 1}
                        </h2>

                        <div className="flex items-center gap-2">
                            <span className="text-6xl font-bold tracking-tighter text-white drop-shadow-md">
                                {selectedPreset?.strings[activeString]?.replace(/[\d]/, '')}
                            </span>
                            <span className="text-2xl font-semibold text-white/60 mt-4">
                                {selectedPreset?.strings[activeString]?.match(/[\d]/)?.[0]}
                            </span>
                        </div>

                        {/* Simple visual tuning arc */}
                        <div className="w-full max-w-[200px] mt-6 h-12 relative overflow-hidden">
                            {/* Arc line */}
                            <div className="absolute w-[180%] h-[200px] border-t-2 border-dashed border-white/20 rounded-[50%] left-[50%] -translate-x-1/2 top-4" />
                            {/* Center tick */}
                            <div className="absolute left-[50%] -translate-x-1/2 top-4 w-1 h-5 bg-white/40 rounded-full" />

                            {/* Animated Mock Needle */}
                            <div
                                className={cn(
                                    'absolute top-4 w-1.5 h-8 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.6)] transition-all duration-800 ease-out',
                                    Math.abs(mockCents) < 5
                                        ? 'bg-green-400 shadow-green-500/50'
                                        : mockCents < 0
                                          ? 'bg-amber-400'
                                          : 'bg-red-400',
                                )}
                                style={{
                                    left: `calc(50% + ${(Math.max(-50, Math.min(50, mockCents)) / 50) * 45}%)`,
                                    transform: 'translate(-50%, 0)',
                                    transformOrigin: 'bottom',
                                }}
                            />
                        </div>
                    </GlassPanel>
                </div>
            )}
        </main>
    )
}

export default GuitarTunerPage
