import React from 'react'
import { useUser } from '../hooks/useCurrentUser'
import FullPageLoader from './FullPageLoader';
import { Navigate } from 'react-router-dom';
import { authPath } from '../utils/authRedirect';

const ProtectedRoute = ({children,redirectTo}) => {

  const {isLoading,user} = useUser();
  if(isLoading) return <FullPageLoader/>
  if(!user) return <Navigate to={authPath('/login',{},redirectTo)} replace  />
  return children;
  
}

export default ProtectedRoute