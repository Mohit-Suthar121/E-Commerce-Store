import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../hooks/useCurrentUser'

const AuthRoute = () => {
  const {user} = useUser();
  return user?<Navigate to={'/'} replace />:<Outlet/>
}

export default AuthRoute