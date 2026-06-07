import React from 'react'
import CartLogo from '../icons/CartLogo'

const ProductCard = () => {
    return (
        <div className='main-card  flex flex-col w-[90%] md:w-[95%] h-full border items-start gap-2 p-2 rounded-2xl bg-[#0f0f0f] border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 cursor-pointer '>

            
            <div className="product-image w-full h-45 border bg-white rounded-2xl hover:scale-z-25">
                <img className='w-full h-full object-contain' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5FyhKFiRoCdmrxbS5CDkACBhuak_CQjnhKg&s" alt="" />
            </div>

            <div className="brand-name uppercase text-sm font-semibold text-neutral-500 tracking-wider">apple</div>

            <div className="description w-full text-sm font-medium text-neutral-200 leading-snug line-clamp-2 text-ellipsis">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo odit odio corrupti ad, minima consequatur cupiditate dolorum,  illum dolorem aspernatur nobis dolores soluta?illum dolorem aspernatur nobis dolores soluta?illum dolorem aspernatur nobis dolores soluta? dolorem aspernatur nobis dolores soluta? dolorem aspernatur nobis dolores soluta?dolorem aspernatur nobis dolores soluta?</div>

            <div className="show-price font-semibold text-lg text-gray-300">₹ 20,000</div>

            <button className="add-to-cart w-full  rounded-lg flex justify-center items-center gap-2 bg-neutral-800/50 py-2.5 cursor-pointer hover:brightness-90 active:scale-95 text-sm font-medium border border-neutral-800 hover:bg-emerald-500" >
                <CartLogo className={"w-6 h-6"} currentColor={"white"} />
                <span className='' >
                    Add to Cart
                </span>
            </button>

        </div>
    )
}

export default ProductCard