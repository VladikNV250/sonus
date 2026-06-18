import { useQuery } from '@tanstack/react-query'

import { PresetStore } from '../api'

export const usePresets = () => {
    const query = useQuery({
        queryKey: ['presets'],
        queryFn: () => PresetStore.getAll(),
    })

    return query
}
