import React, { useState } from 'react'
import OrderInfoCardMobileScreen from '../components/OrderInfoCardMobileScreen'

const AdminOrdersPage = () => {
    
    const [orders, setOrders] = useState([
        {
            orderId: "isjgi0erwhjt84u0258",
            user: "rohansingh2983@gmail.com",
            products: 3,
            totalAmount: 20000,
            status: "paid", // Can be "paid", "failed", or "pending"
            date: "20/6/2025"
        },
        {
            orderId: "axkld892jsdklfj9012",
            user: "amansharma@gmail.com",
            products: 1,
            totalAmount: 4500,
            status: "pending",
            date: "21/6/2025"
        },
        {
            orderId: "poweo1290skldf89231",
            user: " Priya.verma@gmail.com",
            products: 5,
            totalAmount: 89000,
            status: "failed",
            date: "22/6/2025"
        }
    ])

    const statusConfig = {
        paid: "bg-emerald-500/[0.06] border-emerald-500/15 text-emerald-400",
        pending: "bg-amber-500/[0.06] border-amber-500/15 text-amber-400",
        failed: "bg-rose-500/[0.06] border-rose-500/15 text-rose-400"
    }

    return (
        <div className="flex-1 flex flex-col gap-5 p-6 sm:p-8 bg-[#060606] min-h-screen text-neutral-200 font-sans antialiased select-none overflow-x-auto">
            
            <div className="flex flex-col gap-0.5 border-b border-neutral-900 pb-4">
                <h2 className="font-bold text-neutral-500 tracking-widest text-[11px] uppercase">
                    Admin Panel
                </h2>
                <h1 className="text-lg font-bold text-neutral-100 tracking-tight">
                    All Customer Orders
                </h1>
            </div>

            <div className="hidden sm:flex w-full overflow-x-auto rounded-2xl border border-neutral-900 bg-[#0b0b0b] shadow-2xl ">
                
                <table className="w-full text-left border-collapse min-w-175">
                    <thead>
                        <tr className="border-b border-neutral-900 bg-neutral-950/60">
                            <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">Order ID</th>
                            <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">User Customer</th>
                            <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">Items Count</th>
                            <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">Total Price</th>
                            <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500 text-center">Payment Status</th>
                            <th className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500 text-right">Fulfillment Date</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-900/60">
                        {orders.map((order) => (
                            <tr key={order.orderId} className="hover:bg-neutral-950/40 transition-colors duration-150 group">
                                
                                <td className="px-5 py-4 text-xs font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                    #{order.orderId}
                                </td>

                                <td className="px-5 py-4 text-sm font-medium text-neutral-200 truncate max-w-50">
                                    {order.user}
                                </td>

                                <td className="px-5 py-4 text-sm font-medium text-neutral-400">
                                    <span className="text-neutral-600 font-mono text-xs mr-0.5">x</span>
                                    {order.products}
                                </td>

                                <td className="px-5 py-4 text-sm font-bold font-mono text-neutral-200">
                                    ₹{order.totalAmount.toLocaleString()}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border ${statusConfig[order.status] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                                        {order.status}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-xs font-medium font-mono text-neutral-500 text-right">
                                    {order.date}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {orders.map((order)=>(
            <OrderInfoCardMobileScreen orderId={order.orderId} userGmail={order.user} itemsCount={order.products} totalPrice={order.totalAmount} paymentStatus={order.status} fulfillmentDate={order.date}  />

            ))}          

        </div>
    )
}

export default AdminOrdersPage
