import React from 'react'

const OrderedProductCard = () => {
    return (
        <div className='w-full max-w-2xl rounded-lg flex gap-4 items-center group cursor-pointer' >

            <div className="image w-20 h-20 rounded-lg  shrink-0 group-hover:scale-105 transition-all duration-300 cursor-pointer">
                <img className='w-full rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FyhKFiRoCdmrxbS5CDkACBhuak_CQjnhKg&s" alt="" />
            </div>

            <div className="desc-and-id flex flex-col gap-2">
                <div className="product-info text-sm font-medium text-neutral-200 group-hover:text-white transition-colors duration-300 line-clamp-2 select-none">
                    Apple iPhone 14 | 128GB Storage | Super Retina XDR Display | Advanced Dual Camera System | A15 Bionic Chip | All-Day Battery Life | iOS Smartphone
                </div>

                <div className="product-id max-w-sm truncate  text-neutral-500 flex gap-2 items-center ">
                    <span className='font-semibold font-sans text-[10px] text-neutral-600' >SKU: </span>
                    <span className='text-xs truncate max-w-30 font-mono0' >kodfsgoihraogkasdjfuweh3298dsafa</span>
                    
                </div>
            </div>

            <div className="quantity-and-unitprice flex flex-col gap-1 justify-center items-center">
                <span className='font-semibold text-white whitespace-nowrap' >₹ 76,878 </span>
                <div className="quantity flex gap-1 text-xs font-semibold text-neutral-500">
                    <span>QTY:</span>
                    <span>2</span>
                </div>
            </div>
        </div>
    )
}

export default OrderedProductCard