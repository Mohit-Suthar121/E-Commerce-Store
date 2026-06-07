import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CartLogo from '../icons/CartLogo';
import ShoppingCartProduct from '../components/ShoppingCartProduct';

const Cart = () => {
    const [items, setItems] = useState(4); // we will change it later , it will contain objects
    return (
        <div className='w-full h-screen flex flex-col'>
            <Navbar />

            {items > 0 && <div className="maincontent flex min-h-0 flex-1 md:py-6 md:px-16 p-2">

                <div className="show-items flex flex-col gap-4 w-full h-full min-h-0">

                    <h1 className='text-xl font-bold text-gray-300 px-4 uppercase h-fit flex items-center'>Shopping Cart</h1>

                    <div className="left-right-section flex flex-col gap-4 flex-1 lg:items-start md:min-h-0 md:justify-between md:gap-10 lg:flex-row border-red-500  items-center">

                        <div className="show-products flex h-82 md:h-full flex-col min-h-0 md:min-h-0 md:flex-1 gap-6 w-full md:w-[60%] px-4 overflow-y-auto scrollbar-design items-center max-w-xl">
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                            <ShoppingCartProduct />
                        </div>

                        <div className="flex md:hidden border-line border-neutral-800/60 border w-[90%] self-center h-0" />



                        <div className="flex right-side-wrapper flex-1 h-full justify-center md:flex items-center xl:items-center w-full ">


                            <div className="order-summary-card bg-[#0f0f0f] max-w-xl xl:max-w-110 border-neutral-800 rounded-2xl flex flex-1 flex-col gap-3 py-6 px-8 w-full  border h-fit ">
                                <h2 className=" heading uppercase text-xs font-bold tracking-widest text-gray-600 ml-1">Order Summary</h2>

                                <div className="details flex flex-col gap-2 border bg-neutral-950/40 p-4 rounded-xl border-neutral-900/50">
                                    <div className="flex justify-between items-center text-sm font-medium text-neutral-400">
                                        <span>Subtotal ({items} items)</span>
                                        <span className="font-mono text-neutral-200">₹1,23,432.00</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium text-neutral-400">
                                        <span>Estimated Shipping</span>
                                        <span className="font-mono text-emerald-400 text-xs font-bold uppercase tracking-wide bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">Free</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium text-neutral-400">
                                        <span>Tax (GST 5%)</span>                                          <span className="font-mono text-neutral-200">₹6,199.00</span>
                                    </div>

                                    <div className="h-px bg-neutral-900 my-1 " />

                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-sm font-bold text-neutral-200">Total Amount</span>
                                        <span className="text-lg font-bold font-mono text-white tracking-tight">₹1,30,188.45</span>
                                    </div>

                                </div>





                                <div className="flex items-center gap-2.5">
                                    <input
                                        type="text"
                                        className="h-10 px-3.5 rounded-xl flex-1 text-xs bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                                        placeholder="Promo or voucher code..."
                                    />
                                    <button className="h-10 px-4 rounded-xl text-xs font-semibold bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95 shrink-0">
                                        Apply
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2 pt-2">
                                    <button className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-wide shadow-md cursor-pointer transition-colors active:scale-[0.99]">                                            Proceed to Checkout
                                    </button>
                                    <button className="w-full h-11 flex justify-center items-center rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-400 hover:text-neutral-200 text-sm font-medium cursor-pointer transition-all active:scale-[0.99]">
                                        Continue Shopping
                                    </button>
                                </div>

                                <div className="flex flex-col gap-2 pt-3 border-t border-neutral-900 text-[11px] text-neutral-500 font-medium pl-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-500/60 text-xs">•</span>
                                        <span>Free shipping on all orders over ₹4,000</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-500/60 text-xs">•</span>
                                        <span>No-questions-asked 30-day return policy</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-500/60 text-xs">•</span>
                                        <span>Secure bank checkout via 256-bit SSL encryption</span>
                                    </div>
                                </div>

                            </div>
                        </div>



                    </div>


                </div>
            </div>}



            {items == 0 && <div className="maincontent flex flex-1 justify-center items-center">
                <div className="no-items-box flex flex-col gap-2  justify-center items-center">

                    <div className="cart-logo p-4 rounded-full bg-neutral-900 border border-neutral-800">
                        <CartLogo currentColor={"gray"} className={"w-10 h-10"} />
                    </div>
                    <div className="empty-text font-semibold text-xl text-[#ebebeb]">Your Cart is Empty</div>

                    <div className="text-neutral-500 font-semibold">Looks like you haven't added anything to your cart yet</div>
                    <div className="start-shoppingbutton pt-2">

                        <button className="start-shopping text-sm text-black font-semibold px-6 py-3 rounded-lg bg-white border border-neutral-800 cursor-pointer active:scale-95 hover:brightness-90  ">Start Shopping</button>
                    </div>

                </div>
            </div>}



        </div>
    )
}

export default Cart














