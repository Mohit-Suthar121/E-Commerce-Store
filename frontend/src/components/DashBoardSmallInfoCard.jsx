import React from 'react'

const DashBoardSmallInfoCard = ({ text, number }) => {
    return (
        <div className="flex-1 min-w-55 rounded-2xl bg-[#0b0b0b] border border-neutral-900 p-5 flex flex-col gap-2.5 hover:border-neutral-800 transition-all duration-300 relative overflow-hidden group select-none shadow-lg shadow-black/10">

            <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 block truncate">
                    {text}
                </span>
            </div>


            <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-bold tracking-tight text-white font-sans">
                    {typeof number === 'number' ? number.toLocaleString() : number}
                </span>

            </div>

        </div>
    )
}

export default DashBoardSmallInfoCard