import React, { useEffect, useRef } from 'react'
import DeleteIcon from '../icons/DeleteIcon'
import { useCartStore } from '../store/cart.store';
import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { useAuthStore } from '../store/auth.store';
import { API } from '../api/axiosInstance';

const ShoppingCartProduct = ({
    name,
    price = 0,
    quantity = 1,
    image,
    stock = 99,
    onClick,
    onRemove,
    id,
    handleDelete
}) => {


    const timerRef = useRef(null);
    const totalPrice = price * quantity;
    const setQuantity = useCartStore((state) => state.setQuantity);
    const isFirstRender = useRef(true);
    const user = useAuthStore((state)=>state.user)

    // Standardized Indian Rupee (₹) Formatter
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };


    const handleIncrease = async () => {
        if(quantity>=stock) return;
        const newQuantity = quantity+1;
        setQuantity(id, newQuantity);
        updateQuantity(newQuantity);

    }

    const handleDecrease = async () => {
        if (quantity <= 1) return;
        const newQuantity = quantity-1;
        setQuantity(id, newQuantity);
        updateQuantity(newQuantity);
    }

    const updateQuantity =  (newQuantity) => {
        if(!user) return;
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        const timer = setTimeout(async () => {
            const data = {
                quantity:newQuantity
            }
            try {
                const response = await API.patch(`/v1/cart/product/${id}/update-quantity`, data);
                console.log("the item which got updated is: ", response.data);
                notifySuccess("quantitiy updated successfully!")

            } catch (error) {
                console.error("couldn't update the quantity!", error?.response?.data || error);
                notifyFailure(error?.response?.data || error);
            }

        }, 500)

        timerRef.current = timer;
    }


    


    
    useEffect(()=>{
        return ()=>{
            if(timerRef.current){
                clearTimeout(timerRef.current);
            }
        }
    },[])



    return (
        <div
            onClick={onClick}
            className='w-full rounded-2xl flex sm:flex-row flex-col items-center gap-4 py-3.5 px-4 bg-[#09090b] border-neutral-800/80 border cursor-pointer group hover:border-neutral-700/80 transition-all duration-200 justify-between'
        >
            {/* Left Side: Product Image & Info */}
            <div className="left-side-wrapper flex items-center gap-4 w-full sm:w-auto flex-1 min-w-0">
                <div className="product-image w-14 h-14 md:w-16 md:h-16 rounded-xl bg-neutral-950 border border-neutral-800/80 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 overflow-hidden">
                    <img className='max-w-full max-h-full object-contain rounded-lg' src={image} alt={name} />
                </div>

                <div className="product-name-and-price flex flex-col flex-1 min-w-0 gap-1">
                    <h4 className="heading w-full truncate font-medium text-sm text-neutral-200 group-hover:text-white transition-colors">
                        {name}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="price font-mono text-xs text-neutral-400">
                            Unit: <span className="text-neutral-300 font-semibold">{formatCurrency(price)}</span>
                        </span>
                        {/* Stock Count Pill */}
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-medium">
                            {stock} in stock
                        </span>
                    </div>
                </div>
            </div>

            <div className="seperator-line flex h-px w-full border-t border-neutral-900 sm:hidden" />

            {/* Right Side: Stepper, Subtotal & Actions */}
            <div className="flex sm:gap-6 gap-4 items-center justify-between sm:justify-end w-full sm:w-auto">

                {/* 🔢 Interactive Quantity Stepper */}
                <div
                    className="product-quantity flex items-center h-10 bg-neutral-950 border border-neutral-800/80 rounded-xl p-1 shrink-0"
                    onClick={(e) => e.stopPropagation()} // Prevents triggering product detail navigation
                >
                    {/* Decrement Button */}
                    <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-7 h-full flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors cursor-pointer select-none font-mono text-sm font-bold active:scale-95"
                    >
                        -
                    </button>

                    {/* Quantity Value */}
                    <span className="w-8 text-center text-xs font-mono font-bold text-white select-none">
                        {quantity}
                    </span>

                    {/* Increment Button */}
                    <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={quantity >= stock}
                        aria-label="Increase quantity"
                        className="w-7 h-full flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors cursor-pointer select-none font-mono text-sm font-bold active:scale-95"
                    >
                        +
                    </button>
                </div>

                {/* Subtotal Display */}
                <div className="product-total-price font-semibold flex flex-col sm:items-end items-start min-w-[75px]">
                    <span className='text-[9px] font-mono text-neutral-500 uppercase tracking-wider mb-0.5'>Total</span>
                    <span className='font-mono text-sm text-neutral-100 font-bold tracking-tight'>
                        {formatCurrency(totalPrice)}
                    </span>
                </div>

                {/* Remove Item Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation(); // Stops card click
                        handleDelete();
                    }}
                    aria-label="Remove product"
                    className="remove-button flex text-neutral-500 cursor-pointer p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 justify-center items-center hover:border-red-500/40 hover:bg-red-500/5 hover:text-red-400 transition-all duration-200 active:scale-95 shrink-0"
                >
                    <DeleteIcon currentColor="currentColor" className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default ShoppingCartProduct;