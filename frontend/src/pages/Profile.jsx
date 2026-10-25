import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import OrdersCard from '../components/OrdersCard';
import { API } from '../api/axiosInstance';
import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useCurrentUser';

const Profile = () => {
    const [showButton, setShowButton] = useState("profile");
    const [orderCount, setOrderCount] = useState(1);
    const [showLogOutCard, setShowLogOutCard] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState("");

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response = await API.get('/auth/logout');
            console.log("Response after logging out: ", response.data);
            setShowLogOutCard(true);
            navigate('/');
        } catch (error) {
            console.error("Error while logging out: ", error.response?.data || error.message);
            notifyFailure(error.response?.data?.message);
        } finally {
            setIsLoading(false);
            setShowLogOutCard(false);
        }
    };

    const userDetails = {
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ")[1] || "",
        email: user?.email || "",
        phoneNo: user?.phoneNo || "",
        streetAddress: user?.shippingAddresses?.street || "",
        city: user?.shippingAddresses?.city || "",
        zipCode: user?.shippingAddresses?.zipCode || ""
    };

    const handleUpdateProfile = async (data) => {
        setIsLoading(true);
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (file) {
            formData.append("profilePicture", file);
        }

        try {
            const response = await API.patch('/v1/user/updateProfile', formData);
            notifySuccess(response.data.message);
        } catch (error) {
            console.log("Some error occurred while updating the profile", error?.response?.data || error.message);
            notifyFailure(error?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = (e) => {
        const inputFile = e.target.files[0];
        if (!inputFile) return;
        setFile(inputFile);
        if (imagePreviewUrl) {
            URL.revokeObjectURL(imagePreviewUrl);
        }
        const newUrl = URL.createObjectURL(inputFile);
        setImagePreviewUrl(newUrl);
    };

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        
        <div className="w-full  bg-[#060606] text-neutral-200 flex flex-col font-sans selection:bg-emerald-500/30">
            <Navbar/>

            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-10 flex flex-col gap-10 overflow-y-auto">
                {/* Segmented Navigation Tabs */}
                <div className="flex justify-center">
                    <div className="bg-neutral-900/80 p-1.5 rounded-2xl border border-neutral-800/80 flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                        <button 
                            type="button"
                            onClick={() => setShowButton("profile")} 
                            className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                                showButton === "profile" 
                                    ? "bg-neutral-800 text-white shadow-md border border-neutral-700/50" 
                                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30"
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile Details
                        </button>
                        <button 
                            type="button"
                            onClick={() => setShowButton("orders")} 
                            className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                                showButton === "orders" 
                                    ? "bg-neutral-800 text-white shadow-md border border-neutral-700/50" 
                                    : "text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/30"
                            }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Order History
                        </button>
                    </div>
                </div>

                {/* Profile View */}
                {showButton === "profile" && (
                    <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 lg:gap-12">
                        {/* Sidebar: Profile Picture & Logout */}
                        <div className="flex flex-col items-center gap-5 shrink-0 bg-[#0c0c0c] border border-neutral-800/80 p-6 rounded-2xl w-full max-w-xs shadow-xl">
                            <label htmlFor="profilePicture" className="relative group cursor-pointer">
                                <div className="w-32 h-32 rounded-full border-2 border-neutral-700/50 p-1 bg-neutral-900/60 overflow-hidden shadow-inner group-hover:border-emerald-500/50 transition-all duration-300">
                                    <img
                                        className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                                        src={imagePreviewUrl || user?.profilePic?.url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcT0QGetG2uzAvnYBjODTUeGzqZjpcfsUUQ&s"}
                                        alt="User Profile Avatar"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px]">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h0.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                            </label>

                            <input onChange={handleFileUpload} className="hidden" type="file" id="profilePicture" accept="image/*" />

                            <div className="flex flex-col items-center text-center">
                                <h3 className="text-base font-semibold text-white">{userDetails.firstName} {userDetails.lastName}</h3>
                                <p className="text-xs text-neutral-400 mt-0.5">{userDetails.email}</p>
                            </div>

                            <div className="w-full pt-2 border-t border-neutral-800/80 flex flex-col gap-2">
                                <label 
                                    htmlFor="profilePicture" 
                                    className="w-full text-xs font-medium text-center text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm"
                                >
                                    Change Avatar
                                </label>

                                <button 
                                    type="button"
                                    onClick={() => setShowLogOutCard(true)} 
                                    className="w-full text-xs font-medium text-rose-300 hover:text-rose-200 bg-rose-950/20 hover:bg-rose-900/30 border border-rose-900/30 hover:border-rose-700/50 py-2.5 rounded-xl transition-all duration-200 cursor-pointer active:scale-[0.98] shadow-sm flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>

                        {/* Main Form */}
                        <form className="w-full max-w-xl bg-[#0c0c0c] border border-neutral-800/80 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6" onSubmit={handleSubmit(handleUpdateProfile)}>
                            <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Personal Information</h2>
                                    <p className="text-xs text-neutral-400">Update your personal account details</p>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex flex-col flex-1 gap-1.5">
                                    <label className="text-xs font-medium text-neutral-300 tracking-wide flex justify-between">
                                        <span>First Name <span className="text-rose-400">*</span></span>
                                    </label>
                                    <input
                                        type="text"
                                        {...register("firstName", { required: "First name is required" })}
                                        defaultValue={userDetails.firstName}
                                        className={`h-11 px-4 rounded-xl text-sm bg-neutral-900/90 border ${errors.firstName ? "border-rose-500/80" : "border-neutral-800"} text-white placeholder-neutral-500 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 outline-none w-full`}
                                        placeholder="e.g. Ankit"
                                    />
                                    {errors.firstName && (
                                        <span className="text-[11px] font-medium text-rose-400 mt-0.5">
                                            {errors.firstName.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex flex-col flex-1 gap-1.5">
                                    <label className="text-xs font-medium text-neutral-300 tracking-wide">Last Name</label>
                                    <input
                                        type="text"
                                        {...register("lastName")}
                                        defaultValue={userDetails.lastName}
                                        className="h-11 px-4 rounded-xl text-sm bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 outline-none w-full"
                                        placeholder="e.g. Sharma"
                                    />
                                </div>
                            </div>

                            {/* READ-ONLY EMAIL SECTION */}
                            <div className="flex flex-col gap-1.5">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-medium text-neutral-300 tracking-wide">Email Address</label>
                                    <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                                        <svg className="w-3 h-3 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Verified
                                    </span>
                                </div>

                                <div className="h-11 px-4 rounded-xl text-sm bg-neutral-900/40 border border-neutral-800/80 text-neutral-300 flex items-center justify-between group select-none">
                                    <span className="truncate">{userDetails.email || "Not Logged in"}</span>
                                    <div className="flex items-center gap-1.5 bg-neutral-800/80 border border-neutral-700/50 px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-400">
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                        Read-only
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-medium text-neutral-300 tracking-wide">Phone Number</label>
                                <input
                                    type="tel"
                                    {...register("phoneNo")}
                                    defaultValue={userDetails.phoneNo}
                                    className="h-11 px-4 rounded-xl text-sm bg-neutral-900/90 border border-neutral-800 text-white placeholder-neutral-500 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-200 outline-none w-full"
                                    placeholder="Enter contact number"
                                />
                            </div>

                            <button 
                                disabled={isLoading} 
                                className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all duration-200 mt-2 cursor-pointer active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 shadow-md"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" />
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Orders View */}
                {showButton === "orders" && orderCount === 0 && (
                    <div className="w-full max-w-md p-10 items-center flex flex-col border border-neutral-800/80 bg-[#0c0c0c] justify-center mx-auto rounded-2xl text-center shadow-xl">
                        <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex justify-center items-center text-3xl shadow-inner mb-4">
                            📦
                        </div>
                        <h3 className="text-base font-semibold text-white">No Orders Found</h3>
                        <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                            Looks like you haven't placed any orders with this account yet.
                        </p>
                        <button 
                            type="button"
                            className="px-6 py-2.5 text-xs font-semibold bg-white text-black rounded-xl hover:bg-neutral-200 cursor-pointer mt-6 transition-all duration-200 active:scale-95 shadow-md"
                        >
                            Browse Products
                        </button>
                    </div>
                )}

                <div className="order-card-wrapper w-full flex justify-center">
                    {showButton === "orders" && orderCount > 0 && <OrdersCard/>}
                </div>
            </main>

            {/* Logout Modal */}
            {showLogOutCard && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/70 z-50 flex justify-center items-center p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-[#0e0e0e] border border-neutral-800 p-6 flex flex-col items-center gap-5 shadow-2xl">
                        <div className="flex justify-center items-center w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20">
                            <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>

                        <div className="text-center flex flex-col gap-1">
                            <h3 className="text-base font-semibold text-white">Log Out Confirmation</h3>
                            <p className="text-xs text-neutral-400 leading-relaxed px-2">
                                Are you sure you want to sign out? You will need to log back in to access your orders.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2.5 w-full mt-1">
                            <button 
                                disabled={isLoading} 
                                onClick={handleLogout} 
                                className="w-full py-2.5 rounded-xl text-xs font-semibold text-rose-200 bg-rose-950/40 hover:bg-rose-900/50 border border-rose-900/40 shadow-sm transition-all duration-200 cursor-pointer active:scale-[0.98] disabled:opacity-50 flex justify-center items-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-rose-200/40 border-t-rose-200 rounded-full animate-spin" />
                                ) : (
                                    "Yes, Log Out"
                                )}
                            </button>

                            <button 
                                type="button"
                                onClick={() => setShowLogOutCard(false)} 
                                className="w-full py-2.5 rounded-xl text-xs font-medium text-neutral-400 hover:text-white bg-neutral-900/50 hover:bg-neutral-800/80 border border-neutral-800 transition-all duration-200 cursor-pointer active:scale-[0.98]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default Profile;