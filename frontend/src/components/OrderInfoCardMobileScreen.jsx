import React from 'react'

const OrderInfoCardMobileScreen = ({orderId,userGmail,itemsCount,totalPrice,paymentStatus,fulfillmentDate}) => {

    const statusConfig = {
        paid: "bg-emerald-500/[0.06] border-emerald-500/15 text-emerald-400",
        pending: "bg-amber-500/[0.06] border-amber-500/15 text-amber-400",
        failed: "bg-rose-500/[0.06] border-rose-500/15 text-rose-400"
    }

    return (
        <div className=' flex sm:hidden flex-col border border-neutral-900 bg-[#0b0b0b] rounded-2xl' >
            <div className="order-id grid grid-cols-2 items-center border-b border-neutral-900">
                <div className="order-id-text px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">order id</div>
                <div className="order-id-number px-5 py-4 text-xs font-mono text-neutral-400 group-hover:text-neutral-200 transition-colors">#{orderId}</div>
            </div>

            <div className="user-customer grid grid-cols-2 items-center border-b border-neutral-900">
                <div className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">user customer</div>
                <div className="email-id user-customer-id px-5 py-4 text-sm font-medium text-neutral-200 truncate max-w-50">{userGmail}</div>

            </div>
            <div className="items-count grid grid-cols-2 items-center border-b border-neutral-900">
                <div className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">items count</div>
                <div className="px-5 py-4 text-sm font-medium text-neutral-400"><span className="text-neutral-600 font-mono text-xs mr-0.5">x</span>
                    {itemsCount}</div>

            </div>



            <div className="total-price grid grid-cols-2 items-center border-b border-neutral-900">
                <div className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">total price</div>
                <div className="px-5 py-4 text-sm font-bold font-mono text-neutral-200">₹{totalPrice}</div>

            </div>


            <div className="payment-status grid grid-cols-2 border-b border-neutral-900 justify-center items-center">
                <div className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">payment status</div>

                <div className="px-5">
                    <span className={`inline-flex  items-center justify-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide uppercase border ${statusConfig[paymentStatus] || "bg-neutral-800 text-neutral-400 border-neutral-700"}`}>
                        {paymentStatus}
                    </span>

                </div>

            </div>

            <div className="fullfilment-status grid grid-cols-2 items-center border-b border-neutral-900">
                <div className="px-5 py-3.5 text-xs font-bold uppercase tracking-wider text-neutral-500">Fulfillment date</div>
                <div className="px-5 text-xs font-medium font-mono text-neutral-500 ">
                    {fulfillmentDate}
                </div>

            </div>


        </div>
    )
}

export default OrderInfoCardMobileScreen