import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import CartLogo from '../icons/CartLogo';
import ShoppingCartProduct from '../components/ShoppingCartProduct';
import { useCartStore } from '../store/cart.store';
import { useNavigate } from 'react-router-dom';
import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { API } from '../api/axiosInstance';
import { useUser } from "../hooks/useCurrentUser.js"
import OrderSummaryCard from '../components/OrderSummaryCard';
import { useCart } from '../hooks/useCart.js';
import NotLoggedInWarning from '../components/NotLoggedInWarning.jsx';
import OrderSummaryCardSkeleton from '../components/OrderSummaryCardSkeleton.jsx';
import ShoppingCartProductSkeleton from '../components/ShoppingCartProductSkeleton.jsx';
import { useQueryClient } from '@tanstack/react-query';


const Cart = () => {
    const deleteProductFromCart = useCartStore((state) => state.GuestDeleteProductFromCart);
    const [showLoggedInWarning, setShowLoggedInWarning] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const queryClient = useQueryClient();


    const handleDelete = async (id) => {
        if (!user) {
            deleteProductFromCart(id);
            return;
        }

        try {
            queryClient.setQueryData(["serverCart"],(old)=>(
                old?.filter((p)=>p?.product?._id.toString()!==id)
            ))
            await API.delete(`/v1/cart/product/${id}/delete-product`);
            notifySuccess("the product removed from the cart successfully!")
        } catch (error) {
            console.error("couldn't delete product", error?.response?.data || error);
            notifyFailure(error?.response?.data || error)
        }
    }




    const { items: productsInCart, isLoading } = useCart();
    // const productsInCart = user ? serverCartItems : guestCartItems;
    console.log("the productsInCart finally are: ", productsInCart)


    return (
        <div className='w-full h-screen flex flex-col'>
            <Navbar />

            {showLoggedInWarning && <div className="fixed w-screen h-screen backdrop-blur-2xl flex justify-center items-center z-100 ">
                <NotLoggedInWarning parentPage={'/checkout'} setShowLoggedInWarning={setShowLoggedInWarning} />
            </div>}

            {(isLoading || productsInCart.length>0) && <div className="maincontent w-full min-h-screen bg-black text-neutral-200 flex justify-center items-start p-4 sm:p-8 lg:p-12">
                <div className="w-full max-w-6xl flex flex-col gap-6 ">

                    {/* Header */}
                     <div className="flex items-center justify-between px-1 ">
                        <div className="flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
                            <h1 className="text-lg sm:text-xl font-mono font-bold tracking-wider text-neutral-200 uppercase">
                                Shopping Cart
                            </h1>
                        </div>
                        <span className="text-xs font-mono text-neutral-400 bg-neutral-900 border border-neutral-800/80 px-3 py-1 rounded-full">
                            {productsInCart.length} {productsInCart.length === 1 ? 'Item' : 'Items'}
                        </span>
                    </div>

                    {/* Main Layout Grid */}
                    <div className="left-right-section grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                        {/* Products Scroll Container */}
                        <div className="lg:col-span-7 flex flex-col gap-4 w-full max-h-120 overflow-y-auto pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
                            {isLoading ? Array.from({ length: 3 }).map((_, index) => <ShoppingCartProductSkeleton key={index} />) : (productsInCart?.map((p) => (
                                <ShoppingCartProduct
                                    key={p?.product?._id}
                                    id={p?.product?._id}
                                    name={p?.product?.name}
                                    price={p?.product?.price}
                                    quantity={p?.quantity}
                                    image={p?.product?.images?.[0]?.url}
                                    stock={p?.product?.stock}
                                    onClick={() => { navigate(`/products/${p?.product?._id}`) }}
                                    handleDelete={() => { handleDelete(p?.product?._id) }}
                                />
                            )))}

                        </div>

                        {/* Mobile Divider */}
                        <div className="lg:hidden border-t border-neutral-800/80 w-full my-1" />

                        {/* Right Column: Order Summary Anchor */}
                        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end lg:sticky lg:top-10">
                            {isLoading ? <OrderSummaryCardSkeleton /> : <OrderSummaryCard setShowLoggedInWarning={setShowLoggedInWarning} />}
                        </div>

                    </div>
                </div>
            </div>}




            {(!isLoading && productsInCart.length == 0) && <div className="maincontent flex flex-1 justify-center items-center">
                <div className="no-items-box flex flex-col gap-2  justify-center items-center">

                    <div className="cart-logo p-4 rounded-full bg-neutral-900 border border-neutral-800">
                        <CartLogo currentColor={"gray"} className={"w-10 h-10"} />
                    </div>
                    <div className="empty-text font-semibold text-xl text-[#ebebeb]">Your Cart is Empty</div>

                    <div className="text-neutral-500 font-semibold">Looks like you haven't added anything to your cart yet</div>
                    <div onClick={() => { navigate('/products') }} className="start-shoppingbutton pt-2">

                        <button className="start-shopping text-sm text-black font-semibold px-6 py-3 rounded-lg bg-white border border-neutral-800 cursor-pointer active:scale-95 hover:brightness-90">Start Shopping</button>
                    </div>
                </div>
            </div>}





        </div>
    )


}

export default Cart














