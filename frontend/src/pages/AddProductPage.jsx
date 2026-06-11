import React, { useState } from 'react'
import ImageIcon from '../icons/ImageIcon'
import PreviewImageCard from '../components/PreviewImageCard';

const AddProductPage = () => {
  const [images, setImages] = useState(0);
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

          <form className="flex flex-col gap-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                Product Name
              </label>
              <input
                type="text"
                className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                placeholder="e.g., iPhone 14 Pro"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                  Price (INR)
                </label>
                <input
                  type="text"
                  className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none font-mono"
                  placeholder="₹0.00"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full h-10 px-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none"
                  placeholder="e.g., Electronics"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                Brand Manufacturer
              </label>
              <input
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
                rows={4}
                className="w-full p-3.5 rounded-xl text-sm bg-neutral-950 border border-neutral-900 text-neutral-200 placeholder-neutral-700 focus:border-emerald-500/60 focus:ring-4 focus:ring-emerald-500/5 transition-all duration-200 outline-none resize-none leading-relaxed"
                placeholder="Provide a comprehensive breakdown of technical specifications, features, and item condition notes..."
              />
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <label className="text-xs font-semibold text-neutral-400 tracking-wide">
                Product Media Files
              </label>

              <div className="w-full border border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/40 rounded-xl p-6 flex flex-col justify-center items-center gap-2 cursor-pointer transition-colors duration-200 group">
                <ImageIcon className={"w-5 h-5 text-neutral-600 group-hover:text-neutral-400 transition-colors"} />
                <div className="flex flex-col items-center text-center gap-0.5">
                  <span className="text-xs font-medium text-neutral-300">
                    Click to upload assets or drag and drop
                  </span>
                  <span className="text-[10px] font-medium text-neutral-600 uppercase tracking-wider">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                </div>
              </div>

              {images > 0 && <div className="w-full image-preview-section flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3 p-1">
                <PreviewImageCard imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnmAj1AjznZgWIBgTn3mbUV2SQVL6k1UhHw&s"} />
                <PreviewImageCard imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnmAj1AjznZgWIBgTn3mbUV2SQVL6k1UhHw&s"} />
                <PreviewImageCard imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnmAj1AjznZgWIBgTn3mbUV2SQVL6k1UhHw&s"} />
                <PreviewImageCard imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnmAj1AjznZgWIBgTn3mbUV2SQVL6k1UhHw&s"} />
                <PreviewImageCard imageUrl={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnmAj1AjznZgWIBgTn3mbUV2SQVL6k1UhHw&s"} />
              </div>}

            </div>

            <button
              type="submit"
              className="w-full h-11 flex justify-center items-center rounded-xl bg-white hover:bg-neutral-200 text-black font-bold text-sm tracking-wide shadow-md cursor-pointer transition-colors active:scale-[0.99] mt-3"
            >
              Publish Product Line
            </button>

          </form>

        </div>

      </div>

    </div>
  )
}

export default AddProductPage