import React, { useEffect, useState } from 'react'
import ProductForm from '../components/ProductForm'
import { API } from '../api/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyFailure, notifySuccess } from '../utils/Toastify';

const EditProductPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [product,setProduct] = useState({});
    const {id} = useParams();
    const navigate = useNavigate();

    async function fetchProduct(){
        try {
            setIsLoading(true)
            const response = await API.get(`/v1/product/get-product/${id}`)
            console.log("The fetched product is:",response.data.product);
            setProduct(response.data.product);
        } catch (error) {
            console.error("some error occured while fetching the product:",error.response?.mesage || error)
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchProduct()
    },[])

    

    const onSubmit = async (data,newImages,existingImages) => {
        setIsLoading(true);
        try {
            console.log("The data is: ", data);
            const formData = new FormData();
            newImages.forEach((obj) => {
                formData.append("productImages", obj.file)
            })
            formData.append("existingImages",JSON.stringify(existingImages));
            formData.append("name", data.name);
            formData.append("price", data.price);
            formData.append("stock", data.stock);
            formData.append("productDesc", data.productDesc);
            formData.append("subCategory", data.subCategory);
            formData.append("category", data.category);
            formData.append("brandName", data.brandName);
            const response = await API.patch(`/v1/product/edit-product/${id}`, formData);
            console.log("The response is: ", response.data);
            notifySuccess("product Edited successfully!");
            navigate("/dashboard/products")
            
        } catch (error) {
            console.error("Some error occured!", error?.response ? error?.response?.data : error.message);
            notifyFailure("some error occured adding product")
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <ProductForm isEditing={true} isLoading={isLoading} onSubmit={onSubmit} initialData={product}/>
    
  )
}

export default EditProductPage