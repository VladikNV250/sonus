import { NavLink } from 'react-router'

import { cn } from '@/shared/lib'

import { NAVIGATION_LINKS } from './links'

export const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-neutral-900/95 backdrop-blur-2xl border-t border-white/5 pb-[env(safe-area-inset-bottom)] z-50">
            <div className="flex items-center justify-around px-2 pt-3 pb-2 max-w-md mx-auto">
                {NAVIGATION_LINKS.map((link) => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        end={link.isEndPath}
                        className={({ isActive }) =>
                            cn(
                                'flex flex-col items-center justify-center flex-1 py-1 transition-all duration-300 gap-1.5',
                                isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-400',
                            )
                        }
                    >
                        <link.icon size={24} strokeWidth={2.5} />
                        <span className="text-[11px] font-semibold tracking-wide">
                            {link.label}
                        </span>
                    </NavLink>
                ))}
            </div>
        </nav>
    )
}
