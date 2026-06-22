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
                        console.log("The response while fetching the userData from the backend: ", response)
                        set({
                            user: response.data.user,
                            email: response.data.user.email
                        })
                    } catch (error) {
                        console.error("some error occured! :", error.response?.data || error.message)
                        set({ user: null })
                        set({ email: null })
                    }
                }

            }


        ),
        {

            name: "auth-storage",
            partialize: (state) => ({
                email: state.email
            })
        }
    )
);