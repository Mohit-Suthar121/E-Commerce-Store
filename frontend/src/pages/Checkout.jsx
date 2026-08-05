import React, { useEffect, useState } from 'react'
import OrderSummaryCard from '../components/OrderSummaryCard'
import AddressCard from '../components/AddressCard'
import { API } from '../api/axiosInstance'
import { notifyFailure, notifySuccess } from '../utils/Toastify'
import { useCartStore } from '../store/cart.store'
import AddressForm from '../components/AddressForm'
import FinalSelectedAddressCard from '../components/FinalSelectedAddressCard'
import CheckoutOrderItemsCard from '../components/CheckoutOrderItemsCard'
import { useAuthStore } from '../store/auth.store'

const CheckoutPage = () => {
    const [addNewAddress, setAddNewAddress] = useState(false)
    const [isEditingAddress, setIsEditingAddress] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [finalSelectedAddress, setFinalSelectedAddress] = useState(null);
    const setAddresses = useCartStore((state) => state.setAddresses);
    const addresses = useCartStore((state) => state.addresses);
    const updateAddress = useCartStore((state) => state.updateAddress);
    const deleteAddress = useCartStore((state) => state.deleteAddress);
    const productsInCart = useCartStore((state) => state.productsInCart);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const user = useAuthStore((state) => state.user);

    console.log("the products is cart", productsInCart)

    useEffect(() => {
        const initialSelectedAddress = addresses.find((add) => add?.isDefault)
        console.log("the initial selected product is: ", initialSelectedAddress)
        console.log("all the addresses are: ", addresses)
        if (initialSelectedAddress) {
            setSelectedAddress(initialSelectedAddress._id);
        }
    }, [addresses])


    const fetchAddresses = async () => {
        try {
            const response = await API.get("/v1/user/addresses/get-all-addresses");
            console.log("the received addresses are", response.data.addresses);
            setAddresses(response.data.addresses);
        } catch (error) {
            console.error("error fetching the addresses", error?.response?.data || error);
        }
    }

    const handleAddNewAddress = async (data) => {
        try {
            setIsLoading(true);
            const newData = {
                name: data.firstName + " " + data.lastName,
                email: data.email,
                phoneNo: data.phoneNo,
                street: data.street,
                city: data.city,
                zipCode: data.zipCode,
                state: data.state
            }
            const response = await API.post("/v1/user/addresses/add-address", newData);
            console.log("address added successfully!", response.data);
            setAddNewAddress(false)
            setAddresses(response.data.addresses)
            notifySuccess("address added successfully")
        } catch (error) {
            console.error("couldn't add address!", error?.response?.data || error);
            notifyFailure(error?.response?.data)
        } finally {
            setIsLoading(false);
        }
    }

    const getInitialData = (id) => {
        const data = addresses.find((address) => address?._id === id);
        if (data) {
            return data
        }
        else return null
    }

    const handleDeleteAddress = async (id) => {
        try {
            const repsonse = await API.delete(`/v1/user/addresses/delete-address/${id}`);
            deleteAddress(id);
            notifySuccess("address deleted successfully!");
            console.log("the deletable address's id is: ", id)
            console.log("the left address in the cart are: ", addresses);
        } catch (error) {
            console.error("couldn't delete address", error?.response?.data || error);
            notifyFailure(error?.response?.data || error)
        }
    }

    const getFinalAddress = (id) => {
        const selectedAddress = addresses.find((address) => address?._id === id);
        return selectedAddress ? selectedAddress : null;
    }

    useEffect(() => {
        fetchAddresses()
    }, [])

    const handleEditAddress = async (data, addressId) => {
        try {
            setIsLoading(true)
            const payload = { ...data, name: data.firstName + " " + data.lastName };
            delete payload.firstName;
            delete payload.lastName;
            const response = await API.patch(`/v1/user/addresses/edit-address/${addressId}`, payload);
            updateAddress(addressId, payload);
            console.log("the address updated successfully!")
            notifySuccess("address updated successfully!")
        } catch (error) {
            console.error("counldn't update the address", error?.response?.data || error);
            notifyFailure(error?.response?.data || error)
        } finally {
            setIsLoading(false);
            setIsEditingAddress(null)
        }
    }


    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        })

    }

    const handlePayNow = async (amount) => {
        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            notifyFailure("Razorpay SDK failed to load. Check your connection");
            return
        }

        try {
            const response = await API.post("/v1/payment/create-order", { amount });
            const order = response.data.order;

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "SHORTCART",
                description: 'Test Transaction',
                handler: async (response) => {
                    try {
                        const verity = await API.post("/v1/payment/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        })
                        if (verity.data.success) {
                            notifySuccess("Payment Successfull")
                        }

                    } catch (error) {
                        notifyFailure("Payment failed!")
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.phoneNo,
                },
                theme: {
                    color: '#10b981', // Emerald green theme accent
                },

            }

            const razorpayWindow = new window.Razorpay(options);
            razorpayWindow.open();

        } catch (error) {
            console.error('Payment Error:', error);
            notifyFailure('Could not initiate payment');
        }

    }

    return (
        <div className="w-full min-h-screen bg-black text-neutral-200 flex justify-center items-start p-6 sm:p-10 lg:p-12">

            {/* Main Checkout Grid Container */}
            <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                {/* Left Column: Address Management Section */}
                <div className="lg:col-span-7 flex flex-col gap-6">

                    {!addNewAddress && !isEditingAddress && !finalSelectedAddress ? (

                        <div className="select-or-change-address flex flex-col gap-4 mb-5 ">

                            {/* Section Header */}
                            <div className="flex items-center justify-between px-1">
                                <div className="flex items-center gap-2.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <h2 className="uppercase text-xs font-mono font-bold tracking-wider text-neutral-400">
                                        Select Shipping Address
                                    </h2>
                                </div>
                                <span className="text-xs text-neutral-500 font-mono">
                                    Step 1 of 2
                                </span>
                            </div>

                            {/* Saved Addresses Scroll List */}
                            <div className="address-div flex flex-col gap-3.5 w-full max-h-[520px] overflow-y-auto p-1.5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent p-5">
                                {addresses.map((address) => <AddressCard
                                    key={address?._id}
                                    id={address?._id}
                                    setSelectedAddress={setSelectedAddress}
                                    isSelected={selectedAddress === address?._id}
                                    setIsEditingAddress={setIsEditingAddress}
                                    fullName={address?.name}
                                    city={address?.city}
                                    email={address?.email}
                                    phone={address?.phoneNo}
                                    state={address?.state}
                                    street={address?.street}
                                    zipcode={address?.zipCode}
                                    onDelete={handleDeleteAddress}
                                />)}

                            </div>

                            {/* Action Buttons */}
                            <div className="buttons flex flex-col gap-3 pt-2">
                                {/* Add New Address - Dashed Glass Style */}
                                <button
                                    type="button"
                                    onClick={() => setAddNewAddress(true)}
                                    className="add-new-address w-full font-medium bg-neutral-950/60 border border-dashed border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900/60 text-neutral-400 hover:text-emerald-400 transition-all duration-200 rounded-2xl py-3.5 px-4 flex justify-center items-center gap-2 text-sm cursor-pointer active:scale-[0.99] group"
                                >
                                    <span className="text-lg leading-none transition-transform group-hover:rotate-90">+</span>
                                    <span>Add New Address</span>
                                </button>

                                {/* Deliver to Selected Address CTA */}
                                <button
                                    onClick={() => { setFinalSelectedAddress(getFinalAddress(selectedAddress)) }}
                                    type="button"
                                    className="deliver-here font-semibold bg-emerald-500 hover:bg-emerald-400 text-black rounded-2xl py-3.5 px-4 flex justify-center items-center gap-2 text-sm cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-[0.99] transition-all duration-200 mt-1"
                                >
                                    <span>Deliver to Selected Address</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                            </div>

                        </div>


                    ) : !addNewAddress && !isEditingAddress && finalSelectedAddress ? (
                        <div className='flex flex-col gap-4' >

                            <FinalSelectedAddressCard address={finalSelectedAddress} onChange={() => { setFinalSelectedAddress(null) }} />
                            <CheckoutOrderItemsCard items={productsInCart} />
                        </div>


                    ) : addNewAddress ? (
                        /* Form View (Add or Edit) */
                        <div className="w-full">
                            <AddressForm
                                initialData={null}
                                isEditing={false}
                                isLoading={isLoading}
                                onSubmit={handleAddNewAddress}
                                setAddNewAddress={setAddNewAddress}

                            />
                        </div>
                    ) : (<div className="w-full">
                        <AddressForm
                            initialData={getInitialData(isEditingAddress)}
                            isLoading={isLoading}
                            onSubmit={(data) => handleEditAddress(data, isEditingAddress)}
                            isEditing={true}
                            setIsEditingAddress={setIsEditingAddress}
                        />
                    </div>)

                    }

                </div>

                {/* Right Column: Order Summary Card Sticky Anchor */}
                <div className="lg:col-span-5 w-full flex justify-center lg:justify-end lg:sticky lg:top-10">
                    <OrderSummaryCard isDisabledButton={finalSelectedAddress ? false : true} isCartButton={false} handlePayNow={handlePayNow} />
                </div>

            </div>

        </div>
    )
}

export default CheckoutPage