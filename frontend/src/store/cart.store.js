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

            productsInCart: [],
            setProducts: (newProducts) => set({ productsInCart: newProducts }),
            // setProducts:(productId,quantity) => set({productId,quantity}),
            // if the product already exists, increament it's count
            addProductToCart: (newProduct) => set((state) => {

                // newProduct:{
                //     productId(initially it was product instead of productId),
                //     quantity
                // }

                const existing = state.productsInCart.find((p) => p.productId === newProduct.productId);

                if (existing) {
                    return {
                        productsInCart: state.productsInCart.map((p) => {
                            if (p.productId === newProduct.productId) {
                                return { ...p, quantity: p.quantity + newProduct.quantity }
                            } else return p;
                        })
                    }

                }
                
                else return {
                    productsInCart: [...state.productsInCart, newProduct]
                }

            }),

            
            setQuantity: (productId, quantity) => set((state) => ({
                productsInCart: state.productsInCart.map((item) => item.productId === productId ? { ...item, quantity } : item)
            })),


            deleteProductFromCart:(productId)=> set((state)=>({
                productsInCart:state.productsInCart.filter((item)=>item.productId!==productId)
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



