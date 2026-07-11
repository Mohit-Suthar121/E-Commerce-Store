import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
    persist(
        (set)=>(
            {
                currentProducts:[],
                totalPages:0,
                setCurrentProducts:(products)=>set({currentProducts:products}),
                setTotalPages:(pages)=>set({totalPages:pages})
            }
        ),
        {
            name:"product-store"
        }
    )
)