

import { useQuery } from '@tanstack/react-query';
import { API } from '../api/axiosInstance';
import { useUser } from './useCurrentUser';
import { useCartStore } from '../store/cart.store';
import { useMemo } from 'react';

export const useCart = () => {

    const { user } = useUser();

    const guestProductsInCart = useCartStore((state) => state.guestProductsInCart);
    const ids = guestProductsInCart.map((p) => p.productId);
    const fetchCart = async () => {
        const response = await API.get("/v1/cart/get-cart");
        console.log("the cart is: ", response.data.cart);

        return response.data.cart.items; // [{ product, quantity }]
    }


    const { data: serverCartItems, isLoading: isServerItemsLoading } = useQuery({
        queryKey: ["serverCart"],
        queryFn: fetchCart,
        enabled: !!user,
        retry: false
    })


    const fetchProducts = async () => {
        const data = {
            productIds: ids
        }
        const response = await API.post("/v1/product/get-products-by-ids", data);
        console.log("the response has been received successfully: ", response.data);
        return response.data.products;
    }



    const { data: rawGuestCartItems, isLoading: isGuestItemsLoading } = useQuery({
        queryKey: ["guestCart", ids],
        queryFn: fetchProducts,
        enabled: !user && ids.length > 0
    })

    const guestCartItems = useMemo(() => {
        if(!rawGuestCartItems) return [];
        const byId = new Map(rawGuestCartItems.map((p)=>[p._id,p]));
        
        return guestProductsInCart.filter((p)=>byId.has(p.productId)).map((p)=>({product:byId.get(p.productId),quantity:p.quantity}))

    }, [rawGuestCartItems, guestProductsInCart])


    const items = user?(serverCartItems??[]):guestCartItems;
    const isLoading = user?isServerItemsLoading:isGuestItemsLoading;
    return {
        items,
        isLoading
    }
}




