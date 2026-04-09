import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cartSlice';
import { Star, StarHalf } from 'lucide-react';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { products } = useSelector(state => state.getAllProducts);
  const existingProduct = products.find(p => p.id === parseInt(id));

  const [product, setProduct] = useState(existingProduct || null);
  const [loading, setLoading] = useState(!existingProduct);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!product) {
      const fetchSingleProduct = async () => {
        try {
          const res = await axios.get(`https://69d7f6619c5ebb0918c8a3d0.mockapi.io/products`);
          const allProducts = res.data;
          const p = allProducts.find(item => item.id === parseInt(id));
          if (p) {
            setProduct(p);
          } else {
            setError('Product not found.');
          }
        } catch (err) {
          setError('Failed to load product details.');
        } finally {
          setLoading(false);
        }
      };
      fetchSingleProduct();
    }
  }, [id, product]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2 aspect-[3/4] bg-gray-200"></div>
          <div className="w-full md:w-1/2 space-y-6 pt-10">
            <div className="h-10 bg-gray-200 w-full"></div>
            <div className="h-6 bg-gray-200 w-1/4"></div>
            <div className="h-32 bg-gray-200 w-full mt-8"></div>
            <div className="h-14 bg-gray-200 w-1/2 mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-ivory">
        <h2 className="text-2xl font-serif italic text-charcoal mb-4">Error</h2>
        <p className="text-gray-600 mb-6 font-sans tracking-widest uppercase text-sm">{error || 'Product not found.'}</p>
        <Link to="/" className="text-maroon font-bold text-sm tracking-widest uppercase border-b border-maroon pb-1">
           Back to Store
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const renderStars = (rate) => {
    const stars = [];
    const fullStars = Math.floor(rate);
    const hasHalfStar = rate % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-4 h-4 fill-maroon text-maroon" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<StarHalf key={i} className="w-4 h-4 fill-maroon text-maroon" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="bg-ivory min-h-screen pb-20 pt-10">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs font-sans tracking-widest uppercase text-gray-500 mb-12">
          <Link to="/" className="hover:text-charcoal transition-colors">
            Home
          </Link>
          <span className="mx-3">/</span>
          <span className="text-charcoal">{product.category}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 item-start">
          
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-12 aspect-[3/4] shadow-sm">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain mix-blend-multiply"
            />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start pt-8 pb-12">
            
            <h1 className="text-4xl sm:text-5xl font-serif italic text-charcoal leading-tight mb-6">
              {product.title}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pb-8 border-b border-gray-200">
              <p className="text-3xl font-sans font-medium text-charcoal">
                ${product.price}
              </p>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating?.rate || 0)}
                </div>
                <span className="text-xs font-sans tracking-widest uppercase text-gray-400">
                  {product.rating?.rate} / 5.0 ({product.rating?.count} reviews)
                </span>
              </div>
            </div>
            
            <div className="mb-12">
              <h3 className="text-xs font-sans tracking-widest uppercase text-maroon mb-4">Description</h3>
              <p className="text-base text-gray-600 font-sans leading-relaxed tracking-wide">
                {product.description}
              </p>
            </div>

            <div className="mt-auto space-y-4 pt-8">
              <button 
                onClick={handleAddToCart}
                className="w-full py-5 px-8 bg-charcoal hover:bg-maroon text-white font-sans text-sm font-semibold tracking-widest uppercase transition-colors duration-300"
              >
                Add to Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
