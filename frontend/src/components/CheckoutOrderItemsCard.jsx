import React from 'react'
import { useNavigate } from 'react-router-dom'

// UI-only component. Read-only summary of items being purchased — no editing.
// Expected props:
// - items: array of { id, name, price, quantity, image, stock }
// - onEditCart: () => void  -> navigate back to cart page (optional)

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}


const CheckoutItemRow = ({ name, price, quantity, image }) => {
    const totalPrice = price * quantity
    return (
        <div className="w-full rounded-2xl p-3.5 sm:p-4 bg-[#09090b] border border-neutral-800/80 flex items-center gap-4">

            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl bg-neutral-950 border border-neutral-800/80 p-1.5 flex items-center justify-center shrink-0 overflow-hidden">
                <img className="max-w-full max-h-full object-contain rounded-lg" src={image} alt={name} />
            </div>

            {/* Info */}
            <div className="flex flex-col flex-1 min-w-0 gap-1">
                <h4 className="w-full truncate font-medium text-sm text-neutral-200">
                    {name}
                </h4>
                <span className="font-mono text-xs text-neutral-500">
                    {formatCurrency(price)} <span className="text-neutral-700">x</span> {quantity}
                </span>
            </div>

            {/* Quantity Badge (read-only) */}
            <div className="hidden sm:flex items-center justify-center h-9 min-w-[2.75rem] px-2.5 bg-neutral-950 border border-neutral-800/80 rounded-lg shrink-0">
                <span className="text-xs font-mono font-bold text-neutral-300">
                    x{quantity}
                </span>
            </div>

            {/* Subtotal */}
            <div className="flex flex-col items-end min-w-[70px] sm:min-w-[85px] shrink-0">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider hidden sm:block">Subtotal</span>
                <span className="font-mono text-sm text-emerald-400 font-bold tracking-tight">
                    {formatCurrency(totalPrice)}
                </span>
            </div>
        </div>
    )
}



const CheckoutOrderItemsCard = ({ items = [] }) => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    const navigate = useNavigate();

    return (
        <div className="w-full flex flex-col gap-3 p-3">

            {/* Section Header */}
            <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="uppercase text-xs font-mono font-bold tracking-wider text-neutral-400">
                        Your Order
                    </h2>
                    <span className="text-[10px] font-mono text-neutral-600 bg-neutral-900 border border-neutral-800 rounded-full px-2 py-0.5">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                </div>
                <button
                    type="button"
                    onClick={()=>{navigate("/cart")}}
                    className="text-xs font-mono text-neutral-500 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                    Edit Cart
                </button>
            </div>

            {/* Read-only notice */}
            <p className="text-[11px] text-neutral-600 px-1 -mt-1">
                Locked in for this order — go back to your cart to make changes.
            </p>

            {/* Item List */}
            <div className="flex flex-col gap-2.5 max-h-[420px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent ">
                {items.map((item) => (
                    <CheckoutItemRow
                        key={item._id}
                        name={item.product?.name}
                        price={item.product?.price}
                        quantity={item.quantity}
                        image={item.product?.images[0].url}
                    />
                ))}
            </div>

        </div>
    )
}

export default CheckoutOrderItemsCard