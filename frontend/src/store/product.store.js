import { create } from "zustand";


export const useProductStore = create(
    (set)=>(
        {   
            currentProduct:{},
            setCurrentProduct:(product)=>set({currentProduct:product}),
        }
    )
)