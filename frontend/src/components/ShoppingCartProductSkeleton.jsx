import React from 'react';

const ShoppingCartProductSkeleton = () => {
    return (
        <div className="w-full rounded-2xl p-4 sm:p-5 bg-[#09090b] border border-neutral-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg relative overflow-hidden">
            {/* Shimmer keyframes styling */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .skeleton-shimmer {
                    background: linear-gradient(90deg, #18181b 0%, #27272a 50%, #18181b 100%);
                    background-size: 200% 100%;
                    animation: shimmer 1.6s infinite linear;
                }
            `}</style>

            {/* Left Side: Image & Info Skeletons */}
            <div className="flex items-center gap-4.5 w-full sm:w-auto flex-1 min-w-0">
                {/* Image Placeholder */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl skeleton-shimmer border border-neutral-800/80 shrink-0" />

                {/* Info Placeholder */}
                <div className="flex flex-col flex-1 min-w-0 gap-2.5">
                    <div className="h-4 skeleton-shimmer rounded-md w-3/4 max-w-[220px]" />
                    <div className="flex items-center gap-2.5">
                        <div className="h-3 skeleton-shimmer rounded w-24" />
                        <div className="h-4 skeleton-shimmer rounded w-16" />
                    </div>
                </div>
            </div>

            {/* Mobile Divider */}
            <div className="w-full h-px bg-neutral-800/60 sm:hidden" />

            {/* Right Side: Stepper, Subtotal & Delete Skeletons */}
            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto shrink-0">
                {/* Stepper Placeholder */}
                <div className="w-28 h-11 skeleton-shimmer border border-neutral-800/80 rounded-xl" />

                {/* Subtotal Placeholder */}
                <div className="flex flex-col items-start sm:items-end gap-1.5 min-w-[85px]">
                    <div className="h-2.5 skeleton-shimmer rounded w-10" />
                    <div className="h-5 skeleton-shimmer rounded w-16" />
                </div>

                {/* Delete Button Placeholder */}
                <div className="w-10 h-10 rounded-xl skeleton-shimmer border border-neutral-800/80 shrink-0" />
            </div>
        </div>
    );
};

export default ShoppingCartProductSkeleton;