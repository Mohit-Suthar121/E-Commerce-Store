import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PreviousArrow from '../icons/PreviousArrow'
import NextArrow from '../icons/NextArrow'
import CartLogo from '../icons/CartLogo'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API } from '../api/axiosInstance'
import { notifyFailure, notifySuccess } from '../utils/Toastify'
import { useCartStore } from '../store/cart.store'
import { useQuery } from '@tanstack/react-query'
import { useUser } from '../hooks/useCurrentUser'


const ProductDetailPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("")
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    
    const {user} = useUser();

    const guestAddProductToCart = useCartStore((state) => state.guestAddProductToCart);
    const navigate = useNavigate();


    const {data:currentProduct} = useQuery({
        queryKey:["product",id],
        queryFn:fetchProduct
    })


    async function fetchCart (){
        try {
            const response = await API.get("/v1/cart/get-cart");
            return response.data.cart;
        } catch (error) {
            console.error("some error occured fetching the cart!");
            throw error

        }
    }

    async function fetchProduct() {
        try {
            setIsLoading(true);
            const response = await API.get(`/v1/product/get-product/${id}`);
            console.log("the current Product:", response.data.product)
            return response.data.product;

        } catch (error) {
            console.error("some error occured!", error);
        } finally {
            setIsLoading(false);
        }
    }



    useEffect(() => {
        fetchProduct();
    }, [])

    const handleChange = (e) => {
        const numbersOnly = e.target.value.replace(/\D/g, "");
        const value = Number(numbersOnly);
        setQuantity(value);
    }

    const handleAddToCart = async () => {
        setIsLoading(true);
        setErrorMessage("");
        if (quantity > currentProduct?.stock) {
            setErrorMessage(`Only ${currentProduct?.stock} units left in stock`)
            return;
        }
        else if (quantity < 1) {
            setErrorMessage("Please select at least 1 unit to proceed");
            return;
        }

        if (!user) {
            // check if the product already exists in the store, if yes , then increase it's count;
            const productData = {
                productId: currentProduct._id,
                quantity
            }
            guestAddProductToCart(productData);
            console.log("the product successfully added to cart since the user was not logged in:")
            setIsLoading(false);
            notifySuccess("product added to cart successfully!")
            navigate("/cart")
        }


        else {
            const productData = {
                product: currentProduct?._id,
                quantity
            }
            try {
                const response = await API.post("/v1/cart/add-to-cart", productData);
                console.log("the products set in the cart are: ",response.data.cart.items);
                console.log("the response from the backend is: ", response.data);
                notifySuccess("product added to cart successfully!")
                navigate("/cart")
            } catch (error) {
                console.error("couldn't add product to cart: ", error?.response?.data || error?.response);
                notifyFailure(error?.response?.data || error?.response)
            } finally {
                setIsLoading(false)
            }
        }

    }

    const {data:cart} = useQuery({
        queryKey:["cart"],
        queryFn:fetchCart,
        enabled:!!user
    })

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
                                {currentProduct?.images?.map((image, index) => (
                                    <div
                                        key={image._id}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`product-image-card w-16 h-16 rounded-xl shrink-0 p-1 bg-[#0b0b0b] border transition-all duration-200 cursor-pointer overflow-hidden ${currentIndex === index
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
                                className={`left-button absolute left-4 top-1/2 -translate-y-1/2 flex lg:hidden w-11 h-11 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white justify-center items-center p-2.5 transition-all active:scale-95 z-10 ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
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
                                className={`right-button absolute right-4 top-1/2 -translate-y-1/2 flex lg:hidden w-11 h-11 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white justify-center items-center p-2.5 transition-all active:scale-95 z-10 ${currentIndex === currentProduct?.images?.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                <NextArrow className="w-full h-full" currentColor="currentColor" />
                            </div>
                        </div>

                    </div>

                    <div className="product-text-details flex flex-col gap-5 flex-1 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto pr-2 scrollbar-none pb-12">

                        <div className="flex flex-col gap-2">
                            <span className="product-type text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                                {currentProduct?.subCategory} // {currentProduct?.brandName}
                            </span>
                            <h1 className="main-heading font-extrabold text-2xl md:text-3xl tracking-tighter text-neutral-100 leading-tight">
                                {currentProduct?.name}
                            </h1>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed tracking-tight mt-1 border-l-2 border-neutral-800 pl-3">
                                {currentProduct?.productDesc}
                            </p>
                        </div>

                        <div className="price font-mono text-3xl font-bold text-white tracking-tight py-2 border-b border-neutral-900">
                            ₹{Number(currentProduct?.price).toLocaleString("en-US")}
                        </div>

                        <div className="scroll-wrapper py-2">
                            <div className="sub-details text-xs md:text-sm text-neutral-400 leading-relaxed font-normal tracking-tight space-y-4">
                                {currentProduct?.highlights?.map((highlight) => <p key={highlight._id} ><strong className="block font-semibold mb-0.5 uppercase tracking-wide text-[11px] font-mono text-neutral-300">[ {highlight?.title} ]</strong>{highlight?.description}</p>)}

                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full pt-4 border-t border-neutral-900 mt-2">
                            <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center">

                                {/* Quantity Stepper & Stock Tag */}
                                <div className="quantity flex items-center gap-3 shrink-0">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <label className="tag text-xs font-mono uppercase tracking-wider text-neutral-500">Qty:</label>
                                            {/* Max Stock Pill */}
                                            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-medium">
                                                {currentProduct?.stock} in stock
                                            </span>
                                        </div>
                                    </div>

                                    {/* Stepper Control Pill */}
                                    <div className="flex items-center h-11 bg-[#0b0b0b] border border-neutral-800 rounded-xl p-1">
                                        {/* Decrement Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (quantity == 1) return;
                                                setQuantity((state) => state - 1);
                                            }}
                                            disabled={quantity <= 1}
                                            type="button"
                                            className="w-8 h-full flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer select-none font-mono text-base font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            -
                                        </button>

                                        {/* Quantity Display */}
                                        <input
                                            onChange={handleChange}
                                            className="w-10 bg-transparent text-center text-white text-sm font-semibold font-mono focus:outline-none"
                                            type="text"
                                            value={quantity}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                        />

                                        {/* Increment Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (quantity == currentProduct?.stock) return;
                                                setQuantity((state) => state + 1);
                                            }}
                                            disabled={quantity == currentProduct?.stock}
                                            type="button"
                                            className="w-8 h-full flex items-center justify-center rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition-colors cursor-pointer select-none font-mono text-base font-bold active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add To Cart CTA */}
                                <div className="add-to-cart w-full">
                                    <button
                                        onClick={handleAddToCart}
                                        className={`w-full sm:w-auto h-11 bg-white hover:bg-neutral-200 text-black font-bold text-xs uppercase tracking-widest px-8 rounded-xl flex items-center justify-center gap-2.5 transition-all active:scale-[0.98] shadow-lg cursor-pointer whitespace-nowrap`}
                                    >
                                        {isLoading ? <div className="w-5 h-5 border-2 border-neutral-400 border-t-black rounded-full animate-spin" /> :
                                            <div className="flex gap-2 justify-center align-items-center">

                                                <CartLogo className="w-4 h-4 text-black" currentColor="currentColor" />
                                                <div className="text">Add to Cart</div>
                                            </div>
                                        }

                                    </button>
                                </div>

                            </div>

                            {/* Error Message UI Banner */}
                            {errorMessage && (
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fadeIn">
                                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{errorMessage}</span>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage