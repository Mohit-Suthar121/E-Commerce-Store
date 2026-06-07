import React from 'react'

const AddNewAddressCard = () => {
    return (
        <div className=" flex flex-col md:flex-row items-center md:items-start justify-center gap-8 lg:gap-12 mt-4 ">

            <div className=" max-w-xl bg-[#0b0b0b] border border-neutral-900 p-6 rounded-2xl shadow-xl flex flex-col gap-5">

                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">First Name</label>
                        <input
                            type="text"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                            placeholder="eg. Ankit"
                        />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Last Name</label>
                        <input
                            type="text"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                            placeholder="eg. Sharma"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Email Address</label>
                    <input
                        type="email"
                        className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                        placeholder="eg. arhenius34@gmail.com"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Phone Number</label>
                    <input
                        type="tel"
                        className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                        placeholder="Enter contact number"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Street Address</label>
                    <input
                        type="text"
                        className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                        placeholder="Enter street address"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 ">

                    <div className="upper-address flex flex-col gap-2">


                        <div className="flex flex-col flex-1 gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">City</label>
                            <input
                                type="text"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter city"
                            />
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Zip Code</label>
                            <input
                                type="text"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter zip code"
                            />
                        </div>
                    </div>


                    <div className="lower-section flex flex-col gap-2 ">
                        <div className="flex flex-col flex-1 gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">State</label>
                            <input
                                type="text"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter zip code"
                            />
                        </div>
                        <div className="flex flex-col flex-1 gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Country</label>
                            <input
                                type="text"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter zip code"
                            />
                        </div>
                    </div>

                    
                </div>

                <button className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-colors duration-200 mt-2 cursor-pointer active:scale-[0.99]">
                    Save and Continue
                </button>

            </div>
        </div>
    )
}

export default AddNewAddressCard