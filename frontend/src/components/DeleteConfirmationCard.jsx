import React from 'react'

const DeleteConfirmationCard = ({ showDeleteConfirmationCard, product={}, onConfirm, onCancel, isLoading = false }) => {
    // Guardrail: If the modal state isn't active, render absolutely nothing
    if (!showDeleteConfirmationCard || !product) return null;

    const {
        name = "Unknown Product",
        brandName = "",
        images = [],
        price = 0
    } = product;

    const displayImage = images[0]?.url || "";

    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);

    return (
        /* 🌌 Full-Screen Backdrop Layer */
        <div className="fixed inset-0 w-full h-full bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            
            {/* 🛑 Centered Warning Card Container */}
            <div 
                className="w-full max-w-md rounded-2xl bg-[#09090b] border border-red-500/20 p-6 shadow-2xl shadow-black/90 relative overflow-hidden transform scale-100 transition-transform duration-200"
                onClick={(e) => e.stopPropagation()} // Prevents clicking inside the card from closing the modal
            >
                
                {/* Top Crimson Laser Edge Glow */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-red-500/40 to-transparent" />

                <div className="flex flex-col gap-5">
                    
                    {/* Warning Header */}
                    <div className="flex items-start gap-3.5">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        
                        <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase font-bold">
                                SYSTEM_DELETION_PROTOCOL
                            </span>
                            <h3 className="text-base font-bold text-neutral-200 tracking-tight">
                                Confirm Inventory Purge?
                            </h3>
                        </div>
                    </div>

                    {/* Explanatory Warning Text */}
                    <p className="text-xs text-neutral-400 leading-relaxed pl-1">
                        You are about to permanently delete this product from the master catalog. This action cannot be reversed and will wipe all associated asset links.
                    </p>

                    {/* Target Visual Check */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-950 border border-neutral-900">
                        {displayImage ? (
                            <img 
                                src={displayImage} 
                                alt={name} 
                                className="w-12 h-12 rounded bg-[#0f0f0f] object-contain border border-neutral-800 p-1 shrink-0" 
                            />
                        ) : (
                            <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 font-mono text-[10px]">NO_IMG</div>
                        )}
                        <div className="flex flex-col justify-center min-w-0 flex-1">
                            {brandName && (
                                <span className="text-[8px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                                    {brandName}
                                </span>
                            )}
                            <h4 className="text-xs font-semibold text-neutral-300 truncate">
                                {name}
                            </h4>
                            <span className="text-[10px] font-mono text-neutral-500 mt-0.5">
                                Valued at {formattedPrice}
                            </span>
                        </div>
                    </div>

                    {/* Control Action Cluster */}
                    <div className="grid grid-cols-2 gap-3 mt-1">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            type="button"
                            className="w-full py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase border border-neutral-800/80 bg-[#121214] text-neutral-400 hover:border-zinc-700 hover:text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            ABORT
                        </button>

                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            type="button"
                            className="w-full py-2.5 rounded-xl text-xs font-mono font-bold tracking-wider uppercase bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-black hover:border-red-500 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-200 active:scale-[0.98] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                "CONFIRM_PURGE"
                              )}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DeleteConfirmationCard;