import { useQuery } from "@tanstack/react-query"
import { API } from "../api/axiosInstance"

export const useProductStats = ()=>{

    const countProducts = async ()=>{
        try {
            const response = await API.get("/v1/admin/product/stats");
            return response.data.productCount;
        } catch (error) {
            console.error("some error occured!",error);
        }
    }

    const {data:productCount,isLoading} = useQuery({
        queryKey:["productCount"],
        queryFn:countProducts,
        staleTime:60*1000
    })

    return {
        productCount,
        isLoading
    }

}