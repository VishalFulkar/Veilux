import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import ProductGrid from '../components/ProductGrid';

const Homepage = () => {
  return (
    <div className="w-full bg-ivory min-h-screen transition-colors duration-300">
      <HeroCarousel />
      <ProductGrid />
    </div>
  )
}

export default Homepage;
