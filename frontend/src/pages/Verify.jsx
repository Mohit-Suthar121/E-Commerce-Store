import React, { useEffect, useRef, useState } from 'react'
import PaymentSuccessIcon from '../icons/PaymentSuccessIcon'
import { API } from '../api/axiosInstance';
import { useAuthStore } from '../store/auth.store';
import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { useNavigate } from 'react-router-dom';


const Verify = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const inputRefs = useRef([]);
    const email = useAuthStore((state) => state.email);
    const navigate = useNavigate();


    const handleChange = (e, index) => {
        const value = e.target.value;
        if (index >= otp.length || !/^\d*$/.test(value)) return;
        const newOtp = otp.map((digit, i) => i === index ? e.target.value : digit)
        setOtp(newOtp)
        if (index <= otp.length - 2) inputRefs.current[index + 1].focus();
        if (index === otp.length - 1) onSubmit(newOtp);

    }

    const onSubmit = async (enteredOtp) => {
        const otpToSend = enteredOtp.join("");
        if (otpToSend.length < 4) return;
        if (!email) {
            console.error("Email not found!");
            return;
        }
        try {
            setIsLoading(true);

            const data = {
                email,
                otp: otpToSend
            }
            const response = await API.post('/auth/verify', data);
            console.log("The response after enter the otp is:", response.data)
            notifySuccess("User Verified SuccessFully!");
            navigate("/")
            

        } catch (error) {
            console.error("Internal server Error: ", error?.response?.data || error.message);
            notifyFailure(error.response?.data?.message);
        } finally {
            setIsLoading(false);
        }

    }

    const handleKeyDown = (e, index) => {
        console.log("the key pressed is: ", e.key)

        if (e.key === "Backspace") {
            e.preventDefault();
            if (e.target.value === "" && index > 0) {
                setOtp(prev => prev.map((_, i) => i + 1 === index ? "" : _));
                inputRefs.current[index - 1].focus();
            }
            else setOtp(prev => prev.map((_, i) => i === index ? "" : _));

        }
        else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1].focus();
        }

        else if (index < otp.length - 1 && e.key === "ArrowRight") {
            inputRefs.current[index + 1].focus();
        }
    }



    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-[#060606] p-4 font-sans antialiased select-none" >
            <div className="main-card w-full max-w-md flex flex-col gap-6 p-6 sm:p-8 bg-[#0b0b0b] border border-neutral-900 rounded-2xl shadow-2xl text-center">

                <div className="check-your-email flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/6 border border-emerald-500/15 flex items-center justify-center text-emerald-400">
                        <PaymentSuccessIcon className="w-5 h-5" currentColor="currentColor" />
                    </div>
                    <h2 className="text-xl font-bold text-neutral-100 tracking-tight">
                        Check your email
                    </h2>
                </div>

                <p className="short-text text-xs sm:text-sm font-medium text-neutral-400 leading-relaxed px-2">
                    We've sent you an OTP to verify your account. Please check your inbox and fill in the authorization code below.
                </p>

                <div className="enter-otp flex flex-col gap-6 items-center">

                    <div className="otp-section flex gap-3 items-center justify-center">
                        {otp.map((item, index) => (
                            <input
                                maxLength={1}
                                ref={(ele) => inputRefs.current[index] = ele}
                                onChange={(e) => { handleChange(e, index) }}
                                onKeyDown={(e) => { handleKeyDown(e, index) }}
                                value={otp[index]}
                                key={index}
                                type="text"

                                className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 text-center text-lg font-bold font-mono text-neutral-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-150"
                            />
                        ))}
                    </div>

                    <button onClick={() => { onSubmit(otp) }} disabled={isLoading} className="verify-button w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-wider shadow-sm transition-all duration-150 cursor-pointer active:scale-[0.98] disabled:brightness-50 disabled:flex disabled:justify-center disabled:items-center">
                        {isLoading ? <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" /> : "Verify OTP"}
                    </button>
                </div>

            </div>
           
        </div>
    )
}

export default Verify