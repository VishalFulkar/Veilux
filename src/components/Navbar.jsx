import React, { useState } from 'react';
import { ShoppingBag, Search, User, Menu, LogOut, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { setCategory, setSearchQuery } from '../redux/features/filterSlice';

const Navbar = () => {
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleCategoryNav = (cat) => {
    dispatch(setCategory(cat));
    navigate('/');
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('shop');
      if(el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(searchInput));
    navigate('/');
    setTimeout(() => {
      const el = document.getElementById('shop');
      if(el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="w-full bg-ivory sticky top-0 z-50 py-6 px-4 md:px-12 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center">
          
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4 md:gap-12 w-1/3">
            <button onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="w-6 h-6 text-charcoal cursor-pointer md:hidden" />
            </button>
            <Link to="/" className="flex items-center">
              <h1 className="font-serif text-3xl font-bold tracking-tight text-maroon italic">
                Veilux
              </h1>
            </Link>
          </div>

          {/* Desktop Links (Center-Left aligned in layout structure) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-10">
            <button onClick={() => handleCategoryNav("All")} className="text-sm font-medium tracking-widest uppercase text-charcoal hover:text-maroon transition-colors cursor-pointer relative group">
              Shop All
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-maroon transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => handleCategoryNav("women's clothing")} className="text-sm font-medium tracking-widest uppercase text-charcoal hover:text-maroon transition-colors cursor-pointer relative group">
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-maroon transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => handleCategoryNav("men's clothing")} className="text-sm font-medium tracking-widest uppercase text-charcoal hover:text-maroon transition-colors cursor-pointer relative group">
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-maroon transition-all group-hover:w-full"></span>
            </button>
            <button onClick={() => handleCategoryNav("jewelery")} className="text-sm font-medium tracking-widest uppercase text-charcoal hover:text-maroon transition-colors cursor-pointer relative group">
              Accessories
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-maroon transition-all group-hover:w-full"></span>
            </button>
          </div>

          {/* Utilities */}
          <div className="flex items-center justify-end gap-6 w-1/3">
            
            {/* Top Navbar Search removed */}
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-4">
                 <div className="flex items-center gap-2 mr-2">
                   <User className="w-4 h-4 text-charcoal" />
                   <span className="text-xs font-bold tracking-widest uppercase text-charcoal">
                     Hi, {user?.name?.split(' ')[0]}
                   </span>
                 </div>
                 <button onClick={handleLogout} className="flex items-center gap-1 group border-b border-transparent hover:border-maroon pb-0.5">
                   <LogOut className="w-4 h-4 text-charcoal group-hover:text-maroon transition-colors" />
                   <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                      Logout
                   </span>
                 </button>
                 <Link to="/orders" className="text-xs font-semibold tracking-widest uppercase text-charcoal hover:text-maroon transition-colors border-b border-transparent hover:border-maroon pb-0.5">
                    Orders
                 </Link>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex items-center gap-2 group border-b border-transparent hover:border-maroon pb-0.5">
                <User className="w-4 h-4 text-charcoal group-hover:text-maroon transition-colors" />
                <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                   Log In
                </span>
              </Link>
            )}

            <Link to="/cart" className="flex items-center gap-2 group border-b border-transparent hover:border-maroon pb-0.5">
              <ShoppingBag className="w-4 h-4 text-charcoal group-hover:text-maroon transition-colors" />
              <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                Cart ({items.length})
              </span>
            </Link>
          </div>
          
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[100] transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 left-0 w-72 h-full bg-ivory shadow-2xl flex flex-col pt-6 px-6 transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-12">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-maroon italic">Veilux</h1>
            <button onClick={() => setIsMobileMenuOpen(false)}>
              <X className="w-6 h-6 text-charcoal hover:text-maroon transition-colors" />
            </button>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            <button onClick={() => handleCategoryNav("All")} className="text-left text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-maroon transition-colors">
              Shop All
            </button>
            <button onClick={() => handleCategoryNav("women's clothing")} className="text-left text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-maroon transition-colors">
              Women
            </button>
            <button onClick={() => handleCategoryNav("men's clothing")} className="text-left text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-maroon transition-colors">
              Men
            </button>
            <button onClick={() => handleCategoryNav("jewelery")} className="text-left text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-maroon transition-colors">
              Accessories
            </button>
          </div>

          <div className="mt-auto border-t border-gray-200 pt-8 pb-8 flex flex-col gap-6">
            <form onSubmit={handleSearchSubmit} className="flex items-center mb-4">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search store..." 
                className="flex-1 border-b border-charcoal bg-transparent text-sm font-sans focus:outline-none px-2 py-2 placeholder-gray-400 text-charcoal"
              />
              <button type="submit" className="ml-2">
                <Search className="w-5 h-5 text-charcoal hover:text-maroon transition-colors" />
              </button>
            </form>

            <Link onClick={() => setIsMobileMenuOpen(false)} to="/cart" className="flex items-center gap-4 group">
              <ShoppingBag className="w-5 h-5 text-charcoal group-hover:text-maroon transition-colors" />
              <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                Cart ({items.length})
              </span>
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-4 group">
                  <User className="w-5 h-5 text-charcoal" />
                  <span className="text-xs font-bold tracking-widest uppercase text-charcoal">
                     Hi, {user?.name?.split(' ')[0]}
                  </span>
                </div>
                <Link onClick={() => setIsMobileMenuOpen(false)} to="/orders" className="flex items-center gap-4 group">
                  <span className="w-5 h-5" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                     Order History
                  </span>
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-4 group text-left">
                  <LogOut className="w-5 h-5 text-charcoal group-hover:text-maroon transition-colors" />
                  <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                     Logout
                  </span>
                </button>
              </>
            ) : (
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="flex items-center gap-4 group">
                <User className="w-5 h-5 text-charcoal group-hover:text-maroon transition-colors" />
                <span className="text-xs font-semibold tracking-widest uppercase text-charcoal group-hover:text-maroon transition-colors">
                   Log In / Sign Up
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
