import React, { useState } from 'react'

const AdminEditUserInfo = () => {
    const [userData, setUserData] = useState({
        fullName: "Rohan Sharma",
        email: "rohitsharma12@gmail.com",
        phoneNo: "+91 9874069373",
        address: "mai nahi bataaunga",
        city: "new york",
        zipCode: "348579"
    })
    
    const [userRole, setUserRole] = useState("user")

    const roleStyles = {
        superadmin: "text-blue-400 bg-blue-500/[0.06] border-blue-500/15",
        admin: "text-emerald-400 bg-emerald-500/[0.06] border-emerald-500/15",
        user: "text-neutral-400 bg-neutral-900/60 border-neutral-800"
    }

    const humanLabels = {
        fullName: "Full Name",
        email: "Email Address",
        phoneNo: "Phone Number",
        address: "Street Address",
        city: "City",
        zipCode: "Zip Code"
    }

    return (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 p-6 font-sans antialiased select-none bg-[#060606] min-h-screen">

            <div className="flex flex-col items-center gap-4 shrink-0">
                <div className="relative group w-32 h-32 rounded-full border-2 border-neutral-900 p-1.5 bg-neutral-950 shadow-2xl">
                    <img
                        className="w-full h-full object-cover rounded-full filter brightness-95 group-hover:brightness-100 transition-all duration-200"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcT0QGetG2uzAvnYBjODTUeGzqZjpcfsUUQ&s"
                        alt="User Profile Avatar"
                    />
                </div>
            </div>

            <div className="w-full max-w-xl bg-[#0b0b0b] border border-neutral-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden">

                <div className="grid grid-cols-2 gap-4 border-b border-neutral-900 items-center px-6 py-4.5 bg-neutral-950/40">
                    <div className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Account Role</div>
                    <div className="flex">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase border border-solid ${roleStyles[userRole]}`}>
                            {userRole}
                        </span>
                    </div>
                </div>

                {Object.entries(userData).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 border-b border-neutral-900 items-center px-6 py-4 hover:bg-neutral-950/20 transition-colors duration-100">
                        <div className="text-xs font-bold uppercase text-neutral-500 tracking-wider">
                            {humanLabels[key] || key}
                        </div>
                        <div className="text-sm font-medium text-neutral-200 tracking-wide truncate">
                            {value}
                        </div>
                    </div>
                ))}

                {/* DYNAMIC MANAGEMENT ADMINISTRATIVE ACTION BUTTONS */}
                <div className="buttons-section grid grid-cols-2 gap-3 p-4 bg-neutral-950/40">
                    
                    {/* SYSTEM BAN TRIPPERS */}
                    <button className="w-full h-10 flex justify-center items-center rounded-xl bg-rose-500/4 hover:bg-rose-500/8 border border-rose-500/20 hover:border-rose-500/30 text-rose-400 font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer active:scale-[0.98]">
                        Ban User
                    </button>

                    {/* ACCOUNT ELEVATION SIGNALS */}
                    <button className="w-full h-10 flex justify-center items-center rounded-xl bg-emerald-500/4 hover:bg-emerald-500/8 border border-emerald-500/20 hover:border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer active:scale-[0.98]">
                        Promote Admin
                    </button>

                </div>

            </div>
        </div>
    )
}

export default AdminEditUserInfo