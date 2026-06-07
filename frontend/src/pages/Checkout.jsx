import React, { useState } from 'react'
import AddressCard from '../components/AddressCard'
import AddNewAddressCard from '../components/AddNewAddressCard';

const Checkout = () => {

    const [address,setAddress] = useState("add1");
    const [addNewAddress,setAddNewAddress] = useState(false);

    return (
        <div className='w-full h-screen flex justify-center items-start'>
            <div className="content-wrapper flex gap-10 pt-10  h-full">

               { !addNewAddress && <div className="select-or-change-address flex flex-col gap-2 ">
                    <h2 className=" heading uppercase text-sm font-semibold text-neutral-300 translate-x-1">Saved Addresses</h2>
                    <div className="address-div flex flex-col gap-2 w-full  max-h-100 overflow-auto p-4 scrollbar-design">
                        <AddressCard id={"add1"} setAddress={setAddress} isSelected={address==="add1"} />
                        <AddressCard id={"add2"} setAddress={setAddress} isSelected={address==="add2"} />

                        <AddressCard id={"add3"} setAddress={setAddress} isSelected={address==="add3"} />
                    </div>

                    <div className="buttons flex flex-col gap-3 pt-2 p-4">
                        <button onClick={()=>{setAddNewAddress(true)}} className="add-new-address capitalize font-semibold bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 rounded-lg text-neutral-300 flex justify-center items-center py-3 cursor-pointer active:scale-95" >
                            + Add New Address
                        </button>

                        <button className="proceed-to-checkout capitalize font-semibold bg-white text-black rounded-lg flex justify-center items-center py-3 cursor-pointer hover:brightness-90 text-sm active:scale-95 transition-all duration-200 mb-10">
                            Proceed To CheckOut
                        </button>
                    </div>


                </div>}

                {addNewAddress && <AddNewAddressCard/>}

                <div className="order-summary-card bg-[#0f0f0f] border-neutral-800 rounded-2xl flex flex-1 flex-col gap-3 py-6 px-8 min-w-0 w-90 max-w-110 border h-fit">
                    <h2 className=" heading uppercase text-sm font-semibold text-gray-600">Order Summary</h2>

                    <div className="details flex flex-col gap-2">
                        <div className='subtotal flex justify-between items-center text-gray-300'>
                            <span  >
                                Subtotal &#40; 2 &#41;
                            </span>
                            <span>
                                ₹ 1,23,432
                            </span>
                        </div>

                        <div className='shipping flex justify-between items-center text-gray-300'>
                            <span>
                                Shipping
                            </span>
                            <span>
                                ₹ 0
                            </span>
                        </div>

                        <div className='tax flex justify-between items-center text-gray-300'>
                            <span>
                                Tax&#40; 5% &#41;
                            </span>
                            <span>
                                ₹ 6,199
                            </span>
                        </div>

                    </div>

                    <div className="seperator-line h-0 border w-full border-gray-600" />

                    <div className="total flex justify-between items-center font-bold">
                        <span className='text-lg text-gray-300'>Total</span>
                        <span className='text-lg text-gray-300'>₹ 1,30,188.45</span>
                    </div>

                    <div className="other-info flex flex-col gap-2 mt-6">
                        <span className='select-none text-sm text-gray-400'>• Free shipping on orders over $50</span>
                        <span className='select-none text-sm text-gray-400'>• 30-day return policy</span>
                        <span className='select-none text-sm text-gray-400'>• Secure checkout with SSL encryption</span>

                    </div>

                </div>

                

            </div>





        </div>
    )
}

export default Checkout