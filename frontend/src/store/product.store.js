import { create } from "zustand";


export const useProductStore = create(
    (set)=>(
        {   
            currentProducts:[],
            totalPages:1,
            setCurrentProducts:(products)=>set({currentProducts:products}),
            setTotalPages:(pages)=>set({totalPages:pages})
        }
    )
)