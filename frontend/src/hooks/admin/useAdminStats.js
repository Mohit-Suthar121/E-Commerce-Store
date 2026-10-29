import { useQuery } from "@tanstack/react-query"
import { API } from "../../api/axiosInstance"

export const useAdminStats = ()=>{

    const getUsersCount = async()=>{
        try {
            const response = await API.get("/v1/admin/users/stats");
            return response.data.userCount;
        } catch (error) {
            console.error("some error occured!",error);
        }
    }

    const {data:userCount,isLoading} = useQuery({
        queryKey:["adminStats"],
        queryFn:getUsersCount,
        staleTime:60*1000
    })

    return {
        userCount,
        isLoading
    }

}