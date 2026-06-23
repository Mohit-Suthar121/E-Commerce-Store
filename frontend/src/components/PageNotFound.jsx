import React from 'react';
import { Link } from 'react-router-dom'; // or 'next/link' depending on your framework

export default function PageNotFound() {
    return (
        <div className="relative min-h-screen w-full bg-neutral-950 flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-emerald-500/30">
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/3 left-1/3 w-75 h-75 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center max-w-md gap-6">
                
                <div className="relative group">
                    <h1 className="text-[12rem] font-black tracking-tighter leading-none bg-linear-to-b from-neutral-50 via-neutral-400 to-neutral-800 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.02)] select-none">
                        404
                    </h1>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-linear-to-r from-transparent via-emerald-500/50 to-transparent blur-[1px]" />
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold text-neutral-200 tracking-wide">
                        Lost in the grid?
                    </h2>
                    <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
                        The route you are trying to access does not exist or has been shifted to another coordinate.
                    </p>
                </div>

                <div className="mt-2">
                    <Link to="/">
                        <button className="flex items-center gap-2 h-10 px-5 rounded-xl text-xs font-semibold tracking-wide bg-neutral-900 text-neutral-200 border border-neutral-800 hover:border-emerald-500/40 hover:text-white shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(16,185,129,0.08)] transition-all duration-300 cursor-pointer active:scale-[0.98]">
                            <svg 
                                className="w-3.5 h-3.5 transition-transform duration-200 transform group-hover:-translate-x-0.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span>Back to reality</span>
                        </button>
                    </Link>
                </div>

            </div>

            <div className="absolute bottom-6 text-[10px] font-mono tracking-widest text-neutral-600 uppercase select-none">
                System.Err // Page_Not_Found
            </div>
            
        </div>
    );
}