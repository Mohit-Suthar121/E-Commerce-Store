import React from 'react'
import DeleteIcon from '../icons/DeleteIcon'

const ShoppingCartProduct = () => {
    return (
        <div className='w-full rounded-2xl flex xl:flex-row flex-col items-center gap-4 py-4 px-4 bg-[#0f0f0f] border-neutral-800/80 border cursor-pointer group hover:border-neutral-700 transition-colors duration-200 justify-between '>

            <div className="left-side-wrapper flex items-center gap-4 w-full ">

            
             <div className="product-image w-12 h-12 md:w-20 md:h-20 rounded-lg group-hover:scale-102 transition-all duration-200 ">
                <img className='w-full h-full object-contain rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FyhKFiRoCdmrxbS5CDkACBhuak_CQjnhKg&s" alt="" />
             </div>

             <div className="product-name-and-price flex flex-col flex-1 min-w-0 gap-2">
                <div className="heading w-full truncate font-semibold text-sm text-neutral-200 ">
                    Iphone 14 Pro Max 5g
                </div>
                <div className="price font-mono uppercase text-xs  text-neutral-400"> unit: ₹1,34,000</div>
             </div>

            </div>

            <div className="seperator-line flex h-px w-full border border-neutral-800 md:hidden"/>

            <div className="flex-1 flex xl:gap-4 gap-6 items-center xl:justify-end justify-center  w-full">

                <div className="product-quantity flex items-center rounded-lg border bg-neutral-950 border-neutral-800 p-1">

                    <button className="decrease-quantity w-6 h-6  md:w-8   md:h-8 flex justify-center items-center cursor-pointer hover:border-neutral-600 transition-colors duration-300 hover:bg-neutral-900 rounded-lg">-</button>
                    <div className="show-quantity flex justify-center items-center bg-neutral-950 w-10 text-sm select-none text-center">2</div>
                    <button className="increase-quantity w-6 h-6  md:w-8   md:h-8  flex justify-center items-center  cursor-pointer hover:border-neutral-600 transition-colors duration-300 hover:bg-neutral-900 rounded-lg">+</button>
                </div>
                <div className="product-total-price font-semibold flex flex-col items-center">
                    <span className='flex md:hidden text-[9px] text-neutral-600 uppercase font-semibold' >Total price</span>
                    <span className='font-mono text-sm' >₹1,34,000</span>
                    
                </div>
                <div className="remove-button flex text-neutral-500 cursor-pointer p-2 rounded-lg bg-neutral-950 border border-neutral-800 justify-center items-center hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-200 active:scale-95 hover:text-red-400">
                    <DeleteIcon currentColor={"currentColor"} className={"w-4 h-4"} />
                </div>
            </div>

        </div>
    )
}

export default ShoppingCartProduct



