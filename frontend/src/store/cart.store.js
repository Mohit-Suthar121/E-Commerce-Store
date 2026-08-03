import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
    persist(
        (set) => ({
            productsInCart: [],
            setProducts: (newProducts) => set({ productsInCart: newProducts }),

            // if the product already exists, increament it's count
            addProductToCart: (newProduct) => set((state) => {

                // newProduct:{
                //     product,
                //     quantity
                // }

                const existing = state.productsInCart.find((p) => p.product._id === newProduct.product._id)
                if (existing) {
                    return {
                        productsInCart: state.productsInCart.map((p) => {
                            if (p.product._id === newProduct.product._id) {
                                return { ...p, quantity: newProduct.quantity }
                            } else return p;
                        })
                    }

                }
                else return {
                    productsInCart: [...state.productsInCart, newProduct]
                }

            }),

            setQuantity: (productId, quantity) => set((state) => ({
                productsInCart: state.productsInCart.map((item) => item.product._id === productId ? { ...item, quantity } : item)

            })),

            deleteProductFromCart:(productId)=> set((state)=>({
                productsInCart:state.productsInCart.filter((item)=>item.product._id!==productId)
            })),


            currentAddress:null,
            addresses:[],
            setAddresses:(newAddresses)=>set({addresses:newAddresses})

            
        })),

    {
        name: "cart-storage"
    }

)



