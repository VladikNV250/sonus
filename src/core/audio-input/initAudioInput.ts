export const initAudioInput = async (audioContext: AudioContext) => {
    if (audioContext.state === 'suspended') {
        await audioContext.resume()
    }

    try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
            },
        })

        const audioSource = audioContext.createMediaStreamSource(audioStream)

        return { audioSource, audioStream }
    } catch (error) {
        console.error('Error accessing media devices.', error)
    }
}
