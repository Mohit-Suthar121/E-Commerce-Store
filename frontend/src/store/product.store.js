import { create } from "zustand";


export const useProductStore = create(
    (set)=>(
        {   
            currentProducts:[],
            totalPages:1,
            currentProduct:{},
            setCurrentProduct:(product)=>set({currentProduct:product}),
            setCurrentProducts:(products)=>set({currentProducts:products}),
            setTotalPages:(pages)=>set({totalPages:pages})
        }
    )
)