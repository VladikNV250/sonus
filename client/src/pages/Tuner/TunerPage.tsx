import { type FC, useRef, useState } from 'react'

import { initGuitarInput, pitchProcessorUrl } from '@/core'

const TunerPage: FC = () => {
    const audioContextRef = useRef<AudioContext | null>(null)
    const pitchProcessorRef = useRef<AudioWorkletNode | null>(null)
    const [frequency, setFrequency] = useState(0)

    const [isStarted, setIsStarted] = useState(false)

    const handleInitAudio = async () => {
        if (isStarted) return

        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new window.AudioContext()
            }

            const audioContext = audioContextRef.current

            if (audioContext.state === 'suspended') {
                await audioContext.resume()
            }

            await audioContext.audioWorklet.addModule(pitchProcessorUrl)
            const guitarSource = await initGuitarInput(audioContext)

            const pitchProcessorNode = new AudioWorkletNode(audioContext, 'pitch-processor')
            pitchProcessorRef.current = pitchProcessorNode

            pitchProcessorNode.port.onmessage = (event) => {
                const { type, frequency } = event.data as { type: string; frequency: number }

                if (type === 'frequency') {
                    setFrequency(frequency)
                }
            }

            guitarSource?.connect(pitchProcessorNode)

            setIsStarted(true)
        } catch (error) {
            console.error('❌ Failed to initialize audio pipeline:', error)
        }
    }

    return (
        <main className="p-32 h-screen w-screen bg-blue-50">
            <h1 className="text-4xl font-bold text-center text-blue-900 mb-8">Pesun Guitar</h1>
            <div className="flex justify-center mb-4">
                <button
                    className={`rounded px-6 py-2 font-bold text-white transition-colors ${
                        isStarted
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 cursor-pointer'
                    }`}
                    onClick={() => void handleInitAudio()}
                    disabled={isStarted}
                >
                    {isStarted ? 'Listening...' : 'Start'}
                </button>
            </div>
            <div className="flex justify-center">
                <p className="text-2xl font-bold text-blue-900">{frequency.toFixed(1)} Hz</p>
            </div>
        </main>
    )
}

export default TunerPage
