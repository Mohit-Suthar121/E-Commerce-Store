import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm';

import { notifyFailure, notifySuccess } from '../utils/Toastify';
import { API } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
const AddProductPage = () => {

  const [isEditing,setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

            const response = await API.post("/v1/admin/product/add-product", formData);
            console.log("The response is: ", response.data);
            notifySuccess("product added successfully!");
        } catch (error) {
            console.error("Some error occured!", error?.response ? error?.response?.data : error.message);
            notifyFailure("some error occured adding product")
        } finally {
            setIsLoading(false);
            navigate("/dashboard/products");
            
        }
    }

    const handleAiSubmit = async(data)=>{
      try {
        setIsLoading(true);
        console.log("the product to be send to the backend: ",data)
        const response = await API.post("/v1/admin/ai/generate-product",data);
        console.log("the response from the ai is: ",response.data)
        notifySuccess("product generated successfully!");
        navigate("/products")
      } catch (error) {
        console.error("couldn't generate using ai: ",error?.response?.data?.message)
        notifyFailure(error?.response?.data?.message || "some error occured!")
      }finally{
        setIsLoading(false);
      }
    }
  

  return (
    <ProductForm isLoading={isLoading} onSubmit={onSubmit} handleAiSubmit={handleAiSubmit}/>
    
  )
}

export default AddProductPage