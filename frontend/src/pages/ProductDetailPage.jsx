import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import image1 from "../assets/31pQkw-B4WL._SX342_SY445_QL70_FMwebp_.jpg"
import image2 from "../assets/51hRToIjgxL._SL1500_.jpg"
import image3 from "../assets/61cAW5VKUTL._SL1500_.jpg"
import image4 from "../assets/71kahbX9OlL._SL1500_.jpg"
import image5 from "../assets/81XzDQHVXQL._SL1500_.jpg"
import image6 from "../assets/81YnXfZ-NwL._SL1500_.jpg"
import PreviousArrow from '../icons/PreviousArrow'
import NextArrow from '../icons/NextArrow'
import CartLogo from '../icons/CartLogo'
import { Link } from 'react-router-dom'

const ProductDetailPage = () => {
    const [images, setImages] = useState([
        image1, image2, image3, image4, image5, image6
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

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
                                {images.map((image, index) => (
                                    <div 
                                        key={index} 
                                        onClick={() => setCurrentIndex(index)} 
                                        className={`product-image-card w-16 h-16 rounded-xl shrink-0 p-1 bg-[#0b0b0b] border transition-all duration-200 cursor-pointer overflow-hidden ${
                                            currentIndex === index 
                                                ? "border-neutral-400 scale-[0.98] shadow-md" 
                                                : "border-neutral-900 hover:border-neutral-700"
                                        }`}
                                    >
                                        <img src={image} alt={`image ${index}`} className="w-full h-full object-cover rounded-lg mix-blend-luminosity hover:mix-blend-normal transition-all" />
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
                                src={images[currentIndex]} 
                                alt="Main Product Preview" 
                                className="w-full h-full object-contain p-6 select-none pointer-events-none transition-transform duration-500 group-hover:scale-[1.02]" 
                            />

                            <div 
                                onClick={() => {
                                    if (currentIndex === images.length - 1) return;
                                    setCurrentIndex(currentIndex => currentIndex + 1)
                                }} 
                                className={`right-button absolute right-4 top-1/2 -translate-y-1/2 flex lg:hidden w-11 h-11 rounded-xl bg-neutral-950/80 backdrop-blur-md border border-neutral-800 text-white justify-center items-center p-2.5 transition-all active:scale-95 z-10 ${
                                    currentIndex === images.length - 1 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                                }`}
                            >
                                <NextArrow className="w-full h-full" currentColor="currentColor" />
                            </div>
                        </div>

                    </div>

                    <div className="product-text-details flex flex-col gap-5 flex-1 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto pr-2 scrollbar-none pb-12">
                        
                        <div className="flex flex-col gap-2">
                            <span className="product-type text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                                Mobile // Apple
                            </span>
                            <h1 className="main-heading font-extrabold text-2xl md:text-3xl tracking-tighter text-neutral-100 leading-tight">
                                Apple iPhone 16 Plus 256GB
                            </h1>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed tracking-tight mt-1 border-l-2 border-neutral-800 pl-3">
                                5G Mobile Phone with A18 Chip, Advanced Dual-Camera System, All-Day Battery Life, Ceramic Shield, and Dynamic Island; White.
                            </p>
                        </div>

                        <div className="price font-mono text-3xl font-bold text-white tracking-tight py-2 border-b border-neutral-900">
                            ₹119,901
                        </div>

                        <div className="scroll-wrapper py-2">
                            <div className="sub-details text-xs md:text-sm text-neutral-400 leading-relaxed font-normal tracking-tight space-y-4">
                                <p><strong className="block font-semibold mb-0.5 uppercase tracking-wide text-[11px] font-mono text-neutral-300">[ Built for Apple Intelligence ]</strong> Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data — not even Apple.</p>
                                <p><strong className="block font-semibold mb-0.5 uppercase tracking-wide text-[11px] font-mono text-neutral-300">[ Take Total Camera Control ]</strong> Camera Control gives you an easier way to quickly access camera tools, like zoom or depth of field, so you can take the perfect shot in record time.</p>
                                <p><strong className="block font-semibold mb-0.5 uppercase tracking-wide text-[11px] font-mono text-neutral-300">[ Get Further and Closer ]</strong> The improved Ultra Wide camera with autofocus lets you take incredibly detailed macro photos and videos. Use the 48MP Fusion camera for stunning high-resolution images, and zoom in with the 2x optical-quality Telephoto.</p>
                                <p><strong className=" block font-semibold mb-0.5 uppercase tracking-wide text-[11px] font-mono text-neutral-300">[ Super-Smart A18 Chip ]</strong> A18 jumps two generations ahead of the A16 Bionic chip in iPhone 15. It enables Apple Intelligence, powers advanced photo and video features, and supports console-level gaming, with exceptional power efficiency.</p>
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