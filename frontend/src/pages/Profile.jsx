import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import OrdersCard from '../components/OrdersCard';

const Profile = () => {
    const [showButton, setShowButton] = useState("profile");
    const [orderCount, setOrderCount] = useState(1);
    return (
        <div className="w-full min-h-screen bg-[#060606] text-neutral-200 flex flex-col font-sans selection:bg-emerald-500/30 ">
            <Navbar />

            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8">

                <div className="flex justify-center">
                    <div className="bg-neutral-900/60 p-1 rounded-xl border border-neutral-800/80 flex items-center gap-1">

                        <button onClick={() => { setShowButton("profile") }} className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${showButton === "profile" ? "bg-neutral-800 text-white shadow-md" : "text-neutral-400 hover:text-neutral-200"} `}>
                            Profile
                        </button>
                        <button onClick={() => { setShowButton("orders") }} className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer text-neutral-400 ${showButton === "orders" ? "bg-neutral-800 text-white shadow-md" : "text-neutral-400 hover:text-neutral-200"} hover:text-neutral-200`}>
                            Orders
                        </button>
                    </div>
                </div>

                {showButton == "profile" && <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 lg:gap-12 mt-4">

                    <div className="flex flex-col items-center gap-4 shrink-0">
                        <div className="relative group w-28 h-28 rounded-full border border-neutral-800 p-1 bg-neutral-900/30 overflow-hidden shadow-inner">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcT0QGetG2uzAvnYBjODTUeGzqZjpcfsUUQ&s"
                                alt="User Profile Avatar"
                            />
                        </div>
                        <button className="text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-sm">
                            Change Avatar
                        </button>
                    </div>

                    <div className="w-full max-w-xl bg-[#0b0b0b] border border-neutral-900 p-6 rounded-2xl shadow-xl flex flex-col gap-5">

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">First Name</label>
                                <input
                                    type="text"
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="eg. Ankit"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Last Name</label>
                                <input
                                    type="text"
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="eg. Sharma"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Email Address</label>
                            <input
                                type="email"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="eg. arhenius34@gmail.com"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Phone Number</label>
                            <input
                                type="tel"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter contact number"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Street Address</label>
                            <input
                                type="text"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter street address"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">City</label>
                                <input
                                    type="text"
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="Enter city"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Zip Code</label>
                                <input
                                    type="text"
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="Enter zip code"
                                />
                            </div>
                        </div>

                        <button className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-colors duration-200 mt-2 cursor-pointer active:scale-[0.99]">
                            Update Profile
                        </button>

                    </div>
                </div>}

                {showButton === "orders" && orderCount == 0 && <div className="show-orders w-full max-w-xl p-8 items-center flex flex-col border bg-[#0b0b0b] justify-center border-neutral-900 mx-auto rounded-2xl">

                    <div className="box-logo w-16 h-16 rounded-full bg-neutral-900/50 border border-neutral-800/80 flex justify-center items-center text-2xl text-neutral-500">📦</div>

                    <h2 className='font-bold text-sm uppercase text-neutral-500 tracking-widest my-2' >Your Orders</h2>
                    <div className="text-lg font-medium text-neutral-200 max-w-sm">No orders found for this user!</div>
                    <p className="text-sm text-neutral-500 mt-1 max-w-lg">Looks like you haven't placed any orders with this account yet.</p>
                    <button className="browse-products px-5 py-2.5 text-xs font-semibold bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 cursor-pointer mt-6 text-neutral-200 transition-all duration-200 active:scale-95">browse products</button>



                </div>}

                <div className="order-card-wrapper w-full flex justify-center ">

                    {showButton == "orders" && orderCount > 0 && <OrdersCard />}
                </div>







            </main>
        </div>
    )
}

export default Profile