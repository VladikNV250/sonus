export const initGuitarInput = async (audioContext: AudioContext) => {
    if (audioContext.state === 'suspended') {
        await audioContext.resume()
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
            },
        })

        const guitarSource = audioContext.createMediaStreamSource(stream)

        return guitarSource
    } catch (error) {
        console.error('Error accessing media devices.', error)
    }
}
