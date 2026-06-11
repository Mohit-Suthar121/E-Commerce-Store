import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CartLogo from '../icons/CartLogo'
import HamburgerIcon from '../icons/HamburgerIcon'
import CloseIcon from '../icons/CloseIcon'
import HomeHamburgerContent from './HomeHamburgerContent'
import DashboardHamburgerContent from './DashboardHamburgerContent'
import fullLogo from '../assets/FullLogo.jpg'

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();

    return (
        <div className="w-full h-16 sm:h-20 border-b border-neutral-900 bg-[#060606]/90 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-6 flex items-center select-none font-sans antialiased shrink-0 ">

            <div className="left-right flex w-full justify-between items-center">

                <div className="logosection flex items-center gap-3 cursor-pointer">

                    <div
                        onClick={() => { setShowMenu(!showMenu) }}
                        className="hamburger md:hidden flex relative z-60 w-9 h-9 justify-center items-center rounded-lg hover:bg-neutral-900 transition-colors"
                    >
                        <HamburgerIcon currentColor="currentColor" className={`w-5 h-5 text-neutral-200 absolute transition-all duration-300 ${showMenu ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`} />


                        <CloseIcon currentColor="currentColor" className={`w-5 h-5 text-neutral-200 absolute transition-all duration-300 ${showMenu ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}`} />
                    </div>

                    <Link to={"/"} className='flex gap-2 items-center' >

                    <div className="logo md:w-9 md:h-9 w-7 h-7 shrink-0 border border-neutral-800 rounded-lg overflow-hidden">
                        <img className="w-full h-full object-cover object-center" src={fullLogo} alt="logo" />
                    </div>


                    <div className="logo-text text-neutral-100 text-base md:text-lg tracking-wider font-extrabold font-mono uppercase">
                        SHORTCART
                    </div>
                    </Link>
                </div>

                <div className="right-section flex gap-4 md:gap-6 items-center">

                    <Link to="/">
                        <div className="home capitalize font-semibold text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-150 cursor-pointer hidden md:flex">
                            home
                        </div>
                    </Link>

                    <Link to="/products">
                        <div className="products capitalize font-semibold text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-150 cursor-pointer hidden md:flex">
                            products
                        </div>
                    </Link>

                    <Link to="/dashboard">
                        <div className="dashboard capitalize font-semibold text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-150 cursor-pointer hidden md:flex">
                            Dashboard
                        </div>
                    </Link>

                    <Link to="/profile">
                        <div className="dashboard capitalize font-semibold text-sm text-neutral-400 hover:text-neutral-100 transition-colors duration-150 cursor-pointer hidden md:flex">
                            Profile
                        </div>
                    </Link>

                    <Link to={"/cart"} >
                        <div className="cart cursor-pointer flex relative w-8 h-8 justify-center items-center text-neutral-400 hover:text-neutral-100 transition-colors">

                            <div className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 border border-[#060606] flex justify-center items-center text-[9px] text-white font-black shadow-sm">
                                1
                            </div>
                            <CartLogo className="w-5 h-5 font-bold" currentColor="currentColor" />
                        </div>
                    </Link>
                    <Link to={"/login"} >
                        <button className="login h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black shadow-sm transition-all cursor-pointer active:scale-[0.98]">
                            login
                        </button>
                    </Link>
                </div>

            </div>

            <div
                onClick={() => { setShowMenu(false) }}
                className={`hamburger-section-overlay fixed inset-0 z-40 h-screen bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${showMenu ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            />

            <div className={`fixed top-0 z-50 w-full max-w-xs h-screen bg-[#0b0b0b] border-r border-neutral-900 pt-20 transition-all duration-300 shadow-2xl ${showMenu ? "left-0" : "-left-full"}`} >
                {location.pathname === "/" && <HomeHamburgerContent setShowMenu={setShowMenu} />}
                {location.pathname.startsWith("/dashboard") && <DashboardHamburgerContent setShowMenu={setShowMenu} />}
            </div>

        </div>
    )
}

export default Navbar