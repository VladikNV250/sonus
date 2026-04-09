import { useQuery } from '@tanstack/react-query'

import { ApiClient } from '@/shared/api/api-client'

import type { Preset } from './types'

export const usePresets = () => {
    const query = useQuery({
        queryKey: ['presets'],
        queryFn: () => ApiClient.get<Preset[]>('/presets'),
    })

    return query
}
