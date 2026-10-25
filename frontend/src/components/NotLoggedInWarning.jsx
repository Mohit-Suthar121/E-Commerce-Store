import React from 'react'
import { useNavigate } from 'react-router-dom'
import { authPath } from '../utils/authRedirect';

const NotLoggedInWarning = ({ 
    setShowLoggedInWarning,parentPage
}) => {
    const navigate = useNavigate();

    
    return (
        <div className="w-full max-w-md bg-[#09090b] border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden">
            
            {/* ✕ Close / Cross Button */}
            <button
                type="button"
                onClick={()=>{setShowLoggedInWarning(false)}}
                aria-label="Close warning"
                className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800/80 text-neutral-400 hover:text-white transition-all duration-200 cursor-pointer active:scale-95 z-10"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Subtle Ambient Emerald Background Glow */}
            <div className="absolute -top-16 -left-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Lock / Alert Shield Icon Container */}
            <div className="w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-800/80 p-3.5 flex items-center justify-center shrink-0 shadow-inner text-emerald-400 mt-2 sm:mt-0">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-8 h-8 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" 
                    />
                </svg>
            </div>

            {/* Content Header & Description */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="uppercase text-[11px] font-mono font-bold tracking-wider text-amber-400/90">
                        Authentication Required
                    </span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                    Please Log In to Checkout
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
                    You need to be logged into your account to save shipping details, apply discounts, and process your order securely.
                </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-neutral-800/60" />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 w-full">
                {/* Primary Action - Log In */}
                <button
                    type="button"
                    onClick={()=>{navigate(authPath("/login",{},parentPage))}}
                    className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm rounded-xl transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-[0.99] cursor-pointer flex justify-center items-center gap-2"
                >
                    <span>Log In to Account</span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={2} 
                        stroke="currentColor" 
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                </button>

                {/* Secondary Action - Create Account */}
                <button
                    type="button"
                    onClick={()=>{authPath("/register",{},parentPage)}}
                    className="w-full py-3 px-4 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80 text-neutral-300 font-medium text-xs rounded-xl transition-all duration-200 cursor-pointer active:scale-95"
                >
                    Don't have an account? Sign Up
                </button>
            </div>

            {/* Footer Trust Note */}
            <p className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5 pt-1">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.959 11.959 0 0 1 12 2.714Z" />
                </svg>
                <span>Fast & encrypted 256-bit secure checkout</span>
            </p>

        </div>
    )
}

export default NotLoggedInWarning