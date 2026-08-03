import React from 'react'
import DeleteIcon from '../icons/DeleteIcon'

const AddressCard = ({
    isSelected,
    id,
    setSelectedAddress,
    setIsEditingAddress,
    onDelete,
    fullName = "Rahul Singh",
    phone = "+91 9785648900",
    email = "rohansingh23@gmail.com",
    street = "Naya Baas, Kaalo Ki Dhaani",
    city = "Kolkata",
    state = "West Bengal",
    country = "India",
    zipcode = "700001"
}) => {

    return (
        <div 
            onClick={() => { setSelectedAddress(id) }} 
            className={`w-full max-w-2xl rounded-2xl p-6 flex flex-col gap-4 ${isSelected
                ? "bg-emerald-500/5 border border-emerald-500/80 shadow-[0_0_24px_rgba(16,185,129,0.06)]"
                : "bg-[#0f0f0f] border border-neutral-800/80 hover:border-neutral-700/80 hover:-translate-y-0.5 hover:shadow-lg"
            } relative cursor-pointer ${!isSelected && "hover:scale-[1.01] hover:border-neutral-700"} transition-all duration-200`} 
        >

            {/* Top Header: Name & Radio Indicator */}
            <div className="flex items-center justify-between pr-20">
                <div className="name-section flex gap-3 items-center">
                    <div className={`before-name-circle w-4.5 h-4.5 rounded-full flex justify-center items-center shrink-0 ${isSelected
                        ? "border-emerald-500 bg-emerald-500 border"
                        : "border-neutral-700 bg-neutral-950 border"
                    }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                    <div className="name font-semibold text-base tracking-wide text-gray-100">
                        {fullName}
                    </div>
                </div>
            </div>

            {/* Phone & Email */}
            <div className="phone-and-email flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-400 font-medium tracking-wide pl-7">
                <span className="phone-number text-neutral-300 font-normal">+91 {phone}</span>
                <span className="hidden sm:inline text-neutral-700">•</span>
                <span className="email-address text-neutral-500 font-normal">{email}</span>
            </div>
            
            {/* Address Block */}
            <div className="address-block border-t border-neutral-900/80 pt-3.5 pl-7 flex flex-col gap-2.5">
                <p className="street-address text-sm text-neutral-300 font-normal leading-relaxed pr-6 break-words">
                    {street}
                </p>

                {/* City, State, Zipcode & Country Row */}
                <div className="location-details flex flex-wrap items-center gap-2.5 text-xs font-mono pt-0.5">
                    {/* City & State */}
                    <span className="text-neutral-300 font-medium">
                        {city}{state ? `, ${state}` : ''}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />

                    {/* Zipcode Badge */}
                    <span className="text-neutral-300 bg-neutral-900 border border-neutral-800/80 px-2.5 py-0.5 rounded-md font-semibold text-[11px] tracking-wider">
                        {zipcode}
                    </span>

                    <span className="w-1 h-1 rounded-full bg-neutral-700 shrink-0" />

                    {/* Country Badge */}
                    <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono text-[10px] uppercase font-semibold tracking-wider">
                        {country}
                    </span>
                </div>
            </div>

            {/* Action Buttons Cluster (Edit & Delete) */}
            <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (setIsEditingAddress) setIsEditingAddress(true);
                    }}
                    aria-label="Edit address"
                    className="flex cursor-pointer p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-500 justify-center items-center hover:border-purple-500/30 hover:bg-purple-500/5 hover:text-purple-400 transition-all duration-200 active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                </button>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onDelete) onDelete(id);
                    }}
                    aria-label="Delete address"
                    className="flex cursor-pointer p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-500 justify-center items-center hover:border-rose-500/30 hover:bg-rose-500/5 hover:text-rose-400 transition-all duration-200 active:scale-95"
                >
                    <DeleteIcon currentColor="currentColor" className="w-4 h-4" />
                </button>
            </div>

        </div>
    )
}

export default AddressCard