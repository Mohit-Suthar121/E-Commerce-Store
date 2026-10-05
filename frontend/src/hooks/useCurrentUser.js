import { useQuery } from "@tanstack/react-query"
import { API } from "../api/axiosInstance"



const fetchUser = async () => {
    const response = await API.get("/v1/user/me");
    return response.data;
}

export const useUser = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        retry: false,
    })
    return {
        user:data?.user,
        isLoading
    }

}