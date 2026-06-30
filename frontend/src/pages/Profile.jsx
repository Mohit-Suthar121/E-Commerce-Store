import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import OrdersCard from '../components/OrdersCard';
import { API } from '../api/axiosInstance';
import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Profile = () => {
    const [showButton, setShowButton] = useState("profile");
    const [orderCount, setOrderCount] = useState(1);
    const [showLogOutCard, setShowLogOutCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const user = useAuthStore((state) => state.user);
    const resetData = useAuthStore((state) => state.resetData);
    const navigate = useNavigate();
    const [file,setFile] = useState(null);
    const [imagePreviewUrl,setImagePreviewUrl] = useState("");

    const [newInfo, setNewInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNo: "",
        street: "",
        city: "",
        zipCode: ""

    });

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await API.get('/auth/logout');
            console.log("Response after logging out: ", response.data);
            setShowLogOutCard(true);
            resetData();
            navigate('/')

        } catch (error) {
            console.error("Error while logging out: ", error.response?.data || error.message);
            notifyFailure(error.response?.data?.message);
        } finally {
            setIsLoading(false);
            setShowLogOutCard(false);
        }
    }

    const userDetails = {
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ")[1] || "",
        email: user?.email || "",
        phoneNo: user?.phoneNo || "",
        streetAddress: user?.shippingAddress?.street || "",
        city: user?.shippingAddress?.city || "",
        zipCode: user?.shippingAddress?.zipCode || ""
    }

    const handleUpdateProfile = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        console.log("The data is: ", data)
        Object.entries(data).forEach(([key,value])=>{
            formData.append(key,value);
        })
        if(file){

            formData.append("profilePicture",file);
        }

        try {
            const response = await API.patch('/v1/user/updateProfile', formData);

            console.log("profile updated successfully!", response.data);
            notifySuccess(response.data.message);
        } catch (error) {
            console.log("Some error occured while updating the profile", error?.response?.data || error.message);
            notifyFailure(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    }

    const handleFileUpload = (e)=>{
        const inputFile = e.target.files[0];
        if(!inputFile) return;
        setFile(inputFile);
        if(imagePreviewUrl){
            URL.revokeObjectURL(imagePreviewUrl);
        }
        const newUrl = URL.createObjectURL(inputFile);
        setImagePreviewUrl(newUrl);
    }


    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    return (
        <div className="w-full min-h-screen bg-[#060606] text-neutral-200 flex flex-col font-sans selection:bg-emerald-500/30 ">
            <Navbar />

            <main className="flex-1 w-full min-h-0 mx-auto px-4 py-8 flex flex-col gap-8 overflow-y-auto scrollbar-design">

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

                {showButton == "profile" && <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 lg:gap-12 mt-4 ">

                    <div className="flex flex-col items-center gap-4 shrink-0">
                        <div className="relative group w-28 h-28 rounded-full border border-neutral-800 p-1 bg-neutral-900/30 overflow-hidden shadow-inner">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src= { imagePreviewUrl|| user?.profilePic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcT0QGetG2uzAvnYBjODTUeGzqZjpcfsUUQ&s"}
                                alt="User Profile Avatar"
                            />
                        </div>

                        {/* <button className="text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-sm">
                            Change Avatar
                        </button> */}
                        <label htmlFor="profilePicture" className="text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-sm" >
                            Change Avatar
                        </label>
                            <input onChange={handleFileUpload} className='hidden' type="file" id="profilePicture" accept='image/'/>

                        <button onClick={() => { setShowLogOutCard(true) }} className="text-xs font-medium text-red-200 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 hover:border-red-700/50 px-4 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 shadow-sm whitespace-nowrap flex items-center gap-2 ">
                            <svg className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Log out</span>
                        </button>
                    </div>

                    {showLogOutCard && (
                        <div className="fixed inset-0 backdrop-blur-md bg-black/60 z-1000 flex justify-center items-center p-4 animate-fade-in">
                            <div className="logout-card w-full max-w-sm rounded-2xl bg-neutral-900/90 border border-neutral-800/80 p-6 flex flex-col items-center gap-5 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl">

                                <div className="exit-logo flex justify-center items-center w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.05)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" className="fill-red-400">
                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                                    </svg>
                                </div>

                                <div className="text-center flex flex-col gap-1.5">
                                    <h3 className="main-heading text-base font-semibold text-neutral-100 tracking-wide">
                                        Already leaving?
                                    </h3>
                                    <p className="text-xs text-neutral-400 leading-relaxed px-4">
                                        We'll save your progress and choices for when you return.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2 w-full mt-2">
                                    <button disabled={isLoading} onClick={handleLogout} className={`log-out w-full py-2.5 rounded-xl text-xs font-semibold text-red-200 bg-red-950/40 hover:bg-red-900/40 border border-red-900/30 hover:border-red-700/50 shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:brightness-50 ${isLoading && "flex justify-center items-center"} disabled:cursor-default disabled:hover:bg-red-950/40 disabled:hover:border-red-900/30 `}>
                                        {isLoading ? <div className="w-5 h-5 border-3 border-neutral-400 border-t-red-400 rounded-full animate-spin " /> : "Yes,Log Out"}
                                    </button>

                                    <button onClick={() => { setShowLogOutCard(false) }} className="stay-button w-full py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-800/50 border border-transparent hover:border-neutral-800 transition-all duration-200 cursor-pointer active:scale-[0.98]">
                                        Cancel
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                    <form className="w-full max-w-xl bg-[#0b0b0b] border border-neutral-900 p-6 rounded-2xl shadow-xl flex flex-col gap-5" onSubmit={handleSubmit(handleUpdateProfile)}>


                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col flex-1 gap-2 ">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide w-fit pr-2 relative flex gap-2">
                                    <div className="text-name">First Name</div>
                                    <div className="absolute right-0 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit">*</div>
                                    {errors.firstName?.message && (
                                        <span className="absolute -right-2 translate-x-full top-0 text-xs font-medium text-rose-400 tracking-wide dynamic-error whitespace-nowrap">
                                            {errors.firstName?.message}
                                        </span>
                                    )}
                                </label>
                                <input
                                    type="text"
                                    {...register("firstName", { required: "first name is required" })}
                                    defaultValue={userDetails.firstName}
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="eg. Ankit"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Last Name</label>
                                <input
                                    type="text"
                                    {...register("lastName")}
                                    defaultValue={userDetails.lastName}
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="eg. Sharma"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide w-fit pr-2 relative flex gap-2 ">
                                <div className="text-name">Email</div>
                            </label>

                            <div className="h-11 px-4 rounded-xl text-sm bg-neutral-950 text-neutral-400 placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full flex items-center ">
                                {userDetails.email}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Phone Number</label>
                            <input
                                type="tel"
                                {...register("phoneNo")}
                                defaultValue={userDetails.phoneNo}
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter contact number"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Street Address</label>
                            <input
                                defaultValue={userDetails.streetAddress}
                                {...register("street")}
                                type="text"
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                placeholder="Enter street address"
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">City</label>
                                <input
                                    {...register("city")}
                                    type="text"
                                    defaultValue={userDetails.city}
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="Enter city"
                                />
                            </div>
                            <div className="flex flex-col flex-1 gap-2">
                                <label className="text-xs font-medium text-neutral-400 pl-1 tracking-wide">Zip Code</label>
                                <input
                                    {...register("zipCode")}
                                    type="text"
                                    defaultValue={userDetails.zipCode}
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
                                    placeholder="Enter zip code"
                                />
                            </div>
                        </div>

                        <button disabled={isLoading} className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-colors duration-200 mt-2 cursor-pointer active:scale-[0.99] disabled:cursor-default disabled:brightness-50">
                            {isLoading ? <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" /> : "Update Proflie"}
                        </button>
                    </form>
                </div>}

                {showButton === "orders" && orderCount == 0 && <div className="show-orders w-full max-w-xl p-8 items-center flex flex-col border bg-[#0b0b0b] justify-center border-neutral-900 mx-auto rounded-2xl">

                    <div className="box-logo w-16 h-16 rounded-full bg-neutral-900/50 border border-neutral-800/80 flex justify-center items-center text-2xl text-neutral-500">📦</div>

                    <h2 className='font-bold text-sm uppercase text-neutral-500 tracking-widest my-2' >Your Orders</h2>
                    <div className="text-lg font-medium text-neutral-200 max-w-sm">No orders found for this user!</div>
                    <p className="text-sm text-neutral-500 mt-1 max-w-lg">Looks like you haven't placed any orders with this account yet.</p>
                    <button className="browse-products px-5 py-2.5 text-xs font-semibold bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 cursor-pointer mt-6 text-neutral-200 transition-all duration-200 active:scale-95">browse products</button>
                </div>}

                <div className="order-card-wrapper w-full flex justify-center">
                    {showButton == "orders" && orderCount > 0 && <OrdersCard />}
                </div>

            </main>
        </div>
    )
}

export default Profile