import React, { useEffect, useState } from 'react'
import ImageIcon from '../icons/ImageIcon'
import PreviewImageCard from '../components/PreviewImageCard';
import HeadLessComboBox from '../components/HeadLessComboBox';
import { Controller, useForm } from 'react-hook-form';
import { API } from '../api/axiosInstance';
import { notifyFailure, notifySuccess } from '../utils/Toastify';

const AddProductPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
  const [imageFiles,setImageFiles] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: "Electronics"
    }
  })


  const onSubmit = async(data) => {
    setIsLoading(true);
    try {
      console.log("The data is: ", data);
      const formData = new FormData();
      console.log("the imageFiles sent are: ",imageFiles)
      imageFiles.forEach((file)=>{
        formData.append("productImages",file)
      })
      formData.append("name",data.name);
      formData.append("price",data.price);
      formData.append("stock",data.stockCount);
      formData.append("productDesc",data.productDesc);
      formData.append("subCategory",data.subCategory);
      formData.append("category",data.category);
      formData.append("brandName",data.brandName);

      const response = await API.post("/v1/product/add-product",formData);
      console.log("The response is: ",response.data);
      notifySuccess("product added successfully!");
    } catch (error) {
      console.error("Some error occured!",error?.response?error?.response?.data:error.message);
      notifyFailure("some error occured adding product")
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    console.log(imagePreviewUrl)
  }, [imagePreviewUrl])


  function handleRemoveImage(currentUrl) {
    const removeIndex = imagePreviewUrl.findIndex((url)=>url===currentUrl);
    console.log("The removed index is: ",removeIndex)
    setImagePreviewUrl((urls) => urls.filter((url,index) => url !== currentUrl)
    )
    setImageFiles((files)=>files.filter((file,index)=>index!=removeIndex));
  }

  const handleFileChange = (e)=>{
    if(imagePreviewUrl.length>=5) return;
    const files = e.target.files;
    let fileArray = Array.from(files);
    let totalFiles = [...imageFiles,...fileArray];
    if(totalFiles.length>5){
      totalFiles = totalFiles.slice(0,5);
    }
    setImageFiles(totalFiles);
    const urls = totalFiles.map((file)=> URL.createObjectURL(file));
    setImagePreviewUrl(urls);
  }

  useEffect(()=>{
    return ()=>{
      imagePreviewUrl.forEach((url)=>URL.revokeObjectURL(url));
    }
  },[imagePreviewUrl])

  return (
    <div className="overflow-wrapper w-full overflow-y-auto scrollbar-design">

      <div className="w-full flex-1 bg-[#060606] flex justify-center p-4 sm:p-6 lg:p-10 select-none font-sans antialiased ">

        <div className="w-full max-w-3xl bg-[#0b0b0b] border border-neutral-900 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-2xl">

          <div className="flex flex-col gap-0.5 border-b border-neutral-900 pb-4">
            <h1 className="text-lg font-bold tracking-tight text-neutral-100">
              Add New Product
            </h1>
            <p className="text-xs font-medium text-neutral-500">
              Set up your inventory specifications and asset details.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 tracking-wide w-fit relative pl-1 pr-2 ">
                Product Name
                <div className="absolute right-0 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                {errors.name && (
                  <span className="absolute -right-2 translate-x-full top-0 text-xs font-medium text-rose-400 tracking-wide dynamic-error whitespace-nowrap">
                    {errors.name?.message}
                  </span>
                )}
              </label>
              <input
                {...register("name", {
                  required: "Product Name is required!",
                  minLength: {
                    value: 3,
                    message: "Product name must be at least 3 characters"
                  },
                  maxLength: {
                    value: 100,
                    message: "Product name cannot exceed 100 characters"
                  }
                })}
                type="text"
                className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                placeholder="e.g., iPhone 14 Pro"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 tracking-wide relative pl-1 pr-2 w-fit">
                  Price (INR)

                  <div className="absolute right-0 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                  {errors.price && (
                    <span className="absolute -right-2 translate-x-full top-0 text-xs font-medium text-rose-400 tracking-wide dynamic-error whitespace-nowrap">
                      {errors.price?.message}
                    </span>
                  )}
                </label>
                
                <input
                  {...register("price", {
                    required: "price is required!"
                  })}
                  type="number"
                  className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none font-mono"
                  placeholder="₹0.00"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 tracking-wide relative pl-1 pr-2 w-fit ">
                  Stock Count
                  <div className="absolute right-0 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                  {errors.stockCount && (
                    <span className="absolute -right-2 translate-x-full top-0 text-xs font-medium text-rose-400 tracking-wide dynamic-error whitespace-nowrap">
                      {errors.stockCount?.message}
                    </span>
                  )}
                </label>
                <input
                  {...register("stockCount", {
                    required: "stockCount is required!"
                  })}
                  type="number"
                  className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                  placeholder="e.g. 20"
                />
              </div>


            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 tracking-wide relative pl-1 pr-2 w-fit flex items-center">
                  <div className="name relative w-fit pr-2">
                    Category

                    <div className="absolute right-0 top-0 text-lg text-red-400 -translate-y-1/4 translate-x-1/2 w-fit ">*</div>
                  </div>
                  {errors.category && (
                    <span className="absolute -right-2 translate-x-full top-0 text-xs font-medium text-rose-400 tracking-wide dynamic-error whitespace-nowrap">
                      {errors.category?.message}
                    </span>
                  )}
                </label>
                <Controller
                  name='category'
                  control={control}
                  render={({ field }) => {
                    return <HeadLessComboBox value={field.value} onChange={field.onChange} />
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 tracking-wide relative pl-1 pr-2 w-fit ">
                  SubCategory
                </label>
                <input
                  {...register("subCategory")}
                  type="text"
                  className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                  placeholder="e.g., Mobile"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                Brand Manufacturer
              </label>
              <input
                {...register("brandName")}
                type="text"
                className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                placeholder="e.g., Apple Inc."
              />
            </div>



            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                Product Description
              </label>
              <textarea
                {...register("productDesc")}
                rows={4}
                className="w-full p-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none resize-none leading-relaxed"
                placeholder="Provide a comprehensive breakdown of technical specifications, features, and item condition notes..."
              />
            </div>

            <div className="flex flex-col gap-2 pt-1 ">
              <div className="text-xs font-semibold text-neutral-400 tracking-wide w-fit relative">
                Product Media Files (MAX 5)
               {errors.images && <span className="absolute -right-2 translate-x-full top-0 text-xs font-medium text-rose-400 tracking-wide dynamic-error whitespace-nowrap">
                  *{errors.images?.message} 
                </span>}
              </div>

              {imagePreviewUrl.length < 5 && <label className="w-full border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer transition-colors duration-200 group">
                <ImageIcon className={"w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors"} />
                <div className="flex flex-col items-center text-center gap-0.5">
                  <span className="text-xs font-medium text-neutral-300">
                    Click to upload assets or drag and drop
                  </span>
                  <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                </div>
                <input onChange={handleFileChange} multiple className='hidden' accept="image/*" type="file" />

              </label>}



              {imagePreviewUrl.length > 0 && <div className="w-full image-preview-section flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 p-1">
                {imagePreviewUrl.map((url, index) => (
                  <PreviewImageCard onClick={() => { handleRemoveImage(url) }} key={index} imageUrl={url} />
                ))}
              </div>}

            </div>

            <button disabled={isLoading}
              type="submit"
              className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-wide shadow-md cursor-pointer transition-colors active:scale-[0.99] mt-3 disabled:brightness-50 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" /> : "Publish Product Line"}

            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default AddProductPage