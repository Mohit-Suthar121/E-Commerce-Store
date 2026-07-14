import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm';

import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { API } from '../api/axiosInstance';
const AddProductPage = () => {

  const [isEditing,setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data,newImages) => {
        setIsLoading(true);
        try {
            console.log("The data is: ", data);
            const formData = new FormData();
            // console.log("the imageFiles sent are: ", newImages)
            newImages.forEach((obj) => {
                formData.append("productImages", obj.file)
            })
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("stock", data.stock);
            formData.append("productDesc", data.productDesc);
            formData.append("subCategory", data.subCategory);
            formData.append("category", data.category);
            formData.append("brandName", data.brandName);

            const response = await API.post("/v1/product/add-product", formData);
            console.log("The response is: ", response.data);
            notifySuccess("product added successfully!");
        } catch (error) {
            console.error("Some error occured!", error?.response ? error?.response?.data : error.message);
            notifyFailure("some error occured adding product")
        } finally {
            setIsLoading(false);
        }
    }
  

  return (
    <ProductForm isLoading={isLoading} onSubmit={onSubmit}/>
    
  )
}

export default AddProductPage