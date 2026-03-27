export const ListeningLoader = () => {
    return (
        <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="w-16 h-16 rounded-full border-4 border-white/20 border-t-white/80 animate-spin" />
            <span className="text-white/50 text-lg font-medium">Listening...</span>
        </div>
    )
}
