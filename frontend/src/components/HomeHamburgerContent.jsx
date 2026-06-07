import React from 'react'
import { Link } from 'react-router-dom'

import HomeIcon from '../icons/HomeIcon'
import ProductsIcon from '../icons/ProductsIcon'
import ShoppingCartFilledLogo from '../icons/ShoppingCartFilledLogo'
const HomeHamburgerContent = ({setShowMenu}) => {
    return (
        <div className="hamburger-content border-t border-neutral-800 flex-1 w-full p-4 flex flex-col gap-2">

            <Link onClick={() => { setShowMenu(false) }} to="/" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <HomeIcon className={"w-6 h-6"} currentColor={"white"} />
                Home
            </Link>


            <Link onClick={() => { setShowMenu(false) }} to="/products" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <ProductsIcon className={"w-6 h-6"} currentColor={"white"} />
                Products
            </Link>


            <Link onClick={() => { setShowMenu(false) }} to="/cart" className='flex gap-2 w-full p-2 text-neutral-200 hover:text-white hover:bg-neutral-500/10 rounded-xl'>
                <ShoppingCartFilledLogo className={"w-6 h-6"} currentColor={"white"} />
                Cart
            </Link>


        </div>
    )
}

export default HomeHamburgerContent