class PitchProcessor extends AudioWorkletProcessor {
    bufferSize: number
    buffer: Float32Array
    framesFilled: number

    constructor() {
        super()

        this.bufferSize = 2048
        this.buffer = new Float32Array(this.bufferSize)
        this.framesFilled = 0
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
                const pitch = this.calculatePitch(this.buffer)

                if (pitch > 0) {
                    this.port.postMessage({ type: 'pitch', frequency: pitch })
                }

                this.framesFilled = 0
            }
        })

        return true
    }

    private calculatePitch(buffer: Float32Array): number {
        // eslint-disable-next-line no-console
        console.log(buffer)
        return 0
    }
}

registerProcessor('pitch-processor', PitchProcessor)
