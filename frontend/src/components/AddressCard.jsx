import React from 'react'
import DeleteIcon from '../icons/DeleteIcon'

const AddressCard = ({ isSelected,id,setAddress }) => {

    return (
        <div onClick={()=>{setAddress(id)}} className={`w-full max-w-xl rounded-2xl p-5 flex flex-col gap-3  ${isSelected
            ? "bg-emerald-500/3 border border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
            : "bg-[#0f0f0f] border border-neutral-800/80 hover:border-neutral-700/80 hover:-translate-y-0.5 hover:shadow-lg"
            } relative cursor-pointer ${!isSelected && "hover:scale-102 hover:border-neutral-700"} transition-all duration-200  `} >

            <div className="name-section flex gap-2 items-center">
                <div className={`before-name-circle w-4 h-4 rounded-full flex justify-center items-center ${isSelected
                    ? "border-emerald-500 bg-emerald-500 border"
                    : "border-neutral-700 bg-neutral-950 border"
                    }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                </div>
                <div className="name font-semibold text-sm tracking-wider text-gray-200">Rahul Singh</div>

            </div>

            <div className="phone-and-email flex flex-col text-xs text-neutral-400 font-medium tracking-wide translate-x-1 gap-1 ">

                <span className="phone-number text-neutral-300 font-normal">+91 97856489</span>
                <span className="email-address w-full text-neutral-500 font-normal">rohansingh23@gmail.com</span>
            </div>
            <p className="address text-sm w-full max-w-md text-neutral-400 border-t border-neutral-900 pt-2">mai nahi bataunga , kolkata, naya baas , kaalo ki dhaani, 32432asdfasdfasdf sadfasdfasdfasdfa</p>

            <div className="absolute right-2 top-2 remove-button flex cursor-pointer p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-500 justify-center items-center hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200 active:scale-95 hover:text-red-400">
                <DeleteIcon currentColor={"currentColor"} className={"w-4 h-4"} />
            </div>

        </div>
    )
}

export default AddressCard