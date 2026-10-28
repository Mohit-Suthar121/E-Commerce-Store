import { useQuery } from "@tanstack/react-query";
import { API } from "../../api/axiosInstance";

export const useAdminUsers = ({ currentPage, searchValue }) => {

    async function fetchUsers({ currentPage, searchValue }) {
        try {
            const response = await API.get(`/v1/admin/users/get-all-users?limit=12&page=${currentPage}&search=${searchValue}`);
            return response.data;
        } catch (error) {
            console.log("Some error occured!",error);
        }
    }


    const { data, isLoading: isFetchingUsers } = useQuery({
        queryKey: ["users", {currentPage, searchValue}],
        queryFn: () => fetchUsers({ currentPage, searchValue }),
        retry: false
    })


    return {
        currentUsers: data?.users,
        totalPages:data?.totalPages,
        isFetchingUsers
    }
}