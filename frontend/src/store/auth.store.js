import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { API } from '../api/axiosInstance';

export const useAuthStore = create(
    persist(
        (set) => (
            {
                email: null,
                setEmail: (email) => set({ email }),
                clearEmail: () => set({ email: null }),


                user: null,
                setUser: (user) => set({ user }),
                clearUser: () => set({ user: null }),

                fetchUser: async () => {
                    try {
                        const response = await API.get('/v1/user/me');
                        set({
                            user: response.data.user,
                            email: response.data.user.email
                        })
                    } catch (error) {
                        if(error.response?.status != 401) console.error("UnExpected error occured!! :", error.response?.data || error.message)
                        set({
                            user:null,
                            email:null
                        })
                    }
                },

                resetData:()=>set({email:null,user:null})

            }
        ),
        {

            name: "auth-storage",
        }
    )
);