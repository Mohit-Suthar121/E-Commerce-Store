import React from 'react';

const FullPageLoader = ({ 
  message = "Loading experience...", 
  subtext = "Securing session and fetching data" 
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-gray-100 select-none overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-400/5 rounded-full blur-[90px] pointer-events-none" />

      {/* Main Glass Card Container */}
      <div className="relative z-10 flex flex-col items-center p-8 sm:p-10 rounded-3xl bg-[#09090b]/80 border border-neutral-800/80 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] max-w-sm w-full mx-4 text-center">
        
        {/* Glowing Spinner Ring */}
        <div className="relative w-20 h-20 mb-8 flex items-center justify-center">
          {/* Outer Track Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-neutral-800/80" />
          
          {/* Pulsing Backlight */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-md animate-pulse" />

          {/* Rotating Emerald Gradient Ring */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-500/50 animate-spin" />

          {/* Center Emerald Core Indicator */}
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shadow-[0_0_15px_#10b981] animate-ping" />
          <div className="absolute w-2 h-2 rounded-full bg-emerald-300" />
        </div>

        {/* Message Headings */}
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-bold tracking-wide text-white">
            {message}
          </h3>
          <p className="text-xs font-mono text-neutral-400 leading-relaxed max-w-[240px]">
            {subtext}
          </p>
        </div>

        {/* Status Bar / Animated Progress Indicator */}
        <div className="w-full bg-neutral-900 border border-neutral-800/80 h-1.5 rounded-full mt-6 overflow-hidden relative">
          <div className="absolute inset-y-0 bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full w-1/3 animate-[loadingBar_1.8s_ease-in-out_infinite] shadow-[0_0_10px_#10b981]" />
        </div>

        {/* Bottom Tag */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-neutral-800/50 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>System Initializing</span>
        </div>

      </div>

      {/* Tailwind Custom Keyframe Style (Add to index.css or use standard arbitrary animation) */}
      <style>{`
        @keyframes loadingBar {
          0% { left: -35%; width: 30%; }
          50% { width: 50%; }
          100% { left: 100%; width: 30%; }
        }
      `}</style>
    </div>
  );
};

export default FullPageLoader;