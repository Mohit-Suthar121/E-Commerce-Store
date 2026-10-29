import React, { useEffect, useState } from 'react'
import OrderInfoCardMobileScreen from '../components/OrderInfoCardMobileScreen'
import { useQuery } from '@tanstack/react-query'
import { API } from '../api/axiosInstance'
import { notifyFailure } from '../utils/Toastify'
import { formatDate } from '../utils/dateFormate'
import OrderDetailsDrawer from '../components/OrderDetailsDrawer'


const AdminOrdersPage = () => {
    const [page, setPage] = useState(1)
    const limit = 8;
    const [orderDetails,setOrderDetails] = useState(null);

    const fetchOrders = async (page) => {
        const response = await API.get(`/v1/admin/order/orders?limit=${limit}&page=${page}`);
        console.log("the response is: ",response.data)
        return response.data
    }


    const { data, isPending, isError, error } = useQuery({
        queryKey: ['orders', page],
        queryFn: () => fetchOrders(page)
    })

    const orders = data?.orders || [];

    console.log("the query orders are: ",data)


    useEffect(() => {
        if (isError) {
            notifyFailure(error);
        }
        console.log("the orders are",orders)
    }, [isError, error, orders])


    const statusConfig = {
        paid: "bg-emerald-500/[0.06] border-emerald-500/15 text-emerald-400",
        pending: "bg-amber-500/[0.06] border-amber-500/15 text-amber-400",
        failed: "bg-rose-500/[0.06] border-rose-500/15 text-rose-400"
    }

    return (
        <div className="flex-1 flex flex-col gap-5 p-6 sm:p-8 bg-[#060606] text-neutral-200 font-sans antialiased select-none overflow-x-auto">

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
                        {orders?.map((order) => (
                            <tr onClick={()=>{setOrderDetails(order)}} key={order?._id} className="cursor-pointer hover:bg-neutral-950/40 transition-colors duration-150 group">

                                <td className="px-5 py-4 text-xs font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                    #{order?._id}
                                </td>

                                <td className="px-5 py-4 text-sm font-medium text-neutral-200 truncate max-w-50">
                                    {order?.user?.email}
                                </td>

                                <td className="px-5 py-4 text-sm font-medium text-neutral-400">
                                    <span className="text-neutral-600 font-mono text-xs mr-0.5">x</span>
                                    {order?.orderedItems?.length}
                                </td>

                                <td className="px-5 py-4 text-sm font-bold font-mono text-neutral-200">
                                    ₹{order?.totalAmount?.toLocaleString()}
                                </td>

                                <td className="px-5 py-4 text-center">
                                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border ${statusConfig[order.paymentInfo.status] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                                        {order?.paymentInfo.status}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-xs font-medium font-mono text-neutral-500 text-right">
                                    {formatDate(order?.createdAt)}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

            {orders?.map((order) => (
                <OrderInfoCardMobileScreen key={order?._id} onClick={()=>{setOrderDetails(order)}} orderId={order?._id} userGmail={order?.user?.email} itemsCount={order?.orderedItems.length} totalPrice={order?.totalAmount} paymentStatus={order?.status} fulfillmentDate={order?.date} />

            ))}

            {orderDetails && <OrderDetailsDrawer order={orderDetails} onClose={()=>{setOrderDetails(null)}}  />}

        </div>
    )
}

export default AdminOrdersPage
