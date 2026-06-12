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

const ProductDetailPage = () => {

    const [images, setImages] = useState([
        image1, image2, image3, image4, image5, image6
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className='w-full h-screen flex flex-col' >
            <Navbar />
            <div className="main-content flex-1 flex flex-col gap-2 px-10 py-2 min-h-0">
                <div className="text-section flex flex-col gap-2">
                    <div className="navigation-navbar flex gap-2 items-center text-neutral-400">
                        <div className="home">Home</div>
                        <div className="arrow">&gt;</div>
                        <div className="products">Products</div>
                        <div className="arrow">&gt;</div>
                    </div>
                    <div className="product-main-heading text-sm text-neutral-400">Apple iPhone 16 Plus 256GB: 5G Mobile Phone with A18 Chip, Advanced Dual-Camera System, All-Day Battery Life, Ceramic Shield and Dynamic Island; White</div>
                </div>


                <div className="product-main-details flex flex-col lg:flex-row gap-2 flex-1  min-h-0 ">

                    <div className="flex flex-col lg:flex-row">

                        <div className="scrollwrapper overflow-x-auto order-2 lg:order-1 flex justify-center  p-2 px-4 ">

                            <div className="short-product-images flex flex-row lg:flex-col gap-4">
                                {images.map((image, index) => <div key={index} className="product-image-card w-18 h-18 rounded-lg shrink-0 ">
                                    <img src={image} alt={`image ${index}`} className='w-full h-full rounded-lg' />
                                </div>)}

                            </div>
                        </div>

                        <div className="main-image-big-preview p-2 flex w-full order-1 lg:order-2 justify-center  relative">
                            <div className="left-button absolute left-1 top-1/2 -translate-y-1/2 flex lg:hidden w-12 h-12 rounded-full bg-red-400 justify-center items-center p-2">
                                <PreviousArrow className={"w-full h-full translate-x-1/8"} currentColor={"white"} />
                            </div>
                            <div className="product-image-card lg:w-138.5 h-full lg:max-h-130 rounded-lg  ">
                                <img src={image1} alt={`image ${1}`} className='w-full h-full rounded-lg' />
                            </div>
                            <div className="left-button absolute right-1 top-1/2 -translate-y-1/2 flex lg:hidden w-12 h-12 rounded-full bg-red-400 justify-center items-center p-2">
                                <NextArrow className={"w-full h-full"} currentColor={"white"} />
                            </div>
                        </div>

                    </div>


                    <div className="product-text-details flex flex-col gap-2 h-full  min-h-0 overflow-y-auto scrollbar-design">

                        <div className="main-heading font-bold text-4xl">Apple iPhone 16 Plus 256GB: 5G Mobile Phone with A18 Chip, Advanced Dual-Camera System, All-Day Battery Life, Ceramic Shield and Dynamic Island; White</div>
                        <div className="product-type text-neutral-400 font-bold">Mobile | Apple</div>
                        <div className="price font-mono  text-2xl">₹119901</div>

                        <div className="scroll-warpper flex-1">

                            <p className="sub-details ">BUILT FOR APPLE INTELLIGENCE — Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data — not even Apple.
                                TAKE TOTAL CAMERA CONTROL — Camera Control gives you an easier way to quickly access camera tools, like zoom or depth of field, so you can take the perfect shot in record time.
                                GET FURTHER AND CLOSER — The improved Ultra Wide camera with autofocus lets you take incredibly detailed macro photos and videos. Use the 48MP Fusion camera for stunning high-resolution images, and zoom in with the 2x optical-quality Telephoto.
                                PHOTOGRAPHIC STYLES — The latest-generation Photographic Styles give you greater creative flexibility, so you can make every photo even more you. And you can reverse any of those styles anytime you want.
                                SUPER-SMART A18 CHIP — A18 jumps two generations ahead of the A16 Bionic chip in iPhone 15. It enables Apple Intelligence, powers advanced photo and video features, and supports console-level gaming, with exceptional power effi
                                PHOTOGRAPHIC STYLES — The latest-generation Photographic Styles give you greater creative flexibility, so you can make every photo even more you. And you can reverse any of those styles anytime you want.
                                SUPER-SMART A18 CHIP — A18 jumps two generations ahead of the A16 Bionic chip in iPhone 15. It enables Apple Intelligence, powers advanced photo and video features, and supports console-level gaming, with exceptional power effi

                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductDetailPage