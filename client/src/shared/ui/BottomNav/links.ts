import { Activity, Guitar, type LucideIcon, Settings } from 'lucide-react'

export const NAVIGATION_LINKS: NavigationLink[] = [
    {
        label: 'Tuner',
        path: '/',
        icon: Activity,
        isEndPath: true,
    },
    {
        label: 'Guitar Tuner',
        path: '/guitar',
        icon: Guitar,
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: Settings,
    },
]

export interface NavigationLink {
    label: string
    path: string
    icon: LucideIcon
    isEndPath?: boolean
}
