import React, { useEffect } from 'react'
import { Controller, useForm } from "react-hook-form"
import HeadLessComboBox from './HeadLessComboBox'

const AddEditAddressCard = ({ setAddNewAddress, isEditing = false, setIsEditingAddress, initialData,onSubmit,isLoading }) => {
    const handleCancel = () => {
        if (setAddNewAddress) setAddNewAddress(false)
        if (setIsEditingAddress) setIsEditingAddress(false)
    }

    const INDIAN_STATES = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ];

    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            state: "Delhi"
        }
    })

    useEffect(() => {
        if (initialData) {
            reset({
                firstName: initialData.name.split(" ")[0],
                lastName:initialData.name.split(" ")[1],
                email:initialData.email,
                phoneNo:initialData.phoneNo,
                street:initialData.shippingAddress.street,
                city:initialData.shippingAddress.city,
                zipCode:initialData.shippingAddress.zipCode,
                state:initialData.shippingAddress.state
            })
        }
    }, [])


    return (
        <div className="w-full max-w-xl bg-[#09090b] border border-neutral-800/80 rounded-2xl p-6 sm:p-7 flex flex-col gap-6 shadow-xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-neutral-800/60 pb-4">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <h2 className="uppercase text-xs font-mono font-bold tracking-wider text-neutral-400">
                        {isEditing ? 'Edit Shipping Address' : 'Add New Shipping Address'}
                    </h2>
                </div>
                <button
                    type="button"
                    onClick={handleCancel}
                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-mono cursor-pointer"
                >
                    ✕ Cancel
                </button>
            </div>

            {/* Form Fields */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>

                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                         <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide relative w-fit flex">

                            <div className="text flex relative">
                                First Name
                                <div className="absolute -right-2 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                            </div>
                            <div className=" relative errors flex-1 items-start flex gap-2 ml-4">
                                {errors?.firstName?.message && <div className=" text-xs text-red-400 w-fit truncate">{errors?.firstName?.message}</div>}
                            </div>

                        </label>
                        <input
                            {...register("firstName", {
                                required: "first name is required",
                                minLength: {
                                    value: 2,
                                    message: "First name must be at least 2 characters"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "First name cannot exceed 50 characters"
                                },
                                pattern: {
                                    value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                                    message: "Please enter a valid first name",
                                },
                            })}

                            type="text"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full"
                            placeholder="e.g. Ankit"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide">Last Name</label>
                        <input
                        {...register("lastName")}
                            type="text"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full"
                            placeholder="e.g. Sharma"
                        />
                    </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide relative w-fit flex">

                            <div className="text flex relative">

                                Email Address
                                <div className="absolute -right-2 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                            </div>
                            <div className=" relative errors flex-1 items-start flex gap-2 ml-4">
                                {errors?.email?.message && <div className=" text-xs text-red-400 w-fit truncate">{errors?.email?.message}</div>}
                            </div>

                        </label>
                        <input
                            {...register("email", {
                                setValueAs: (value) => value.trim(),
                                required: "Email is required",
                                maxLength: {
                                    value: 254,
                                    message: "Email is too long"
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            type="email"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full"
                            placeholder="e.g. arhenius34@gmail.com"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide relative w-fit flex">

                            <div className="text flex relative">

                                Phone Number
                                <div className="absolute -right-2 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                            </div>
                            <div className=" relative errors flex-1 items-start flex gap-2 ml-4">
                               
                                {errors?.phoneNo?.message && <div className=" text-xs text-red-400 w-fit truncate">{errors?.phoneNo?.message}</div>}
                            </div>

                        </label>
                        <input
                            {...register("phoneNo", {
                                required: "Phone number is required",
                                setValueAs: (value) => value.trim(),
                                pattern: {
                                    value: /^[6-9]\d{9}$/,
                                    message: "Enter a valid 10-digit phone number"
                                }

                            })}
                            type="tel"
                            inputMode='numeric'
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full"
                            placeholder="+91 98765 43210"
                        />
                    </div>
                </div>

                {/* Street Address */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide relative w-fit flex">

                        <div className="text flex relative">

                            Street Address
                            <div className="absolute -right-2 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                        </div>
                        <div className=" relative errors flex-1 items-start flex gap-2 ml-4">
                            
                                {errors?.street?.message && <div className=" text-xs text-red-400 w-fit truncate">{errors?.street?.message}</div>}
                        </div>

                    </label>
                    <input
                        {...register("street", {
                            required: "Street address is required",
                            setValueAs: (value) => value.trim(),
                            minLength: {
                                value: 5,
                                message: "Street address is too short"
                            },
                            maxLength: {
                                value: 100,
                                message: "Street address cannot exceed 100 characters"
                            }
                        })}
                        type="text"
                        className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full"
                        placeholder="Flat / House No., Building, Street"
                    />
                </div>

                {/* City & Zip Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide relative w-fit flex">

                            <div className="text flex relative">

                                City
                                <div className="absolute -right-2 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                            </div>
                            <div className=" relative errors flex-1 items-start flex gap-2 ml-4">
                                
                                {errors?.city?.message && <div className=" text-xs text-red-400 w-fit truncate">{errors?.city?.message}</div>}
                            </div>

                        </label>
                        <input
                            {...register("city", {
                                required: "city is required",
                                setValueAs: (value) => value.trim(),
                                minLength: {
                                    value: 2,
                                    message: "Street address is too short"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Street address cannot exceed 100 characters"
                                },
                                pattern: {
                                    value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                                    message: "Please enter a valid city name",
                                },
                            })}
                            type="text"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full"
                            placeholder="e.g. Jaipur"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide relative w-fit flex">

                            <div className="text flex relative">

                                Zip Code
                                <div className="absolute -right-2 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                            </div>
                            <div className=" relative errors flex-1 items-start flex gap-2 ml-4">
                                
                                {errors?.zipCode?.message && <div className=" text-xs text-red-400 w-fit truncate">{errors?.zipCode?.message}</div>}
                            </div>

                        </label>
                        <input

                            {...register("zipCode", {
                                required: "zipCode is required",
                                setValueAs: (value) => value.trim(),
                                pattern: {
                                    value: /^[1-9][0-9]{5}$/,
                                    message: "Enter a valid 6-digit PIN code",
                                },
                            })}
                            type="text"
                            className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 outline-none w-full font-mono"
                            placeholder="302001"
                        />
                    </div>
                </div>

                {/* State & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide">State</label>
                        <Controller
                            name='state'
                            control={control}
                            render={({ field }) => (

                                <HeadLessComboBox value={field.value} onChange={field.onChange} options={INDIAN_STATES} />
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide">Country</label>
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                value="India"
                                readOnly
                                className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-800/80 text-neutral-400 cursor-not-allowed outline-none w-full select-none"
                            />
                            <span className="absolute right-3.5 text-xs font-mono text-neutral-600 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded-md">
                                IN
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3 mt-1">
                    <button
                        type="submit"
                        className="flex-1 h-11 flex justify-center items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] cursor-pointer active:scale-[0.99]"
                    >
                        {isLoading ? <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" /> : isEditing ? "Save Changes" : 
                        <span>Add Address</span>}
                       {!isLoading && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>}
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="h-11 px-6 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800/80 text-neutral-300 font-semibold text-sm transition-all duration-200 rounded-xl flex justify-center items-center cursor-pointer active:scale-95"
                    >
                        Cancel
                    </button>
                </div>

            </form>

        </div>
    )
}

export default AddEditAddressCard