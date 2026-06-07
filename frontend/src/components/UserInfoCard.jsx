import React from 'react'
import EditIcon from '../icons/EditIcon'

const UserInfoCard = ({ profilePicture, username, email, position = "user" }) => {
  
  const roleStyles = {
    superadmin: "text-blue-400 bg-blue-500/[0.06] border-blue-500/15",
    admin: "text-emerald-400 bg-emerald-500/[0.06] border-emerald-500/15",
    user: "text-neutral-500 bg-neutral-900/50 border-neutral-800"
  }

  return (
    <div className="w-full relative p-4 flex flex-col gap-4 bg-[#0b0b0b] border border-neutral-900 rounded-2xl shadow-xl select-none font-sans antialiased max-w-xl">
      
      <div className={`absolute right-4 top-4 uppercase text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-md border ${roleStyles[position.toLowerCase()] || roleStyles.user}`}>
        {position}
      </div>

      <div className="flex items-center gap-3 pr-20">
        
        <div className="w-12 h-12 rounded-full border border-neutral-800/80 bg-neutral-950 overflow-hidden shrink-0">
          <img 
            className="w-full h-full object-cover object-center" 
            src={profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60"} 
            alt={`${username}'s profile`} 
          />
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm font-bold text-neutral-100 truncate tracking-wide">
            {username}
          </span>
          <span className="text-xs text-neutral-500 font-medium truncate tracking-tight mt-0.5">
            {email}
          </span>
        </div>

      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
        
        <button 
          type="button"
          className="w-full h-9 px-3 rounded-xl flex justify-center items-center gap-1.5 text-xs font-bold bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-[0.98]"
        >
          <EditIcon currentColor="currentColor" className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">Edit User Rights</span>
        </button>

        <button 
          type="button"
          className="w-full h-8 px-3 rounded-xl flex justify-center items-center gap-1.5 text-xs font-bold bg-white hover:bg-neutral-200 text-black shadow-sm transition-all cursor-pointer active:scale-[0.98]"
        >
          <svg className="w-3.5 h-3.5 shrink-0 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="whitespace-nowrap">Show Orders</span>
        </button>

      </div>

    </div>
  )
}

export default UserInfoCard