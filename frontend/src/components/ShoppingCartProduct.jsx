import React, { useEffect, useRef } from 'react'
import DeleteIcon from '../icons/DeleteIcon'
import { useCartStore } from '../store/cart.store';
import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { API } from '../api/axiosInstance';
import { useUser } from '../hooks/useCurrentUser';
import { useQueryClient } from '@tanstack/react-query';

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
    const GuestsetQuantity = useCartStore((state) => state.GuestsetQuantity);
    const guestProductsInCart = useCartStore((state)=>state.guestProductsInCart);
    const {user} = useUser();
    const queryClient = useQueryClient();
    // const {guestCartItems} = useCart();

    // console.log("the guest cart items are: ",guestCartItems);
    console.log("the guest cart items which is in the store are: ",guestProductsInCart)


    // Standardized Indian Rupee (₹) Formatter
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    
    const handleIncrease = () => {

        if (quantity >= stock) return;
        updateQuantity(quantity+1);
    }

    const handleDecrease = () => {
        if (quantity <= 1) return;
        updateQuantity(quantity-1);
    }

    const updateQuantity = (newQuantity) => {
        // for guest user: 
        if (!user){
            GuestsetQuantity(id,newQuantity);
            return;
        }

        queryClient.setQueryData(["serverCart"],(old)=> old?.map((item)=>item?.product?._id===id?{...item,quantity:newQuantity}:item))

        debouncedUpdate(id,newQuantity);        
    }

    const debouncedUpdate = (id,newQuantity)=>{
        if (timerRef.current) clearTimeout(timerRef.current);
        
        const timer = setTimeout(async () => {
            const data = { quantity: newQuantity }
            try {
                const response = await API.patch(`/v1/cart/product/${id}/update-quantity`, data);
                notifySuccess("Quantity updated successfully!");
            } catch (error) {
                queryClient.invalidateQueries(["serverCart"])
                console.error("Couldn't update the quantity!", error?.response?.data || error);
                notifyFailure(error?.response?.data || error);
            }
        }, 500)

        timerRef.current = timer;
    }   

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [])

    return (
        <div
            onClick={onClick}
            className="w-full rounded-2xl p-4 sm:p-5 bg-[#09090b] border border-neutral-800/80 hover:border-neutral-700/80 hover:bg-[#0c0c0e] transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-lg"
        >
            {/* Left Side: Larger Thumbnail & Details */}
            <div className="flex items-center gap-4.5 w-full sm:w-auto flex-1 min-w-0">
                {/* Enlarged Image Container (w-20 sm:w-22) */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-neutral-950 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 group-hover:scale-[1.03] transition-transform duration-200 overflow-hidden shadow-inner">
                    <img className="max-w-full max-h-full object-contain rounded-xl" src={image} alt={name} />
                </div>

                {/* Info Section */}
                <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                    <h4 className="w-full truncate font-medium text-base text-neutral-200 group-hover:text-emerald-400 transition-colors">
                        {name}
                    </h4>
                    
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs text-neutral-400">
                            Unit: <span className="text-neutral-200 font-semibold">{formatCurrency(price)}</span>
                        </span>
                        
                        {/* Stock Pill */}
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
                            {stock} in stock
                        </span>
                    </div>
                </div>
            </div>

            {/* Mobile Divider */}
            <div className="w-full h-px bg-neutral-800/60 sm:hidden" />

            {/* Right Side: Stepper, Total & Action */}
            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto shrink-0">
                
                {/* Quantity Stepper */}
                <div
                    className="flex items-center h-11 bg-neutral-950 border border-neutral-800/80 rounded-xl p-1 shrink-0"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-8 h-full flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors cursor-pointer font-mono text-sm font-bold active:scale-95"
                    >
                        -
                    </button>

                    <span className="w-9 text-center text-xs font-mono font-bold text-white select-none">
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={quantity >= stock}
                        aria-label="Increase quantity"
                        className="w-8 h-full flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-neutral-400 transition-colors cursor-pointer font-mono text-sm font-bold active:scale-95"
                    >
                        +
                    </button>
                </div>

                {/* Subtotal Display */}
                <div className="flex flex-col items-start sm:items-end min-w-[85px]">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">Subtotal</span>
                    <span className="font-mono text-base text-emerald-400 font-bold tracking-tight">
                        {formatCurrency(totalPrice)}
                    </span>
                </div>

                {/* Delete Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    aria-label="Remove product"
                    className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 text-neutral-400 hover:text-rose-400 hover:border-rose-500/40 hover:bg-rose-500/10 transition-all duration-200 cursor-pointer active:scale-95 shrink-0"
                >
                    <DeleteIcon currentColor="currentColor" className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default ShoppingCartProduct