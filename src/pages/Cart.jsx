import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/features/cartSlice';
import { placeOrder } from '../redux/features/orderSlice';
import { Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Simulate payment / checkout process
    dispatch(placeOrder({
      items,
      total: Number(total.toFixed(2)),
      userEmail: user.email
    }));
    
    dispatch(clearCart());
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-ivory">
        <h2 className="text-4xl font-serif italic text-charcoal mb-4">Your bag is empty</h2>
        <p className="text-gray-500 mb-8 font-sans tracking-widest uppercase text-sm">Discover our latest arrivals to find something you'll love.</p>
        <Link to="/" className="px-8 py-4 bg-charcoal text-white font-sans text-sm tracking-widest uppercase hover:bg-maroon transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif italic text-charcoal mb-12 border-b border-gray-200 pb-6">Your Bag</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16 lg:items-start">
          <div className="lg:col-span-8">
            <ul className="divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-8">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-32 md:w-32 md:h-44 bg-white flex items-center justify-center p-4">
                      <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                  </div>

                  <div className="ml-6 flex-1 flex flex-col justify-center">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-serif italic text-charcoal">
                        {item.title}
                      </h3>
                      <p className="text-lg font-sans text-charcoal ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-xs font-sans tracking-widest uppercase text-gray-500">{item.category}</p>
                    
                    <div className="mt-6 flex items-center justify-between">
                      <div className="flex items-center border-b border-charcoal pb-1">
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} className="px-2 text-charcoal hover:text-maroon transition">
                          -
                        </button>
                        <span className="px-4 font-sans text-sm">{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} className="px-2 text-charcoal hover:text-maroon transition">
                          +
                        </button>
                      </div>

                      <button type="button" onClick={() => dispatch(removeFromCart(item.id))} className="text-xs uppercase tracking-widest text-gray-400 hover:text-maroon transition flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Order summary */}
          <section className="mt-16 bg-white p-8 lg:mt-0 lg:col-span-4 border border-gray-100">
            <h2 className="text-xl font-serif italic text-charcoal mb-8 border-b border-gray-200 pb-4">Order Summary</h2>
            <dl className="space-y-4 font-sans text-sm">
              <div className="flex items-center justify-between text-charcoal">
                <dt>Subtotal</dt>
                <dd>${subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between text-gray-500">
                <dt>Tax (8%)</dt>
                <dd>${tax.toFixed(2)}</dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 mt-6">
                <dt className="text-base font-semibold tracking-widest uppercase text-charcoal">Total</dt>
                <dd className="text-xl font-medium text-charcoal">${total.toFixed(2)}</dd>
              </div>
            </dl>

            <div className="mt-10">
              <button
                onClick={handleCheckout}
                className="w-full bg-charcoal hover:bg-maroon py-4 px-4 text-xs font-semibold tracking-widest uppercase text-white transition-colors flex items-center justify-center gap-2"
              >
                {isAuthenticated ? "Checkout Securely" : "Login to Checkout"}
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;