import { AnimatePresence, motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { type FC, type ReactNode } from 'react'

interface Props {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isPending?: boolean
    title: string
    description: string
    confirmText?: string
    cancelText?: string
    icon?: ReactNode
    variant?: 'danger' | 'primary'
}

export const ConfirmDialog: FC<Props> = ({
    isOpen,
    onClose,
    onConfirm,
    isPending = false,
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    icon,
    variant = 'danger',
}) => {
    const isDanger = variant === 'danger'

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
                        onClick={() => !isPending && onClose()}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 10 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-xs bg-[#1a1a24] border border-white/10 rounded-[24px] p-6 shadow-2xl flex flex-col items-center text-center"
                    >
                        {icon && (
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                                    isDanger
                                        ? 'bg-red-500/10 text-red-500'
                                        : 'bg-white/5 text-white'
                                }`}
                            >
                                <div className="opacity-80 flex items-center justify-center">
                                    {icon}
                                </div>
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-white mb-2 tracking-wide">
                            {title}
                        </h3>
                        <p className="text-white/50 mb-8 text-sm leading-relaxed">{description}</p>
                        <div className="flex w-full gap-3">
                            <button
                                onClick={onClose}
                                disabled={isPending}
                                className="flex-1 py-3 cursor-pointer rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 active:scale-95 transition-all disabled:opacity-50"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={onConfirm}
                                disabled={isPending}
                                className={`flex-1 py-3 flex cursor-pointer justify-center items-center rounded-xl font-medium border active:scale-95 transition-all disabled:opacity-50 ${
                                    isDanger
                                        ? 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                }`}
                            >
                                {isPending ? (
                                    <Loader2 className="animate-spin size-5" />
                                ) : (
                                    confirmText
                                )}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
