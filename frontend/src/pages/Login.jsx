import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='w-full min-h-screen bg-[#060606] text-neutral-200 flex justify-center items-center  px-4 font-sans select-none' >
      <div className="w-full max-w-md rounded-2xl bg-[#0b0b0b] border border-neutral-900 p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden">

        <div className="flex flex-col gap-1.5 text-center">
          <h1 className="text-xl font-bold tracking-tight text-neutral-100">
            Welcome back
          </h1>
          <p className="text-xs text-neutral-500 font-medium tracking-wide">
            Enter your credentials to access your account
          </p>
        </div>


        <div className="input-section flex flex-col gap-4 ">

          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-neutral-400 pl-0.5 tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
              placeholder="eg. ankit@gmail.com"
              required
            />
          </div>

         <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center px-0.5">
              <label className="text-xs font-medium text-neutral-400 tracking-wide">
                Password
              </label>
              <button 
                type="button"
                className="text-xs font-medium text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              className="h-11 px-4 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-white placeholder-neutral-600 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none w-full"
              placeholder="••••••••"
              required
            />
          </div>
        </div>


        <button className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-semibold transition-colors duration-200 mt-2 cursor-pointer active:scale-[0.99]">
            Login
          </button>

        <div className="flex items-center my-1">
          <div className="flex-1 h-px bg-neutral-900" />
          <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest px-3">
            Or continue with
          </span>
          <div className="flex-1 h-px bg-neutral-900" />
        </div>


        <button 
          type="button"
          className="w-full h-11 flex justify-center items-center gap-2 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-900 text-neutral-300 hover:text-white text-sm font-medium transition-all duration-200 cursor-pointer active:scale-[0.99]"
        >
          {/* Flat Inline Google Vector Icon Asset Shape */}
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </button>


        <div className="flex gap-1.5 items-center justify-center text-xs text-neutral-500 font-medium">
          <span>Don't have an account?</span>
          <Link to={"/register"}  >
          <button className="font-semibold text-neutral-300 hover:text-white hover:underline cursor-pointer transition-colors">
            Sign up
          </button>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default Login