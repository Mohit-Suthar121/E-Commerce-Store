import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import DownArrowIcon from '../icons/DownArrowIcon'
import ProductCard from '../components/ProductCard';
import PreviousArrow from '../icons/PreviousArrow';
import NextArrow from '../icons/NextArrow';
import { API } from '../api/axiosInstance';
import { Rings } from 'react-loader-spinner';
// import { useProductStore } from '../store/product.store';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const Products = () => {
    const getProductsPerPage = () => {
        if (window.innerWidth < 768) return 4;
        else return 8;
    }
    const [inputMinPriceValue, setInputMinPriceValue] = useState(0);
    const [minPriceValue, setMinPriceValue] = useState(0);
    const [inputMaxPriceValue, setInputMaxPriceValue] = useState(999999);
    const [maxPriceValue, setMaxPriceValue] = useState(999999)
    const [currentPage, setCurrentPage] = useState(1);
    // const [productsPerPage, setProductsPerPage] = useState(getProductsPerPage());
    const [showFilter, setShowFilter] = useState(false);
    const [category, setCategory] = useState("all");
    const [searchValue, setSearchValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [inputBrandName, setInputBrandName] = useState("");
    const [brandName, setBrandName] = useState("");
    const timerRef = useRef();
    const navigate = useNavigate();


    const {data,isLoading, error} = useQuery({
        queryKey:["products",currentPage,searchValue,category,brandName,minPriceValue,maxPriceValue],
        queryFn:getAllProducts
    })

    async function getAllProducts() {

            console.log("The category:", category)
            const response = await API.get(`/v1/product/get-all-products?limit=8&page=${currentPage}&search=${searchValue}&category=${category}&brandName=${brandName}&minPrice=${minPriceValue}&maxPrice=${maxPriceValue}`);
            console.log("The products received from the backend are: ", response.data);
            return response.data;
    }

    const handleChange = (fieldName) => (e) => {

        if (fieldName === "search") {
            console.log("I'm running right now!")
            setInputValue(e.target.value);
        } else if (fieldName === "brandName") {
            setInputBrandName(e.target.value)
        } else if (fieldName === "minPrice") {
            setInputMinPriceValue(e.target.value)
        } else if (fieldName === "maxPrice") {
            setInputMaxPriceValue(e.target.value)
        }
        const value = e.target.value.trim();
        clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            if (fieldName === "search") {
                setSearchValue(value);
            } else if (fieldName === "brandName") {
                setBrandName(e.target.value)
            } else if (fieldName === "minPrice") {
                setMinPriceValue(e.target.value)
            } else if (fieldName === "maxPrice") {
                setMaxPriceValue(e.target.value)
            }
            setCurrentPage(1);
        }, 500)

    }

    const handleResetFilters=()=>{
        setInputBrandName("");
        setBrandName("");
        setCategory("all");
        setInputMaxPriceValue(999999);
        setInputMinPriceValue(0);
        setMinPriceValue(0);
        setMaxPriceValue(999999);
        setInputValue("");
        setSearchValue("")
    }

    function handleShowProduct(id){
        navigate(`/products/${id}`)
    }



    useEffect(() => {
        getAllProducts();
        console.log("run")
    }, [currentPage, category, searchValue, brandName,minPriceValue,maxPriceValue])




    return (
        <div className='flex flex-col w-full min-h-screen'>
            <Navbar />
            <div className='main-page w-full flex flex-col md:flex-row gap-6 p-6 items-start justify-center  flex-1 '>

                <button onClick={() => { setShowFilter(prev => !prev) }} className="showfilter md:hidden w-full rounded-lg flex justify-center items-center py-3 border border-neutral-800 bg-[#0f0f0f] font-semibold active:scale-95 transition-all duration-200">{showFilter ? "Close Filters" : "Show Filters"}</button>


                <div className={`${showFilter ? "flex" : "hidden"} md:flex left-side-wrapper md:justify-center md:items-start md:h-full md:w-[38%] lg:w-1/4`}>
                    <div className={`${showFilter ? "flex flex-col" : "hidden"} md:w-full md:max-w-lg transition-all left-section rounded-2xl bg-[#0f0f0f] p-6 md:flex md:flex-col gap-6 border border-neutral-800 `}>

                        <div className="relative searchbar flex items-center gap-2 bg-neutral-900 rounded-lg">

                            <div className="absolute left-3 search-icon bg-neutral-900 h-full flex justify-center items-center rounded-lg ">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <input onChange={handleChange("search")} value={inputValue} type="text" placeholder='Search Products...' className=' rounded-xl px-10 py-2 w-full h-12 items-center outline-none border placeholder-neutral-500 border-neutral-800  focus:ring focus:ring-[#00ff4e] transition-all duration-300 bg-neutral-900' />
                        </div>

                        <div className="border-line border-neutral-800/60 border" />

                        <div className="catagories flex flex-col gap-4">
                            <h1 className='text-xs font-semibold uppercase text-neutral-400 tracking-wider'>Category</h1>

                            <div className="catagory-list flex flex-col ">
                                {["all",
                                    "Electronics",
                                    "Fashion",
                                    "Home & Kitchen",
                                    "Beauty & Personal Care",
                                    "Books",
                                    "Sports & Fitness",
                                    "Toys & Games",
                                    "Grocery",
                                    "Health",
                                    "Automotive",
                                    "Jewelry",
                                    "Pet Supplies",
                                    "Office Supplies",
                                    "Footwear",
                                    "Accessories",
                                    "Others"
                                ].map((item) => (
                                    <label key={item} className='capitalize text-neutral-300 gap-2 px-3 py-2.5 rounded-xl hover:bg-neutral-900/60 active:bg-neutral-900/60 flex items-center cursor-pointer '>
                                        <input onChange={() => { setCategory(item) }} checked={category === item} className='cursor-pointer bg-neutral-900 border-neutral-700 outline-none accent-emerald-500 focus:ring-0 w-4 h-4 ' type="radio" name="catagory" value={item} />
                                        {item}
                                    </label>
                                ))}

                            </div>
                        </div>

                        <div className="border-line border-neutral-800/60 border" />

                        <div className="brand flex flex-col gap-3">
                            <h1 className='text-xs font-semibold tracking-wider text-neutral-400 uppercase'>Brand</h1>
                            <div className="dropdown-menu relative">
                                <div className="down-arrow-key absolute right-2  w-6 h-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <DownArrowIcon currentColor={"#D4D4D4"} className={"w-6 h-6"} />
                                </div>

                                <div className="relative searchbar flex items-center gap-2 bg-neutral-900 rounded-lg">

                                    <div className="absolute left-3 search-icon bg-neutral-900 h-full flex justify-center items-center rounded-lg ">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </div>
                                    <input value={inputBrandName} onChange={handleChange("brandName")} type="text" placeholder='Search Brand...' className=' rounded-xl px-10 py-2 w-full h-12 items-center outline-none border placeholder-neutral-500 border-neutral-800  focus:ring focus:ring-[#00ff4e] transition-all duration-300 bg-neutral-900' />
                                </div>
                            </div>
                        </div>


                        <div className="border-line border-neutral-800/60 border" />

                        <div className="price-range flex flex-col gap-2 w-full">
                            <div className="show-price flex gap-2 items-center">
                                <div className="left-price relative">
                                    <input type="text" onChange={handleChange("minPrice")} value={inputMinPriceValue} className='min-range w-28 h-10 pl-8 text-sm py-4 bg-neutral-900 border-neutral-800 rounded-lg  border focus:border-emerald-400  outline-none transition-all duration-300' />
                                    <div className="ruppee-symbol absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">₹</div>
                                </div>

                                <div className='border border-neutral-400 w-4 h-0' />
                                <div className="right-price relative">
                                    <input type="text" onChange={handleChange("maxPrice")} value={inputMaxPriceValue} className='max-range w-28 h-10 pl-8  py-4 text-sm  bg-neutral-900 border-neutral-800 rounded-lg border focus:border-emerald-400  outline-none transition-all duration-300' />
                                    <div className="ruppee-symbol absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs">₹</div>
                                </div>

                            </div>

                            <div className="ranges flex flex-col gap-2 pt-2">
                                <input className='accent-emerald-500 bg-neutral-800 appearance-none rounded-2xl h-2' value={inputMinPriceValue} type="range" max={999999} min={0} name="" id="" onChange={handleChange("minPrice")} />
                                <input className='accent-emerald-500 bg-neutral-800 appearance-none rounded-2xl h-2' value={inputMaxPriceValue} type="range" max={999999} min={0} name="" id="" onChange={handleChange("maxPrice")} />
                            </div>
                        </div>

                        <div className="border-line border-neutral-800/60 border" />

                        <button onClick={handleResetFilters} className="reset-filters py-2.5 capitalize text-sm font-semibold flex justify-center items-center bg-neutral-900 border border-neutral-800 rounded-lg cursor-pointer active:scale-95 hover:border-emerald-500 transition-all duration-300 hover:bg-emerald-950 ">
                            reset filters
                        </button>



                    </div>
                </div>

                <div className="hidden lg:block seperator-line w-0 h-1/2 top-1/2 -translate-y-1/2 relative border border-neutral-800" />



                {!isLoading && <div className="right-section flex-1 flex flex-col gap-4 justify-start w-full lg:w-fit ">

                    <div className={`cards flex flex-col items-center md:grid md:place-items-center md:grid-cols-2 md:gap-2 md:items-center md:justify-center lg:grid lg:grid-cols-3 2xl:grid-cols-4 gap-4 `}>

                        {data?.products?.map((product) => <ProductCard stock={product?.stock} name={product?.name} price={product?.price} brandName={product?.brandName} category={product?.category} productDesc={product?.productDesc} image={product?.images[0]?.url} key={product._id} onClick={()=>{handleShowProduct(product?._id)}}/>)}

                    </div>



                    <div className="border-line border-neutral-800/60 border w-3/4 self-center" />

                    <div className="previous-and-next-section flex items-center justify-center gap-4">
                        <button onClick={() => { setCurrentPage(currentPage => currentPage - 1) }} disabled={currentPage == 1} className="previous-button px-4 py-2 text-sm capitalize font-semibold bg-neutral-900 border-neutral-800 rounded-lg cursor-pointer active:scale-95 border hover:brightness-110 hover:border-gray-500 transition-colors duration-300 disabled:brightness-50 disabled:hover:border-neutral-800">
                            <PreviousArrow currentColor={"white"} className={"w-4 h-4"} />
                        </button>

                        <div className='font-semibold' >Page {currentPage} of {data?.totalPages} </div>

                        <button onClick={() => { setCurrentPage(currentPage => currentPage + 1) }} disabled={currentPage == data?.totalPages} className="next-button px-4 py-2 text-sm capitalize font-semibold bg-neutral-900 border-neutral-800 rounded-lg cursor-pointer active:scale-95 border hover:brightness-110 hover:border-gray-500 transition-all duration-300 disabled:brightness-50 disabled:hover:border-neutral-800 ">
                            <NextArrow currentColor={"white"} className={"w-4 h-4"} />
                        </button>
                    </div>

                </div>}


                {isLoading && <div className="loader-div flex-1 h-full flex justify-center items-center">

                    <Rings
                        visible={true}
                        height="80"
                        width="80"
                        color="#ffffff"
                        ariaLabel="rings-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>}


                <div className="hidden lg:block seperator-line w-0 h-1/2 top-1/2 -translate-y-1/2 relative border border-neutral-800" />


            </div>
        </div>
    )
}

export default Products