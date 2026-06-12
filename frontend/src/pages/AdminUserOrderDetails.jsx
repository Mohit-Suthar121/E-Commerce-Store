import React from 'react'
import OrdersCard from '../components/OrdersCard'
import { Link } from 'react-router-dom'
const AdminUserOrderDetails = () => {
  return (
    <div className="flex-1 p-6 sm:p-10 flex flex-col gap-6  bg-[#060606] text-neutral-200 font-sans antialiased select-none ">

      <div className="order-text w-full flex gap-3.5 items-center border-b border-neutral-900 pb-4">

        <Link
          to="/dashboard/users"
          className="go-back-button p-2 border border-neutral-800 rounded-xl bg-neutral-950/60 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 hover:border-neutral-700 transition-all duration-150 cursor-pointer active:scale-[0.96] flex items-center justify-center shrink-0 shadow-sm"

        >
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" width="18px" viewBox="0 -960 960 960" fill="currentColor">
            <path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z" />
          </svg>
        </Link>

        <div className="flex flex-col gap-0.5">
          <span className="font-bold text-[10px] uppercase tracking-widest text-neutral-500">Customer Files</span>
          <h1 className="font-bold text-base text-neutral-100 tracking-tight">User Orders List</h1>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3.5 flex-1 overflow-y-auto min-h-0 overflow-x-auto mx-auto items-center scrollbar-design">
        <OrdersCard />
        <OrdersCard />
        <OrdersCard />
      </div>

    </div>
  )
}

export default AdminUserOrderDetails