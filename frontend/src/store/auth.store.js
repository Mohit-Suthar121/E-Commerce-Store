import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => (
            {
                email: "",
                setEmail: (email) => set({ email }),
                clearEmail: ()=> set({ email: "" }),


                user:null,
                setUser:(user)=>set({user}),
                clearUser:()=>set({user:null})


            }


        ),
        {
            name: "auth-storage"
        }
    )
);