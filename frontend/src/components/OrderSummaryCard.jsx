import React, { useState } from 'react'
import { useCartStore } from '../store/cart.store';
import { useNavigate } from 'react-router-dom';

const OrderSummaryCard = () => {


    const productsInCart = useCartStore((state) => state.productsInCart);
    const [gstPercentage, setGstPercentage] = useState(3);
    const [shippingCost, setShippingCost] = useState(0);
    const navigate = useNavigate();
    let subTotal = 0;
    if (productsInCart?.length > 0) {

        productsInCart.forEach((p) => {
            subTotal += p.quantity * p.product.price;
        });
    }
    console.log("the products in cart are: ", productsInCart)
    const gstPrice = subTotal * gstPercentage / 100;
    const totalAmount = subTotal + gstPrice;

    // Standardized Indian Rupee (₹) Formatter
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="w-full max-w-md bg-[#09090b] border border-neutral-800/80 rounded-2xl p-6 flex flex-col justify-between gap-6 shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
                <h2 className="uppercase text-xs font-mono font-bold text-neutral-400 tracking-wider">
                    Order Summary
                </h2>
                <span className="text-xs font-mono text-neutral-500 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-full">
                    {productsInCart.length} {productsInCart.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            {/* Price Breakdown */}
            <div className="details flex flex-col gap-3 text-sm">
                {/* Subtotal */}
                <div className="subtotal flex justify-between items-center text-neutral-300">
                    <span className="text-neutral-400">Subtotal</span>
                    <span className="font-mono font-medium text-neutral-200">
                        {formatCurrency(subTotal)}
                    </span>
                </div>

                {/* Shipping */}
                <div className="shipping flex justify-between items-center text-neutral-300">
                    <span className="text-neutral-400">Shipping</span>
                    <span>
                        {shippingCost > 0 ? (
                            <span className="font-mono text-neutral-200">{formatCurrency(shippingCost)}</span>
                        ) : (
                            <span className="font-mono text-[11px] text-emerald-400 font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                Free
                            </span>
                        )}
                    </span>
                </div>

                {/* Tax */}
                <div className="tax flex justify-between items-center text-neutral-300">
                    <span className="text-neutral-400">Estimated GST ({gstPercentage}%)</span>
                    <span className="font-mono font-medium text-neutral-200">
                        {formatCurrency(gstPrice)}
                    </span>
                </div>
            </div>

            {/* Subtle Divider */}
            <div className="h-px w-full bg-neutral-800/80" />

            {/* Total Row */}
            <div className="total flex justify-between items-baseline">
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-white">Total Amount</span>
                    <span className="text-[11px] text-neutral-500 font-mono">Includes all applicable taxes</span>
                </div>
                <span className="text-2xl font-bold font-mono text-white tracking-tight">
                    {formatCurrency(totalAmount)}
                </span>
            </div>

            {/* Primary Action Button */}
            <button
                type="button"
                onClick={()=>{navigate('/checkout')}}
                className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-xl text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-[0.99] cursor-pointer flex justify-center items-center gap-2 mt-1"
            >
                <span>Proceed to Checkout</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>

            {/* Trust Badges / Perks Section */}
            <div className="other-info flex flex-col gap-2.5 pt-4 border-t border-neutral-900 text-xs text-neutral-400">
                <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 .999.999 0 0 0-.987 1.106v7.635m12 0A2.25 2.25 0 0 1 14.25 12h-12" />
                    </svg>
                    <span>Free shipping on all orders over ₹999</span>
                </div>

                <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                    <span>Hassle-free 30-day return policy</span>
                </div>

                <div className="flex items-center gap-2.5">
                    <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <span>Encrypted & secure checkout</span>
                </div>
            </div>

        </div>
    )
}

export default OrderSummaryCard;