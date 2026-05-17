import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setCategory, setSortOrder } from '../redux/features/filterSlice';
import { Search } from 'lucide-react';

const ProductFilters = () => {
  const dispatch = useDispatch();
  const { searchQuery, category, sortOrder } = useSelector(state => state.filters);
  const { products } = useSelector(state => state.getAllProducts);

  // Dynamically extract unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  return (
    <div className="bg-transparent border-t border-b border-gray-200 py-6 mb-12 sticky top-20 z-40">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        
        {/* Categories Text Links (Left) */}
        <div className="flex-1 w-full overflow-x-auto flex gap-6 lg:gap-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => dispatch(setCategory(cat))}
              className={`whitespace-nowrap pb-1 border-b-2 text-sm uppercase tracking-widest transition-all duration-300 ${
                category === cat 
                  ? 'border-maroon text-maroon font-semibold' 
                  : 'border-transparent text-gray-500 hover:text-charcoal hover:border-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center w-full lg:w-auto gap-6 justify-end">
          {/* Search Bar */}
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-0 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-8 pr-0 py-2 border-b border-gray-200 bg-transparent placeholder-gray-400 focus:outline-none focus:border-maroon transition-colors text-sm font-sans tracking-wide text-charcoal"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>

          {/* Sort Dropdown */}
          <div className="w-full lg:w-48 whitespace-nowrap">
            <select
              value={sortOrder}
              onChange={(e) => dispatch(setSortOrder(e.target.value))}
              className="block w-full py-2 border-b border-gray-200 bg-transparent text-sm font-sans tracking-wide text-charcoal focus:outline-none focus:border-maroon cursor-pointer appearance-none"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductFilters;
