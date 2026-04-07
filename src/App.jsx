import React, { useEffect, useRef } from 'react'
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

const App = () => {
  const dispatch = useDispatch();
  const { isAuthReady, user } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart);
  const orders = useSelector(state => state.orders);
  
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

  // 2. Data Hydration & Merging (Triggered when Auth state is ready or user changes)
  useEffect(() => {
    if (!isAuthReady) return;

    const currentUserUid = user?.uid;
    
    // Detect Login event (Transition from Guest/Undefined to User)
    if (currentUserUid && prevUserUid.current !== currentUserUid) {
      isHydrating.current = true;
      
      // Get Guest Cart & Specific User Cart
      const guestCartRaw = localStorage.getItem('cart_guest');
      const userCartRaw = localStorage.getItem(`cart_${currentUserUid}`);
      const userOrdersRaw = localStorage.getItem(`orders_${currentUserUid}`);
      
      const guestItems = guestCartRaw ? JSON.parse(guestCartRaw) : [];
      const userItems = userCartRaw ? JSON.parse(userCartRaw) : [];
      const userOrders = userOrdersRaw ? JSON.parse(userOrdersRaw) : [];

      // MERGE LOGIC: Add guest items into user items
      let mergedItems = [...userItems];
      guestItems.forEach(gItem => {
        const existing = mergedItems.find(uItem => uItem.id === gItem.id);
        if (existing) {
          existing.quantity += gItem.quantity;
        } else {
          mergedItems.push(gItem);
        }
      });

      // Update Redux
      dispatch(setCart(mergedItems));
      dispatch(setOrders(userOrders));
      
      // Clear Guest Cart after merge
      localStorage.removeItem('cart_guest');
      
      isHydrating.current = false;
    } 
    
    // Detect Logout event (Transition from User to Guest)
    else if (!currentUserUid && prevUserUid.current) {
      isHydrating.current = true;
      dispatch(setCart([]));
      dispatch(setOrders([]));
      isHydrating.current = false;
    }
    
    // Detect Initial Guest Mount
    else if (!currentUserUid && prevUserUid.current === undefined) {
      isHydrating.current = true;
      const guestCartRaw = localStorage.getItem('cart_guest');
      const guestItems = guestCartRaw ? JSON.parse(guestCartRaw) : [];
      dispatch(setCart(guestItems));
      isHydrating.current = false;
    }

    prevUserUid.current = currentUserUid;
  }, [isAuthReady, user?.uid, dispatch]);

  // 3. Auto-Save Listener (Saves whenever state changes, IF not currently hydrating)
  useEffect(() => {
    if (!isAuthReady || isHydrating.current) return;

    const storageKeySuffix = user ? user.uid : 'guest';
    localStorage.setItem(`cart_${storageKeySuffix}`, JSON.stringify(cart.items));
    
    if (user) {
      localStorage.setItem(`orders_${user.uid}`, JSON.stringify(orders.orderHistory));
    }
  }, [cart.items, orders.orderHistory, user, isAuthReady]);

  if (!isAuthReady) {
    return <div className="min-h-screen bg-ivory flex items-center justify-center font-serif text-charcoal italic tracking-widest text-2xl">Veilux</div>;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-ivory text-charcoal transition-colors duration-500">
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
  )
}

export default App;
