import React from 'react'
import { useAuthStore } from '../store/auth.store'
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const VerifyRoute = () => {
    const user = useAuthStore((state)=>state.user);

  return user?.email?<Outlet/>:<Navigate to={"/login"}/>
}

export default VerifyRoute