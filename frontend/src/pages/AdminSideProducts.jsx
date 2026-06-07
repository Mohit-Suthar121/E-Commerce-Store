import React from 'react'
import AdminListedProductCard from '../components/AdminListedProductCard'

const AdminSideProducts = () => {
    return (
        <div className="flex-1 min-h-screen bg-[#060606] text-neutral-200 p-4 sm:p-6 lg:p-10 flex flex-col gap-6 font-sans antialiased select-none">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-900 pb-5">
                <div className="flex flex-col gap-0.5">
                    <h1 className="text-xl font-bold tracking-tight text-neutral-100">
                        Products Inventory
                    </h1>
                    <p className="text-xs font-medium text-neutral-500">
                        Manage, monitor, and edit your live commercial store listings.
                    </p>
                </div>

                <div className="shrink-0">
                    <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-400">
                        Live Status Active
                    </span>
                </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b0b0b]/40 p-3 rounded-2xl border border-neutral-900/60">

                <div className="relative w-full sm:max-w-xs group">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-emerald-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>

                    <input
                        type="text"
                        placeholder="Search product line..."
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                    />
                </div>

                <div className="relative w-full sm:w-48">
                    <select
                        name="price-sort"
                        className="w-full h-11 pl-3.5 pr-10 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-400 hover:text-neutral-200 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none appearance-none cursor-pointer font-medium"
                    >
                        <option value="low-to-high">Price: Low to High</option>
                        <option value="high-to-low">Price: High to Low</option>
                    </select>

                    <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-neutral-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </span>
                </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-3 mt-1">
                <AdminListedProductCard />
                <AdminListedProductCard />
                <AdminListedProductCard />
            </div>

        </div>
    )
}

export default AdminSideProducts