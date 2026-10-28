import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../api/axiosInstance"


export const useAddresses = () => {

    const queryClient = useQueryClient();

    

    const fetchAddresses = async () => {

        const response = await API.get("/v1/user/addresses/get-all-addresses");
        return response.data.addresses;
    }

    const handleAddNewAddress = async (data) => {
        try {
            setIsLoading(true);
            const newData = {
                name: data.firstName + " " + data.lastName,
                email: data.email,
                phoneNo: data.phoneNo,
                street: data.street,
                city: data.city,
                zipCode: data.zipCode,
                state: data.state
            }
            const response = await API.post("/v1/user/addresses/add-address", newData);
            console.log("address added successfully!", response.data);
            setAddNewAddress(false)
            setAddresses(response.data.addresses)
            notifySuccess("address added successfully")
        } catch (error) {
            console.error("couldn't add address!", error?.response?.data || error);
            notifyFailure(error?.response?.data)
        } finally {
            setIsLoading(false);
        }
    }


    const handleDeleteAddress = async (id) => {
        try {
            const response = await API.delete(`/v1/user/addresses/delete-address/${id}`);
            setAddresses(response.data.addresses);
            notifySuccess("address deleted successfully!"); ``
            console.log("the deletable address's id is: ", id)
            console.log("the left address in the cart are: ", addresses);
        } catch (error) {
            console.error("couldn't delete address", error?.response?.data || error);
            notifyFailure(error?.response?.data || error)
        }
    }


    const handleEditAddress = async (data, addressId) => {
        try {
            setIsLoading(true)
            const payload = { ...data, name: data.firstName + " " + data.lastName };
            delete payload.firstName;
            delete payload.lastName;
            await API.patch(`/v1/user/addresses/edit-address/${addressId}`, payload);
            updateAddress(addressId, payload);
            console.log("the address updated successfully!")
            notifySuccess("address updated successfully!")
        } catch (error) {
            console.error("counldn't update the address", error?.response?.data || error);
            notifyFailure(error?.response?.data || error)
        } finally {
            setIsLoading(false);
            setIsEditingAddress(null)
        }
    }

    const { data: addresses, isLoading } = useQuery({
        queryKey: ["addresses"],
        queryFn: fetchAddresses,
        retry: false

    })


    const editAddressMutation = useMutation({
        mutationFn: handleEditAddress,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] })

    })

    const addAddressMutation = useMutation({
        mutationFn: handleAddNewAddress,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] })
    })

    const deleteAddressMutation = useMutation({
        mutationFn: handleDeleteAddress,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["addresses"] })
    })



    return {
        addresses,
        isLoading,
        handleEditAddress:editAddressMutation.mutate,
        handleAddNewAddress:addAddressMutation.mutate,
        handleDeleteAddress:deleteAddressMutation.mutate

    }
}
