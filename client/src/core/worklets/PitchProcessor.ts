/**
 * AudioWorkletProcessor that uses the YIN algorithm for pitch detection.
 * The YIN algorithm is highly accurate for monotonic pitch tracking (e.g. tuning instruments, voice).
 * It calculates the fundamental frequency by finding the smallest difference between the original signal
 * and a time-shifted version of itself.
 *
 * Reference: De Cheveigné, A., & Kawahara, H. (2002).
 * YIN, a fundamental frequency estimator for speech and music.
 */
class PitchProcessor extends AudioWorkletProcessor {
    bufferSize: number
    buffer: Float32Array
    differences: Float32Array
    framesFilled: number
    sampleRate: number

    // Noise gate: Threshold to avoid detecting pitch in background noise/silence
    NOISE_GATE = 0.002
    // Absolute threshold to find a good pitch candidate.
    // 0.1 to 0.15 is generally used to minimize octave errors (detecting a higher octave instead).
    ABSOLUTE_THRESHOLD = 0.1

    constructor() {
        super()

        this.bufferSize = 2048
        this.buffer = new Float32Array(this.bufferSize)
        // TODO: maybe we can use a single array for everything?
        // Used in YIN algorithm to store differences between samples
        this.differences = new Float32Array(this.bufferSize / 2)
        this.framesFilled = 0
        this.sampleRate = sampleRate
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

    /**
     * Implements the core YIN pitch tracking algorithm.
     * @param buffer - The audio data buffer
     * @param sampleRate - The current audio sample rate
     * @returns The estimated fundamental frequency in Hz, or 0 if no pitch is detected
     */
    private calculateFrequency(buffer: Float32Array, sampleRate: number): number {
        const rms = this.calculateRms(buffer)
        if (rms < this.NOISE_GATE) return 0

        const halfBufferSize = buffer.length / 2

        // Step 1: Calculate the difference function for each lag (delay)
        for (let lag = 1; lag < halfBufferSize; lag++) {
            this.differences[lag] = this.differenceFunction(buffer, lag)
        }

        this.differences[0] = 1

        // Step 2: Normalize differences to prevent false zero-lag matches
        this.cumulativeNormalizedDifferenceFunction()

        // Step 3: Find the best lag corresponding to the fundamental period
        const bestLag = this.findBestLag()

        if (bestLag <= 0 || bestLag >= halfBufferSize - 1) {
            return 0
        }

        // Step 4: Fine-tune the result using parabolic interpolation for sub-sample accuracy
        const delta = this.parabolicInterpolation(
            this.differences[bestLag - 1],
            this.differences[bestLag],
            this.differences[bestLag + 1],
        )

        return sampleRate / (bestLag + delta)
    }

    private calculateRms(buffer: Float32Array): number {
        let rms = 0
        buffer.forEach((sample) => {
            rms += sample * sample
        })
        rms = Math.sqrt(rms / buffer.length)

        return rms
    }

    /**
     * Step 1: Calculates the squared difference between the signal and its shifted version.
     * @param buffer - The audio data buffer
     * @param lag - The amount of samples to shift the signal by
     * @returns The squared difference
     */
    private differenceFunction(buffer: Float32Array, lag: number): number {
        let delta = 0
        for (let i = 0; i < buffer.length / 2; i++) {
            delta += (buffer[i] - buffer[i + lag]) ** 2
        }

        return delta
    }

    /**
     * Step 2: Normalizes the difference function.
     * Without this, the lowest difference would always be at lag = 0 (comparing the signal with itself).
     * This step continuously divides each difference by the average minimum difference seen so far.
     */
    private cumulativeNormalizedDifferenceFunction(): void {
        let runningSum = 0
        for (let lag = 1; lag < this.differences.length; lag++) {
            runningSum += this.differences[lag]

            if (runningSum > 0) {
                this.differences[lag] = this.differences[lag] * (lag / runningSum)
            }
        }
    }

    /**
     * Step 3: Finds the first dip in the difference function that falls below the threshold.
     * This represents the fundamental period of the sound wave.
     * @returns The index of the best lag, or -1 if no pitch is found
     */
    private findBestLag(): number {
        let bestLag = -1

        for (let lag = 1; lag < this.differences.length; lag++) {
            if (this.differences[lag] < this.ABSOLUTE_THRESHOLD) {
                while (
                    lag + 1 < this.differences.length &&
                    this.differences[lag + 1] < this.differences[lag]
                ) {
                    lag++
                }

                bestLag = lag
                break
            }
        }

        return bestLag
    }

    /**
     * Step 4: Uses parabolic interpolation on the three points around the best lag to estimate
     * a fractional true peak for the lag. This greatly improves the frequency resolution
     * without needing a higher sample rate.
     */
    private parabolicInterpolation(y0: number, y1: number, y2: number): number {
        const denominator = y0 - 2 * y1 + y2

        let delta = 0
        if (denominator !== 0) {
            delta = (y0 - y2) / (2 * denominator)
        }

        return delta
    }
}

registerProcessor('pitch-processor', PitchProcessor)
