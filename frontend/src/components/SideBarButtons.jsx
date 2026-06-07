import React from 'react'

const SideBarButtons = ({ componentIcon, text, isActive, onClick }) => {
    return (
        <div 
            onClick={onClick} 
            className={`w-full flex items-center rounded-xl gap-3 cursor-pointer px-4 py-2.5 transition-all duration-150 group border border-transparent text-sm font-medium
                ${isActive 
                    ? "bg-neutral-900/80 border-neutral-800/50 text-neutral-100 font-semibold shadow-sm" 
                    : "text-neutral-500 hover:text-neutral-300 hover:bg-neutral-900/40"
                }`}
        >
            {/* Dynamic Active Color Accent for the Vector Icon */}
            <div className={`transition-colors duration-150 ${isActive ? "text-emerald-400" : "text-neutral-500 group-hover:text-neutral-400"}`}>
                {componentIcon}
            </div>
            
            <span className="tracking-wide">{text}</span>
        </div>
    )
}

export default SideBarButtons