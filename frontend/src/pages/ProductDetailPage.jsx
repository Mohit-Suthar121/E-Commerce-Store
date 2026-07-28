import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PreviousArrow from '../icons/PreviousArrow'
import NextArrow from '../icons/NextArrow'
import CartLogo from '../icons/CartLogo'
import { Link, useParams } from 'react-router-dom'
import { API } from '../api/axiosInstance'
import { useProductStore } from '../store/product.store'

const ProductDetailPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading,setIsLoading] = useState(true);
    const currentProduct = useProductStore((state)=>state.currentProduct);
    const setCurrentProduct = useProductStore((state)=>state.setCurrentProduct);
    const {id} = useParams();

    async function fetchProduct(){
        try {
            setIsLoading(true);
            const response = await API.get(`/v1/product/get-product/${id}`);
            console.log("the current product is: ",response.data);
            setCurrentProduct(response.data.product);
        } catch (error) {
            console.error("some error occured!",error);
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        fetchProduct();
    },[])

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#060606] text-neutral-200 font-sans antialiased select-none">
            <Navbar />
            
            <div className="main-content flex-1 flex flex-col gap-6 px-4 sm:px-8 md:px-16 py-6 max-w-7xl w-full mx-auto min-h-0">
                
                <div className="text-section flex flex-col gap-3 border-b border-neutral-900 pb-4">
                    <div className="navigation-navbar flex gap-2 items-center text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-500">
                        <Link to={'/'} >
                        <div className="home hover:text-neutral-300 cursor-pointer transition-colors">Home</div>
                        </Link>
                        <div className="arrow text-neutral-700">/</div>
                        <Link to={'/products'} >
                        <div className="products hover:text-neutral-300 cursor-pointer transition-colors">Products</div>
                        </Link>
                        <div className="arrow text-neutral-700">/</div>
                        <div className="text-neutral-400 truncate max-w-45 sm:max-w-none">iPhone 16 Plus</div>
                    </div>
                </div>

                <div className="product-main-details flex flex-col lg:flex-row gap-8 lg:gap-12 flex-1 min-h-0 items-start">
                    
                    <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto shrink-0">
                        
                        <div className="scrollwrapper overflow-x-auto lg:overflow-x-visible order-2 lg:order-1 flex p-1 scrollbar-none">
                            <div className="short-product-images flex flex-row lg:flex-col gap-3 mx-auto lg:mx-0">
                                {currentProduct.images?.map((image, index) => (
                                    <div 
                                        key={image._id} 
                                        onClick={() => setCurrentIndex(index)} 
                                        className={`product-image-card w-16 h-16 rounded-xl shrink-0 p-1 bg-[#0b0b0b] border transition-all duration-200 cursor-pointer overflow-hidden ${
                                            currentIndex === index 
                                                ? "border-neutral-400 scale-[0.98] shadow-md" 
                                                : "border-neutral-900 hover:border-neutral-700"
                                        }`}
                                    >
                                        <img src={image?.url} alt={`image ${index}`} className="w-full h-full object-cover rounded-lg mix-blend-luminosity hover:mix-blend-normal transition-all" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="main-image-big-preview flex-1 lg:w-120 aspect-square rounded-2xl border border-neutral-900 bg-[#0b0b0b] flex justify-center items-center relative overflow-hidden group shadow-xl order-1 lg:order-2">
                            
                            <div 
                                onClick={() => {
                                    if (currentIndex === 0) return;
                                    setCurrentIndex(currentIndex => currentIndex - 1)
                                }} 
                                className={`left-button absolute left-4 top-1/2 -translate-y-1/2 flex lg:hidden w-11 h-11 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white justify-center items-center p-2.5 transition-all active:scale-95 z-10 ${
                                    currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            >
                                <PreviousArrow className="w-full h-full" currentColor="currentColor" />
                            </div>
                            
                            <img 
                                src={currentProduct?.images?.[currentIndex]?.url} 
                                alt="Main Product Preview" 
                                className="w-full h-full object-contain p-6 select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]" 
                            />

                            <div 
                                onClick={() => {
                                    if (currentIndex === images.length - 1) return;
                                    setCurrentIndex(currentIndex => currentIndex + 1)
                                }} 
                                className={`right-button absolute right-4 top-1/2 -translate-y-1/2 flex lg:hidden w-11 h-11 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white justify-center items-center p-2.5 transition-all active:scale-95 z-10 ${
                                    currentIndex === currentProduct.images?.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            >
                                <NextArrow className="w-full h-full" currentColor="currentColor" />
                            </div>
                        </div>

                    </div>

                    <div className="product-text-details flex flex-col gap-5 flex-1 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto pr-2 scrollbar-none pb-12">
                        
                        <div className="flex flex-col gap-2">
                            <span className="product-type text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                                {currentProduct.subCategory} // {currentProduct.brandName}
                            </span>
                            <h1 className="main-heading font-extrabold text-2xl md:text-3xl tracking-tighter text-neutral-100 leading-tight">
                                {currentProduct.name}
                            </h1>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed tracking-tight mt-1 border-l-2 border-neutral-800 pl-3">
                                {currentProduct.productDesc} 
                            </p>
                        </div>

                        <div className="price font-mono text-3xl font-bold text-white tracking-tight py-2 border-b border-neutral-900">
                            ₹{Number(currentProduct.price).toLocaleString("en-US")}
                        </div>

                        <div className="scroll-wrapper py-2">
                            <div className="sub-details text-xs md:text-sm text-neutral-400 leading-relaxed font-normal tracking-tight space-y-4">
                                {currentProduct?.highlights?.map((highlight)=><p><strong className="block font-semibold mb-0.5 uppercase tracking-wide text-[11px] font-mono text-neutral-300">[ {highlight?.title} ]</strong>{highlight?.description}</p>)}
                               
                            </div>
                        </div>

                        <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center pt-4 border-t border-neutral-900 mt-2">
                            <div className="quantity flex gap-3 items-center shrink-0">
                                <label className="tag text-xs font-mono uppercase tracking-wider text-neutral-500">Qty:</label>
                                <input 
                                    className="rounded-xl h-11 w-16 bg-[#0b0b0b] border border-neutral-800 text-center text-white text-sm font-semibold font-mono focus:outline-none focus:border-neutral-600 transition-colors" 
                                    type="text" 
                                    defaultValue="1" 
                                />
                            </div>

                            <div className="add-to-cart w-full">
                                <button className="w-full sm:w-auto h-11 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-widest px-8 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-lg cursor-pointer whitespace-nowrap">
                                    <CartLogo className="w-4 h-4 text-black" currentColor="currentColor" /> 
                                    Add to cart
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage