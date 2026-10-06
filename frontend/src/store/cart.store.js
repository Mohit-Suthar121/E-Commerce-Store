import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            // the cart will only store the product Id, and product quantity;
            // the product object will look something like this: 
            // {
            //     productId:"ejfgiouerwh234",
            //     quantity:34
            // }

            guestProductsInCart: [],
            // guestSetProducts: (newProducts) => set({ guestProductsInCart: newProducts }),

            // if the product already exists, increament it's count

            guestAddProductToCart: (newProduct) => set((state) => {

                // newProduct:{
                //     productId(initially it was product instead of productId),
                //     quantity
                // }

                const existing = state.guestProductsInCart.find((p) => p.productId === newProduct.productId);

                if (existing) {
                    return {
                        guestProductsInCart: state.guestProductsInCart.map((p) => {
                            if (p.productId === newProduct.productId) {
                                return { ...p, quantity: p.quantity + newProduct.quantity }
                            } else return p;
                        })
                    }

                }
                
                else return {
                    guestProductsInCart: [...state.guestProductsInCart, newProduct]
                }

            }),

            
            GuestsetQuantity: (productId, newQuantity) => set((state) => ({
                guestProductsInCart: state.guestProductsInCart.map((item) => item.productId === productId ? { ...item, quantity:newQuantity } : item)
            })),


            GuestDeleteProductFromCart:(productId)=> set((state)=>({
                guestProductsInCart:state.guestProductsInCart.filter((item)=>item.productId!==productId)
            })),






            // this address part should not stay here, only the cart things should stay here
            currentAddress:null,
            addresses:[],
            setAddresses:(newAddresses)=>set({addresses:newAddresses}),
            updateAddress:(id,data)=>set((state)=>({
                addresses:state.addresses.map((address)=>address?._id===id?{...address,...data}:address)
            })),
            setCurrentAddress:(address)=>set({currentAddress:address})


            
        })),

    {
        name: "cart-storage"
    }

)



