import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => (
            {
                email: "",
                setEmail: (email) => set({ email }),
                clearEmail: ()=> set({ email: "" })
            }
        ),
        {
            name: "auth-storage"
        }
    )
);