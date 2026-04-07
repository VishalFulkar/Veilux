import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const { orderHistory: orders = [] } = useSelector(state => state.orders);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-ivory">
        <h2 className="text-4xl font-serif italic text-charcoal mb-4">Please log in</h2>
        <p className="text-gray-500 mb-8 font-sans tracking-widest uppercase text-sm">You need to be logged in to view your orders.</p>
        <button onClick={() => navigate('/login')} className="px-8 py-4 bg-charcoal text-white font-sans text-sm tracking-widest uppercase hover:bg-maroon transition-colors">
          Log In
        </button>
      </div>
    );
  }

  const userOrders = orders.filter(order => order.userEmail === user?.email);

  if (userOrders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-ivory">
        <h2 className="text-4xl font-serif italic text-charcoal mb-4">No Orders Yet</h2>
        <p className="text-gray-500 mb-8 font-sans tracking-widest uppercase text-sm">You haven't placed any orders yet.</p>
        <Link to="/" className="px-8 py-4 bg-charcoal text-white font-sans text-sm tracking-widest uppercase hover:bg-maroon transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-ivory min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-serif italic text-charcoal mb-12 border-b border-gray-200 pb-6">Order History</h1>
        
        <div className="space-y-8">
          {userOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 p-8 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-6">
                <div>
                  <p className="text-sm tracking-widest uppercase text-gray-500 mb-1">
                    Order ID
                  </p>
                  <p className="text-lg font-serif italic text-charcoal">{order.id}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm tracking-widest uppercase text-gray-500 mb-1">
                    Date
                  </p>
                  <p className="text-base text-charcoal">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <p className="text-sm tracking-widest uppercase text-gray-500 mb-1">
                    Total
                  </p>
                  <p className="text-lg font-sans font-medium text-charcoal">${order.total.toFixed(2)}</p>
                </div>
              </div>
              
              <ul className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <li key={item.id} className="py-6 flex items-center">
                    <img src={item.image} alt={item.title} className="w-16 h-20 object-contain mix-blend-multiply bg-gray-50 p-2" />
                    <div className="ml-6 flex-1">
                      <h4 className="text-base font-serif italic text-charcoal">{item.title}</h4>
                      <p className="mt-1 text-xs uppercase tracking-widest text-gray-500">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
