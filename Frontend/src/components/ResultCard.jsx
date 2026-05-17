import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { Link } from 'react-router-dom';

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to product detail
    dispatch(addToCart(item));
  };

  return (
    <Link 
      to={`/product/${item.id}`} 
      className="group block flex flex-col items-start bg-transparent transition-all overflow-hidden"
    >
      <div className="relative w-full aspect-[3/4] bg-white overflow-hidden mb-4 rounded-sm flex items-center justify-center p-6">
        <img 
          src={item.image} 
          alt={item.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 ease-in-out group-hover:scale-110" 
          loading="lazy"
        />
        
        {/* Subtle quick add overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
           <button 
             className="bg-charcoal text-white font-medium text-xs tracking-widest uppercase py-3 px-6 hover:bg-maroon transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-md"
             onClick={handleAddToCart}
           >
             Quick Add
           </button>
        </div>
      </div>
      
      {/* Product Info - Minimalist Layout */}
      <div className="w-full flex justify-between items-start pt-1">
        <div className="flex-1 pr-4">
          <h3 className="font-serif italic text-lg text-charcoal leading-tight line-clamp-2">
            {item.title}
          </h3>
        </div>
        <div>
          <span className="font-sans text-sm tracking-wide text-charcoal font-medium">
            ${item.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ResultCard;
