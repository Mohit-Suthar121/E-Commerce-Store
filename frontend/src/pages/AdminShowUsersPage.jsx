import React from 'react'
import UserInfoCard from '../components/UserInfoCard'
import { Outlet } from 'react-router-dom'

const AdminShowUsersPage = () => {
    return (
        <div className="flex-1 flex flex-col gap-5 p-5 bg-[#060606] min-h-screen text-neutral-200 font-sans antialiased select-none ">
            
            <div className="flex flex-col w-full pl-1 border-b border-neutral-900 pb-4">
                <h2 className="text-xl font-bold tracking-tight text-neutral-100">
                    User Management
                </h2>
                <p className="text-xs font-medium text-neutral-500 mt-0.5">
                    View, filter, and audit registered system accounts.
                </p>
            </div>

            <div className="search-bar-wrapper w-full flex justify-center items-center md:justify-start">
                <div className="relative max-w-xl w-full md:max-w-sm group flex justify-center items-center">
                    <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-neutral-600 group-focus-within:text-emerald-500 transition-colors duration-200">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>

                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        className="w-full h-11 pl-10 pr-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                    />
                </div>
            </div>

            <div className="users-section flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-2 items-center w-full">
                <UserInfoCard 
                    profilePicture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FyhKFiRoCdmrxbS5CDkACBhuak_CQjnhKg&s" 
                    username="Rohan Singh" 
                    email="rohansingh232@gmail.com" 
                    position={"user"}
                    
                />
                <UserInfoCard 
                    profilePicture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FyhKFiRoCdmrxbS5CDkACBhuak_CQjnhKg&s" 
                    username="Rohan Singh" 
                    email="rohansingh232@gmail.com" 
                    position={"admin"}
                    
                />
                <UserInfoCard 
                    profilePicture="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FyhKFiRoCdmrxbS5CDkACBhuak_CQjnhKg&s" 
                    username="Rohan Singh" 
                    email="rohansingh232@gmail.com" 
                    position={"superadmin"}
                    
                />
            </div>
        </div>
    )
}

export default AdminShowUsersPage