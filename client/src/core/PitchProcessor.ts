class PitchProcessor extends AudioWorkletProcessor {
    bufferSize: number
    buffer: Float32Array
    framesFilled: number
    sampleRate: number

    constructor() {
        super()

        this.bufferSize = 2048
        this.buffer = new Float32Array(this.bufferSize)
        this.framesFilled = 0
        this.sampleRate = 48000
    }

    process(
        inputs: Float32Array[][],
        _outputs: Float32Array[][],
        _parameters: Record<string, Float32Array>,
    ) {
        const input = inputs[0]
        if (input.length === 0) return true

        const channelData = input[0]
        channelData.forEach((sample) => {
            this.buffer[this.framesFilled] = sample
            this.framesFilled++

            if (this.framesFilled >= this.bufferSize) {
                const frequency = this.calculateFrequency(this.buffer, this.sampleRate)

                if (frequency > 0) {
                    this.port.postMessage({ type: 'frequency', frequency })
                }

                this.framesFilled = 0
            }
        })

        return true
    }

    private calculateFrequency(buffer: Float32Array, sampleRate: number): number {
        let rms = 0
        buffer.forEach((sample) => {
            rms += sample * sample
        })
        rms = Math.sqrt(rms / buffer.length)

        if (rms < 0.005) return 0

        let bestLag = -1
        let maxCorrelation = 0
        let foundDrop = false

        for (let lag = 1; lag < buffer.length / 2; lag++) {
            let correlation = 0
            for (let i = 0; i < buffer.length - lag; i++) {
                correlation += buffer[i] * buffer[i + lag]
            }

            if (!foundDrop && correlation < 0) {
                foundDrop = true
                continue
            }

            if (foundDrop && correlation > 0) {
                if (correlation > maxCorrelation) {
                    maxCorrelation = correlation
                    bestLag = lag
                } else if (correlation < maxCorrelation * 0.1) {
                    break
                }
            }
        }

        if (bestLag === -1) return 0

        return sampleRate / bestLag
    }
}

registerProcessor('pitch-processor', PitchProcessor)
