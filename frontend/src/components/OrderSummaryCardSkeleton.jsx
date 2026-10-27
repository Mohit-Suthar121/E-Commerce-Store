import React from 'react';

const OrderSummaryCardSkeleton = () => {
    return (
        <div className="w-full max-w-md bg-[#09090b] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl relative overflow-hidden">
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

            {/* Header Placeholder */}
            <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
                <div className="h-3 skeleton-shimmer rounded w-28" />
                <div className="h-6 skeleton-shimmer border border-neutral-800 rounded-full w-14" />
            </div>

            {/* Price Breakdown Placeholder */}
            <div className="flex flex-col gap-3.5">
                <div className="flex justify-between items-center">
                    <div className="h-3 skeleton-shimmer rounded w-16" />
                    <div className="h-3 skeleton-shimmer rounded w-20" />
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-3 skeleton-shimmer rounded w-16" />
                    <div className="h-3 skeleton-shimmer rounded w-12" />
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-3 skeleton-shimmer rounded w-24" />
                    <div className="h-3 skeleton-shimmer rounded w-16" />
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-neutral-800/80" />

            {/* Total Row Placeholder */}
            <div className="flex justify-between items-baseline">
                <div className="flex flex-col gap-1.5">
                    <div className="h-4 skeleton-shimmer rounded w-28" />
                    <div className="h-2.5 skeleton-shimmer rounded w-36" />
                </div>
                <div className="h-7 skeleton-shimmer rounded w-24" />
            </div>

            {/* Primary Button Placeholder */}
            <div className="w-full h-12 skeleton-shimmer border border-neutral-800 rounded-xl mt-1" />

            {/* Trust Badges Placeholder */}
            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-900">
                <div className="h-3 skeleton-shimmer rounded w-3/4" />
                <div className="h-3 skeleton-shimmer rounded w-2/3" />
                <div className="h-3 skeleton-shimmer rounded w-1/2" />
            </div>
        </div>
    );
};

export default OrderSummaryCardSkeleton;