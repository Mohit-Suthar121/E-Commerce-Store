import React from 'react'
import PaymentSuccessIcon from '../icons/PaymentSuccessIcon'

const OrderSuccessCard = () => {
    return (
        <div className="w-full max-w-sm rounded-2xl bg-[#0b0b0b]/90 border border-neutral-900 p-6 flex flex-col items-center text-center shadow-[0_0_50px_rgba(16,185,129,0.03)] backdrop-blur-xl relative overflow-hidden animate-fade-in select-none">
            
            {/* AMBIENT BACKGROUND GLOW ACCENT */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />

            {/* 1. EMERALD GLOW SUCCESS ICON ICON */}
            <div className="relative z-10 w-16 h-16 rounded-full bg-emerald-500/4 border border-emerald-500/20 flex justify-center items-center shadow-[0_0_20px_rgba(16,185,129,0.05)] mb-2">
                <PaymentSuccessIcon className="w-7 h-7 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.3)]" currentColor="currentColor" />
            </div>

            {/* 2. TYPOGRAPHIC COHERENCE TEXT STACK */}
            <div className="flex flex-col gap-2 z-10 mt-2 max-w-70">
                <h1 className="text-xl font-bold tracking-tight text-neutral-100">
                    Payment Successful
                </h1>
                <p className="text-xs text-neutral-500 font-medium leading-relaxed">
                    Thank you for your purchase! Your order has been securely processed and placed.
                </p>
            </div>

            {/* 3. CONTRAST BUTTON ACTIONS STACK */}
            <div className="w-full flex flex-col gap-2.5 mt-8 z-10">
                {/* Primary Premium Action */}
                <button className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-colors duration-200 cursor-pointer active:scale-[0.99] shadow-md shadow-white/5">
                    Continue Shopping
                </button>
                
                {/* Secondary Muted Action */}
                <button className="w-full h-11 flex justify-center items-center rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400 hover:text-neutral-200 text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.99]">
                    View My Orders
                </button>
            </div>
            
        </div>
    )
}

export default OrderSuccessCard