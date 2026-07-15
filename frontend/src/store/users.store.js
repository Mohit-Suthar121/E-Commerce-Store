import { create } from "zustand";


export const useAdminUsersStore = create(
    (set)=>({
        currentUsers:[],
        setCurrentUsers:(users)=>set({currentUsers:users})
    })
)