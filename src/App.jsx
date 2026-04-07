import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { setAuthUser } from './redux/features/authSlice'
import { setCart } from './redux/features/cartSlice'
import { setOrders } from './redux/features/orderSlice'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import OrderHistory from './pages/OrderHistory'
import ProductDetail from './pages/ProductDetail'
import Loader from './components/Loader'

const App = () => {
  const dispatch = useDispatch();
  const { isAuthReady, user } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const orders = useSelector(state => state.orders);
  
  const [showSplash, setShowSplash] = useState(true);
  const prevUserUid = useRef(undefined);
  const isHydrating = useRef(false);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        dispatch(setAuthUser({ 
          uid: firebaseUser.uid, 
          email: firebaseUser.email, 
          name: firebaseUser.displayName || firebaseUser.email.split('@')[0] 
        }));
      } else {
        dispatch(setAuthUser(null));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  // 2. Data Hydration & Merging ... 
  useEffect(() => {
    if (!isAuthReady) return;

    const currentUserUid = user?.uid;
    
    // Detect Login event (Transition from Guest/Undefined to User)
    if (currentUserUid && prevUserUid.current !== currentUserUid) {
      isHydrating.current = true;
      
      const guestCartRaw = localStorage.getItem('cart_guest');
      const userCartRaw = localStorage.getItem(`cart_${currentUserUid}`);
      const userOrdersRaw = localStorage.getItem(`orders_${currentUserUid}`);
      
      const guestItems = guestCartRaw ? JSON.parse(guestCartRaw) : [];
      const userItems = userCartRaw ? JSON.parse(userCartRaw) : [];
      const userOrders = userOrdersRaw ? JSON.parse(userOrdersRaw) : [];

      let mergedItems = [...userItems];
      guestItems.forEach(gItem => {
        const existing = mergedItems.find(uItem => uItem.id === gItem.id);
        if (existing) {
          existing.quantity += gItem.quantity;
        } else {
          mergedItems.push(gItem);
        }
      });

      dispatch(setCart(mergedItems));
      dispatch(setOrders(userOrders));
      localStorage.removeItem('cart_guest');
      isHydrating.current = false;
    } 
    
    else if (!currentUserUid && prevUserUid.current) {
      isHydrating.current = true;
      dispatch(setCart([]));
      dispatch(setOrders([]));
      isHydrating.current = false;
    }
    
    else if (!currentUserUid && prevUserUid.current === undefined) {
      isHydrating.current = true;
      const guestCartRaw = localStorage.getItem('cart_guest');
      const guestItems = guestCartRaw ? JSON.parse(guestCartRaw) : [];
      dispatch(setCart(guestItems));
      isHydrating.current = false;
    }

    prevUserUid.current = currentUserUid;
  }, [isAuthReady, user?.uid, dispatch]);

  // 3. Auto-Save Listener
  useEffect(() => {
    if (!isAuthReady || isHydrating.current) return;

    const storageKeySuffix = user ? user.uid : 'guest';
    localStorage.setItem(`cart_${storageKeySuffix}`, JSON.stringify(cart.items));
    
    if (user) {
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(orders.orderHistory));
    }
  }, [cart.items, orders.orderHistory, user, isAuthReady]);

  return (
    <div className="relative min-h-screen font-sans bg-ivory text-charcoal">
      
      {/* 🎬 Cinematic Loader Component (Mimics GSAP sequence without library) */}
      {showSplash && <Loader onComplete={() => setShowSplash(false)} />}

      {/* 🏠 Main Store Content */}
      <div className={`min-h-screen flex flex-col transition-opacity duration-700 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App;
