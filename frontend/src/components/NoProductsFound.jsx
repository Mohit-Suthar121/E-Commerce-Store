
const NoProductsFound = ({ onReset }) => {
    return (
        <div className="flex-1 w-full flex flex-col items-center justify-center gap-4 py-20 px-6 text-center rounded-2xl border border-dashed border-neutral-800 bg-[#0f0f0f]">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                <svg className="w-7 h-7 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM8 10h4" />
                </svg>
            </div>

            <h2 className="text-lg font-semibold text-neutral-200">No products found</h2>
            <p className="text-sm text-neutral-500 max-w-xs">
                We couldn't find anything matching your search or filters. Try changing the keywords, category, or price range.
            </p>

            <button
                onClick={onReset}
                className="mt-2 px-5 py-2.5 text-sm capitalize font-semibold bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer active:scale-95 hover:border-emerald-500 hover:bg-emerald-950 transition-all duration-300"
            >
                reset filters
            </button>
        </div>
    )
}

export default NoProductsFound