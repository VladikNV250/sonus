import { AnimatePresence, motion } from 'framer-motion'
import { type FC } from 'react'

import { STRING_LABELS } from '@/entities/pitch'

import { useCreatePreset } from '../model'
import { StringPitchControl } from './StringPitchControl'

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const CreatePresetSheet: FC<Props> = ({ isOpen, onClose }) => {
    const { name, changeName, pitches, updatePitch, reset, errors, isPending, handleSave } =
        useCreatePreset(onClose)

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-60 flex flex-col justify-end">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                        className="relative w-full max-w-md mx-auto rounded-t-3xl overflow-hidden bg-linear-to-br from-white/95 to-white/90 dark:from-[#1e1c28fA] dark:to-[#12111afC] border border-black/10 dark:border-white/10 border-b-0 shadow-[0_-20px_60px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl"
                        style={{
                            paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px + 24px)',
                        }}
                    >
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1 rounded-full bg-black/20 dark:bg-white/20" />
                        </div>

                        <div className="flex items-center justify-between px-6 pt-2 pb-4">
                            <button
                                type="button"
                                disabled={isPending}
                                onClick={() => {
                                    onClose()
                                    reset()
                                }}
                                className="cursor-pointer disabled:cursor-default text-sm text-neutral-500 dark:text-white/50 hover:text-neutral-900 dark:hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                            <h2 className="text-base font-semibold text-neutral-900 dark:text-white tracking-wide">
                                New Preset
                            </h2>
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={isPending}
                                className="cursor-pointer disabled:cursor-default text-sm font-semibold text-violet-400 disabled:opacity-30 disabled:text-gray-500"
                            >
                                Save
                            </button>
                        </div>

                        <div className="px-6 mb-5">
                            <input
                                type="text"
                                placeholder="Preset name..."
                                value={name}
                                onChange={changeName}
                                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-4 py-3 text-neutral-900 dark:text-white outline-none focus:border-black/20 dark:focus:border-white/20 transition-all placeholder:text-neutral-500 dark:placeholder:text-white/20"
                            />
                            {errors?.name && (
                                <p className="text-red-500 text-sm">{errors.name.join(', ')}</p>
                            )}
                        </div>

                        <div className="px-6 flex flex-col gap-2 mb-6">
                            {pitches.map((string, index) => (
                                <StringPitchControl
                                    key={STRING_LABELS[index]}
                                    string={string}
                                    stringLabel={STRING_LABELS[index]}
                                    updatePitch={updatePitch}
                                />
                            ))}
                        </div>

                        {errors?.root && (
                            <p className="text-red-500 text-sm text-center font-medium mt-2">
                                {errors.root.join(', ')}
                            </p>
                        )}
                        {errors?.strings && (
                            <p className="text-red-500 text-sm text-center font-medium mt-2">
                                {errors.strings.join(', ')}
                            </p>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}
