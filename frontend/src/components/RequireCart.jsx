import React from 'react'
import FullPageLoader from './FullPageLoader';
import { useCart } from '../hooks/useCart';
import { Navigate } from 'react-router-dom';

const RequireCart = ({children}) => {
    const {items,isLoading} = useCart();
    if(isLoading) return <FullPageLoader/>;
    if(items.length==0) return <Navigate to={'/cart'} replace />
    return children
}

export default RequireCart