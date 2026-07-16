import React from 'react';
import CartLogo from '../icons/CartLogo';

const ProductCard = ({ name, productDesc, image, price, brandName, stock, category }) => {
  const isOutOfStock = stock <= 0;

  return (
    <div className='main-card flex flex-col w-[90%] md:w-[95%] h-full border items-start gap-2 p-2 rounded-2xl bg-[#0f0f0f] border-neutral-800 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 cursor-pointer relative group'>
      
      {category && (
        <span className="absolute top-4 right-4 z-10 text-xs font-semibold uppercase text-neutral-400 tracking-wider bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-lg">
          {category}
        </span>
      )}

      <div className="product-image w-full h-45 border border-neutral-800 bg-neutral-900 rounded-2xl overflow-hidden flex items-center justify-center">
        <img 
          className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105' 
          src={image} 
          alt={name || "Product Image"} 
        />
      </div>

      {brandName && (
        <div className="brand-name uppercase text-sm font-semibold text-neutral-500 tracking-wider mt-1">
          {brandName}
        </div>
      )}

      <div className="product-name w-full text-base font-semibold text-neutral-200 tracking-tight line-clamp-1">
        {name}
      </div>

      <div className="description w-full text-sm font-medium text-neutral-400 leading-snug line-clamp-2 text-ellipsis min-h-10">
        {productDesc}
      </div>

      <div className="flex justify-between items-center w-full my-1 px-1">
        <div className="show-price font-semibold text-lg text-gray-300">
          ₹ {price?.toLocaleString('en-IN')}
        </div>
        
        {stock !== undefined && (
          <div className={`text-xs font-semibold ${isOutOfStock ? 'text-rose-500' : 'text-neutral-500'}`}>
            {isOutOfStock ? 'Out of Stock' : `${stock} left`}
          </div>
        )}
      </div>

      <button 
        disabled={isOutOfStock}
        className={`add-to-cart w-full rounded-lg flex justify-center items-center gap-2 py-2.5 text-sm font-medium border transition-all duration-200 active:scale-95 cursor-pointer
          ${isOutOfStock 
            ? 'bg-neutral-900/40 border-neutral-900 text-neutral-600 cursor-not-allowed' 
            : 'bg-neutral-800/50 border-neutral-800 text-neutral-200 hover:bg-emerald-500 hover:text-white hover:border-emerald-500'
          }`}
      >
        <CartLogo className="w-6 h-6" currentColor={isOutOfStock ? "gray" : "white"} />
        <span>
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </span>
      </button>

    </div>
  );
};

export default ProductCard;