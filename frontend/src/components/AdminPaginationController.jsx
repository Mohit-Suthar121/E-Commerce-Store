import React from 'react'

const AdminPaginationController = ({ currentPage = 1, totalPages = 1, onNext, onPrev, isLoading }) => {
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage >= totalPages;

    return (
        <div className="w-full bg-[#09090b] border border-neutral-800/60 rounded-xl p-3 flex items-center justify-between mb-4 shadow-xl shadow-black/20 group">
            
            {/* Left Side: Status Info */}
            <div className="flex flex-col items-start gap-0.5">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">
                    Navigation Matrix
                </span>
                <p className="text-sm font-medium text-neutral-300">
                    Page <span className="font-mono text-emerald-400 font-bold">{currentPage}</span> of <span className="font-mono text-neutral-400">{totalPages || 1}</span>
                </p>
            </div>

            {/* Right Side: Control Actions */}
            <div className="flex items-center gap-2">
                
                {/* Previous Button */}
                <button
                    onClick={onPrev}
                    disabled={isFirstPage || isLoading}
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase border border-neutral-800/80 bg-[#121214] text-neutral-400 transition-all duration-200 
                    enabled:hover:border-zinc-600 enabled:hover:text-white enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    ← Prev
                </button>

                {/* Divider node */}
                <div className="h-4 w-px bg-neutral-800" />

                {/* Next Button */}
                <button
                    onClick={onNext}
                    disabled={isLastPage || isLoading}
                    type="button"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold tracking-wider uppercase border border-neutral-800/80 bg-[#121214] text-neutral-400 transition-all duration-200 
                    enabled:hover:border-emerald-500/40 enabled:hover:bg-emerald-500/5 enabled:hover:text-emerald-400 enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    Next →
                </button>
                
            </div>
        </div>
    )
}

export default AdminPaginationController;