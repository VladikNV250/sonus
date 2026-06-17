import { Outlet } from 'react-router'

import { BottomNav } from '@/shared/ui'

export const Layout = () => {
    return (
        <div className="h-dvh w-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 font-sans overflow-hidden">
            <div className="flex-1 w-full overflow-y-auto overflow-x-hidden relative pb-[80px]">
                <Outlet />
            </div>

            <BottomNav />
        </div>
    )
}

export default Layout
