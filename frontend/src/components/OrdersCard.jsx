import React from 'react'
import OrderedProductCard from './OrderedProductCard'

const OrdersCard = () => {
    return (
        <div className='p-4 flex flex-col gap-3  rounded-2xl bg-[#0b0b0b] border border-neutral-900 shadow-xl w-full max-w-xl '>

            <div className="order-id-and-amount flex justify-between items-center border-b border-neutral-900 pb-2 ">
                <div className="order-id flex gap-2 ">

                    <span className='uppercase text-xs text-neutral-500 shrink-0 font-semibold flex items-center' >Order Id</span>
                    <span className="id-number text-sm font-mono tracking-tight text-neutral-300 truncate">#820349e7d9f9aeftergw</span>
                </div>
                <div className="paid-status px-2.5 font-semibold py-1 text-xs rounded-lg uppercase tracking-wide  flex justify-center items-center bg-emerald-500/10 text-emerald-400 border border-emerald-500/10">paid</div>


            </div>

            {/* <div className="seperator-line w-full h-0 border border-neutral-500"/> */}

            <div className="username-email-and-paid flex gap-2 justify-between items-center border border-neutral-900 rounded-lg p-3">
                <div className="username-and-email flex flex-col gap-1 ">

                    <div className="user flex gap-1 items-center">
                        <span className='text-sm font-semibold text-neutral-200' >Ankit Sharma</span>
                    </div>

                    <div className="user flex gap-1 items-center">
                        <span className='text-xs text-neutral-500 font-medium tracking-wide' >rohansingh234@gmail.com</span>
                    </div>


                </div>

                <div className="total-amount flex flex-col gap-1 justify-center items-center">
                    <span className="amount-text text-[11px] font-semibold text-neutral-500 uppercase tracking-widest"> total Amount</span>
                    <span className="amount-number text-base font-bold text-white tracking-tight">₹28,500.34</span>
                </div>
                {/* <div className="paid-status px-2 py-1 rounded-lg bg-green-600 text-white flex justify-center items-center">paid</div> */}

            </div>




            <div className="products flex flex-col gap-2">
                <div className="products-heading">Products:</div>
                <div className="items flex flex-col gap-4 p-4 max-h-60 overflow-y-auto scrollbar-design">
                    <OrderedProductCard />
                    <OrderedProductCard />
                </div>
            </div>


        </div>
    )
}

export default OrdersCard