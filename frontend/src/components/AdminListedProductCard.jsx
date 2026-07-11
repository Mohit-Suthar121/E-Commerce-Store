import React from 'react'
import DeleteIcon from '../icons/DeleteIcon'
import EditIcon from '../icons/EditIcon'

const AdminListedProductCard = ({ product, onEdit, onDelete }) => {


    const {
        name = "Unknown Product",
        price = 1000,
        stock = 88,
        category = "Others",
        subCategory = "",
        brandName = "",
        images = [],
    } = product || {};
    

    // for using the dummy data url
    // const { 
    // title:name = "Unknown Product" ,
    //     price = 1000,
    //     stock = 88,
    //     category = "Others",
    //     subCategory = "",
    //     brand: brandName = "",
    //     images = [],
    // } = product || {};

    // Get the first image URL or a sleek placeholder if empty
    const displayImage = images[0]?.url || "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&auto=format&fit=crop&q=60";
    

    // for using the dummy data url
    // const displayImage = images[0] || "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&auto=format&fit=crop&q=60"; 


    // Format price cleanly into Indian Rupees (₹)
    const formattedPrice = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);

    // Determine stock status badges colors
    const isOutOfStock = stock === 0;
    const isLowStock = stock > 0 && stock <= 5;

    return (
        <div className='w-full rounded-xl flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 px-4 bg-[#09090b] border border-neutral-800/60 hover:border-zinc-700/80 transition-all duration-300 justify-between group relative overflow-hidden shadow-2xl shadow-black/50 shrink-0'>
            
            {/* Left Side: Product Media & Identity */}
            <div className="flex gap-4 w-full sm:w-auto flex-1 min-w-0">
                
                {/* Image Container with futuristic border & glow hint */}
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-lg bg-neutral-900 border border-neutral-800/80 p-2 flex items-center justify-center shrink-0 overflow-hidden group-hover:border-zinc-600 transition-colors duration-300">
                    <img 
                        className='max-w-full max-h-full object-contain rounded-md filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300 ease-out' 
                        src={displayImage} 
                        alt={name} 
                    />
                </div>

                {/* Typography and Meta Tags */}
                <div className="flex flex-col justify-between flex-1 min-w-0 py-0.5">
                    <div className="space-y-1">
                        {brandName && (
                            <span className="text-[10px] font-mono tracking-widest text-emerald-500 uppercase font-bold">
                                {brandName}
                            </span>
                        )}
                        <h3 className="truncate font-medium text-sm md:text-base text-neutral-200 tracking-tight group-hover:text-white transition-colors duration-200">
                            {name}
                        </h3>
                    </div>

                    {/* Meta Info Badges */}
                    <div className="flex flex-wrap gap-2 items-center mt-2">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-neutral-400">
                            {category}
                        </span>
                        
                        {/* Dynamic Stock Indicator */}
                        {isOutOfStock ? (
                            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400">
                                OUT OF STOCK
                            </span>
                        ) : isLowStock ? (
                            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400">
                                ONLY {stock} LEFT
                            </span>
                        ) : (
                            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-neutral-500">
                                Stock: <span className="text-zinc-300">{stock}</span>
                            </span>
                        )}
                    </div>
                </div>

            </div>

            {/* Right Side: Financial Data & Dynamic Management Controls */}
            <div className="flex sm:flex-row flex-row-reverse sm:gap-8 gap-4 items-center justify-between sm:justify-end w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-900">
                
                {/* Price Display */}
                <div className="flex flex-col items-end justify-center">
                    <span className='hidden sm:block text-[10px] text-neutral-500 uppercase font-mono tracking-wider mb-0.5'>Unit Price</span>
                    <span className='font-mono text-base md:text-lg font-bold text-neutral-100 tracking-tight'>
                        {formattedPrice}
                    </span>
                </div>

                {/* Management Call-to-Actions */}
                <div className="flex gap-2.5">
                    <button 
                        onClick={onEdit}
                        type="button"
                        aria-label="Edit product"
                        className="flex text-neutral-400 cursor-pointer p-2.5 rounded-lg bg-[#121214] border border-neutral-800/80 justify-center items-center hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all duration-200 active:scale-95 hover:text-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                    >
                        <EditIcon currentColor="currentColor" className="w-4 h-4" />
                    </button>

                    <button 
                        onClick={onDelete}
                        type="button"
                        aria-label="Delete product"
                        className="flex text-neutral-400 cursor-pointer p-2.5 rounded-lg bg-[#121214] border border-neutral-800/80 justify-center items-center hover:border-red-500/40 hover:bg-red-500/5 transition-all duration-200 active:scale-95 hover:text-red-400 focus:outline-none focus:ring-1 focus:ring-red-500/30"
                    >
                        <DeleteIcon currentColor="currentColor" className="w-4 h-4" />
                    </button>
                </div>

            </div>

        </div>
    )
}

export default AdminListedProductCard;