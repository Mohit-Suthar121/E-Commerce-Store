import React from 'react'

const NoUsersFoundCard = ({ searchTerm = "", onClearSearch }) => {
  const isSearching = Boolean(searchTerm.trim());

  return (
    <div className="w-full flex justify-center items-center py-12 px-4 animate-fade-in">
      <div className="w-full max-w-md bg-[#0b0b0b] border border-neutral-900 rounded-2xl p-8 flex flex-col items-center text-center gap-6 shadow-2xl relative overflow-hidden group">
        
        <div className="absolute -top-24 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-pink-500/10 transition-colors duration-500" />
        
        <div className="relative w-16 h-16 rounded-2xl bg-neutral-950 border border-neutral-900 flex items-center justify-center text-neutral-600 shadow-inner group-hover:border-purple-500/30 group-hover:text-purple-400 transition-all duration-300">
          {isSearching ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          )}
          
          <span className={`absolute top-1 right-1 w-2.5 h-2.5 rounded-full border border-[#0b0b0b] ${isSearching ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'bg-neutral-800'}`} />
        </div>

        <div className="flex flex-col gap-1.5 z-10">
          <span className="text-[10px] font-mono tracking-widest text-purple-500 uppercase font-bold">
            {isSearching ? "// SEARCH_CRITERIA_NULL" : "// USER_REGISTRY_EMPTY"}
          </span>
          <h3 className="text-base font-bold text-neutral-200 tracking-tight">
            {isSearching ? "No Matching Users" : "No User Accounts Found"}
          </h3>
          <p className="text-xs text-neutral-500 max-w-70 mx-auto leading-relaxed">
            {isSearching ? (
              <>
                No directory profiles matched <span className="font-mono text-pink-400 bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-900/60 font-semibold">"{searchTerm}"</span>. Double-check spelling or try a different parameter.
              </>
            ) : (
              "The system database has no registered user accounts logged at this operational scale."
            )}
          </p>
        </div>

        {/* Conditional Action Callout (Clearing Search Filter) */}
        {isSearching && onClearSearch && (
          <button
            onClick={onClearSearch}
            type="button"
            className="px-4 py-2 text-xs font-mono font-bold tracking-wider uppercase border border-neutral-850 hover:border-purple-500/40 bg-neutral-950/60 text-neutral-400 hover:text-purple-400 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] z-10 shadow-lg shadow-black/20"
          >
            CLEAR_SEARCH_FILTER
          </button>
        )}
      </div>
    </div>
  )
}

export default NoUsersFoundCard;
