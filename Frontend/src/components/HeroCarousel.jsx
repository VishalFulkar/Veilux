import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HeroCarousel = () => {
    // Using a fake store product as the hero image (preferably women's clothing)
    const { products } = useSelector((store) => store.getAllProducts);
    const heroProduct = products.find(p => p.category === "women's clothing" || p.category === "jewelery") || products[0];

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-10 md:py-20">
          <div className="w-full flex flex-col md:flex-row items-center relative">
             <div className="w-full md:w-1/2 z-10 md:-mr-20 text-center md:text-left mb-10 md:mb-0 pt-10">
                <h1 className="text-6xl md:text-8xl font-serif italic text-charcoal leading-tight">
                  Style,<br/> Redefined
                </h1>
                <p className="mt-6 text-sm text-gray-500 uppercase tracking-widest max-w-sm mx-auto md:mx-0 leading-relaxed">
                  The latest collection from Veilux is here. Shop our exclusive new arrivals.
                </p>
                <div className="mt-10">
                   <a href="#shop" className="border-b border-charcoal text-charcoal pb-1 font-semibold uppercase tracking-widest hover:text-maroon hover:border-maroon transition-colors cursor-pointer text-sm">
                     Shop Collection
                   </a>
                </div>
             </div>
             
             <Link to={heroProduct ? `/product/${heroProduct.id}` : '#'} className="w-full md:w-[65%] bg-white flex items-center justify-center p-10 h-[500px] md:h-[700px] relative mt-8 md:mt-0 ml-auto">
               {heroProduct ? (
                 <img src={heroProduct.image} alt="Hero" className="max-h-[90%] max-w-[90%] object-contain mix-blend-multiply" />
               ) : (
                 <div className="w-full h-full bg-ivory flex items-center justify-center font-sans tracking-widest text-sm uppercase text-gray-400">Loading...</div>
               )}
               <div className="absolute bottom-10 right-10 bg-ivory p-8 shadow-sm hidden lg:block">
                  <p className="font-serif italic text-2xl text-maroon">Mid-Season Sale</p>
                  <p className="text-xs uppercase tracking-widest mt-3 text-gray-500">Up to 40% off selected items</p>
               </div>
             </Link>
          </div>
        </div>
    )
}

export default HeroCarousel;
