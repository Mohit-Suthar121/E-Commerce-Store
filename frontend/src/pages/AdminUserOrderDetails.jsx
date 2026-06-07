import React from 'react'
import OrdersCard from '../components/OrdersCard'

const AdminUserOrderDetails = () => {
  return (
    <div className='flex-1 p-10 flex flex-col gap-5 border' >

        <div className="order-text w-full flex gap-2 items-center">
            <button className="go-back-button p-2 border rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 -960 960 960"  fill="#ffffff"><path d="M400-240 160-480l240-240 56 58-142 142h486v80H314l142 142-56 58Z"/></svg>
            </button>
            <div className="font-bold text-xs uppercase tracking-widest">orders</div>
        </div>
        <div className="orders-container flex flex-1 flex-col gap-2 overflow-y-auto w-full">
            <OrdersCard/>
        </div>

    </div>
  )
}

export default AdminUserOrderDetails