import React, { useEffect, useMemo } from 'react'
import { fetchProducts } from '../api/fakeStoreAPI'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductStart, getProductsFalied, getProductsSuccess } from '../redux/features/productSlice';
import ResultCard from './ResultCard';
import SkeletonCard from './SkeletonCard';
import ProductFilters from './ProductFilters';
import FadeIn from './FadeIn';

const ProductGrid = () => {
    const { products, error, loading } = useSelector(
        (store) => store.getAllProducts,
    );
    const { searchQuery, category, sortOrder } = useSelector(state => state.filters);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        dispatch(fetchProductStart());
        let response = await fetchProducts();
        let data = response.map((item)=>({
          id: item.id,
          title : item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          rating: item.rating
        }));

        dispatch(getProductsSuccess(data));
      }
      catch(error){
        dispatch(getProductsFalied(error.message));
      }
    };
    
    // Only fetch if products are empty to prevent overwriting across navigations
    if (products.length === 0) {
      fetchData();
    }
  },[dispatch, products.length]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery));
    }

    // Category Filter
    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    // Sort Order
    if (sortOrder === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, searchQuery, category, sortOrder]);

  if(error) return (
    <div className="flex justify-center items-center py-20">
      <div className="bg-red-50 text-red-500 px-6 py-4 font-sans tracking-widest text-sm uppercase">
        Error loading products: {error}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-10" id="shop">
      <FadeIn>
        <div className="flex flex-col items-center justify-center mb-16 mt-8">
           <h2 className="text-4xl md:text-5xl font-serif text-charcoal italic mb-4">Our Collection</h2>
           <span className="text-sm font-sans tracking-widest uppercase text-gray-500">
             {loading ? 'Refreshing...' : `${filteredProducts.length} items`}
           </span>
        </div>
      </FadeIn>

      <ProductFilters />
      
      {filteredProducts.length === 0 && !loading ? (
        <div className="text-center py-32">
          <p className="text-charcoal font-sans text-lg tracking-widest uppercase">No products found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {loading 
            ? Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
            : filteredProducts.map((item, idx) => (
                <FadeIn delay={(idx % 4) * 100} key={item.id}>
                  <ResultCard item={item} />
                </FadeIn>
              ))
          }
        </div>
      )}
    </div>
  )
}

export default ProductGrid
