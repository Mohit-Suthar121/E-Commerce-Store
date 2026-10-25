import React from 'react'

// UI-only component. Just displays the currently selected address.
// Expected props:
// - address: the selected address object { name, email, phoneNo, street, city, state, zipCode }
// - onChange: () => void  -> go back to address selection (optional)

const FinalSelectedAddressCard = ({ address = null, onChange}) => {
    if (!address) return null

    return (
        <div className="w-full flex flex-col gap-3">

            {/* Section Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="uppercase text-xs font-mono font-bold tracking-wider text-neutral-400">
                        Delivering To
                    </h2>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                    Step 2 of 2
                </span>
            </div>

            {/* Address Card */}
            <div className="relative rounded-3xl border border-emerald-500/30 bg-neutral-950/60 overflow-hidden">

                {/* Decorative glow */}
                <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-emerald-500/10 blur-3xl" />

                {/* Top row: icon + name + confirmed badge */}
                <div className="relative flex items-start justify-between gap-4 p-6 border-b border-neutral-800/80">
                    <div className="flex items-start gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-base font-semibold text-neutral-100">{address.name}</p>
                            <span className="inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-mono uppercase tracking-wide text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                                Selected Address
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onChange}
                        className="shrink-0 text-xs font-mono text-neutral-400 hover:text-emerald-400 border border-neutral-800 hover:border-emerald-500/40 rounded-xl px-3 py-2 transition-colors cursor-pointer"
                    >
                        Change
                    </button>
                </div>

                {/* Details grid */}
                <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5 p-6">

                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-8.25 9.75-8.25S21.75 12 21.75 12s-3.75 8.25-9.75 8.25S2.25 12 2.25 12Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <div>
                            <p className="text-[11px] font-mono uppercase tracking-wide text-neutral-600 mb-0.5">Street Address</p>
                            <p className="text-sm text-neutral-300 leading-relaxed">{address.street}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3.75h15M5.25 3.75v17.25m13.5-17.25v17.25M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                        </svg>
                        <div>
                            <p className="text-[11px] font-mono uppercase tracking-wide text-neutral-600 mb-0.5">City / State</p>
                            <p className="text-sm text-neutral-300">{address.city}, {address.state}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 3.75a3 3 0 0 1 3 3v10.5a3 3 0 0 1-3 3h-7.5a3 3 0 0 1-3-3V6.75a3 3 0 0 1 3-3h7.5ZM10.5 18.75h3" />
                        </svg>
                        <div>
                            <p className="text-[11px] font-mono uppercase tracking-wide text-neutral-600 mb-0.5">Zip Code</p>
                            <p className="text-sm text-neutral-300">{address.zipCode}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                        </svg>
                        <div>
                            <p className="text-[11px] font-mono uppercase tracking-wide text-neutral-600 mb-0.5">Phone</p>
                            <p className="text-sm text-neutral-300">{address.phoneNo}</p>
                        </div>
                    </div>

                    {address.email && (
                        <div className="flex items-start gap-3 sm:col-span-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-600 mt-0.5 shrink-0">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <div>
                                <p className="text-[11px] font-mono uppercase tracking-wide text-neutral-600 mb-0.5">Email</p>
                                <p className="text-sm text-neutral-300">{address.email}</p>
                            </div>
                        </div>
                    )}

                </div>

            </div>

        </div>
    )
}

export default FinalSelectedAddressCard