import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import HomeHamburgerContent from '../components/HomeHamburgerContent'
import frontPageImage from '../icons/bannerPageMobile.jpg'
import { useAuthStore } from '../store/auth.store'

const Home = () => {
  const user = useAuthStore((state)=>state.user);
  const setUser = useAuthStore((state)=>state.setUser);
  const setEmail = useAuthStore((state)=>state.setEmail);



  const [bottomCard, setBottomCard] = useState([
    {
      image: <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor"><path d="M155-195q-35-35-35-85H40v-440q0-33 23.5-56.5T120-800h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35q-50 0-85-35Zm113.5-56.5Q280-263 280-280t-11.5-28.5Q257-320 240-320t-28.5 11.5Q200-297 200-280t11.5 28.5Q223-240 240-240t28.5-11.5ZM120-360h32q17-18 39-29t49-11q27 0 49 11t39 29h272v-360H120v360Zm628.5 108.5Q760-263 760-280t-11.5-28.5Q737-320 720-320t-28.5 11.5Q680-297 680-280t11.5 28.5Q703-240 720-240t28.5-11.5ZM680-440h170l-90-120h-80v120ZM360-540Z" /></svg>,
      heading: "Free Shipping",
      subText: "On orders over ₹4000"
    },
    {
      image: <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor"><path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" /></svg>,
      heading: "Secure Payment",
      subText: "Protected transactions" 
    },
    {
      image: <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 -960 960 960" fill="currentColor"><path d="M360-120H200q-33 0-56.5-23.5T120-200v-280q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-840q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-480v280q0 33-23.5 56.5T760-120H600v-320h160v-40q0-117-81.5-198.5T480-760q-117 0-198.5 81.5T200-480v40h160v320Zm-80-240h-80v160h80v-160Zm400 0v160h80v-160h-80Zm-400 0h-80 80Zm400 0h80-80Z" /></svg>,
      heading: "24/7 Support",
      subText: "Dedicated help desk"
    }
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#060606] text-neutral-200 font-sans antialiased select-none ">
      <Navbar />
      <div className="w-full overflow-hidden shrink-0">
        <div className="relative w-full h-[70vh] md:h-[80vh] flex items-center px-6 sm:px-12 md:px-20 border-b border-neutral-900 bg-linear-to-b from-[#0a0a0a] to-[#060606]">

          <div className="absolute inset-0 z-0 overflow-hidden opacity-25 pointer-events-none mix-blend-luminosity">
            <img
              src={frontPageImage}
              alt="Hero Background"
              className="w-full h-full object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#060606] via-transparent to-[#060606]" />
          </div>

          <div className="relative z-10 max-w-3xl flex flex-col gap-4 sm:gap-6 items-start ">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-neutral-500">
              <span>[ Collection // 2026 ]</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter text-neutral-100 leading-[0.95]">
              PREMIUM TECH <br />
              <span className="text-neutral-500">WITHOUT PREMIUM PRICES.</span>
            </h1>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed font-medium tracking-tight">
              Engineered garments and modular hardware built to outlast cyclic trends. Limited distributions, permanent construction frameworks.
            </p>
            <button className="h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-wider bg-white hover:bg-neutral-200 text-black shadow-lg transition-all duration-150 cursor-pointer active:scale-[0.98] border">
              Shop Now
            </button>
          </div>

        </div>
      </div>

      <div className=" w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 py-10 md:py-14 cursor-pointer ">
        {bottomCard.map((item, index) => (
          <div
            key={index}
            className="bottom-card w-full flex items-center gap-4 p-5 rounded-2xl border border-neutral-900 bg-[#0b0b0b]/40 backdrop-blur-sm hover:border-neutral-800 hover:bg-[#0b0b0b]/80 transition-all duration-300 group"
          >
            <div className="logo w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex justify-center items-center p-2.5 text-neutral-400 group-hover:text-neutral-100 group-hover:border-neutral-700 transition-colors shrink-0 shadow-inner">
              {item.image}
            </div>

            <div className="texts flex flex-col justify-center">
              <h3 className="heading text-neutral-200 font-bold text-sm tracking-tight group-hover:text-white transition-colors">
                {item.heading}
              </h3>
              <p className="other-text text-xs text-neutral-500 font-medium mt-0.5 tracking-wide">
                {item.subText}
              </p>
            </div>
          </div>
        ))}

      </div>


    </div>
  )
}

export default Home