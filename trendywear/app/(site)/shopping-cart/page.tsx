"use client"
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  MdAdd, 
  MdRemove, 
  MdKeyboardBackspace 
} from 'react-icons/md';

export default function ShoppingCart() {
  const [items, setItems] = useState([
    { id: 1, name: 'Fifa 19', category: 'PS4', price: 44.00, quantity: 2, image: '/images/placeholder.jpg' },
    { id: 2, name: 'Glacier White 500GB', category: 'PS4', price: 249.99, quantity: 1, image: '/images/placeholder.jpg'},
    { id: 3, name: 'Platinum Headset', category: 'PS4', price: 119.99, quantity: 1, image: '/images/placeholder.jpg' },
  ]);

  const subtotal = useMemo(() =>    
    items.reduce((acc, item) => acc + (item.price * item.quantity), 0), 
  [items]);

  const updateQuantity = (id, delta) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      
      {/* Main Container - Shared Width for Cart and Checkout */}
      <div className="w-full max-w-7xl flex flex-col min-h-screen">
        
        {/* Scrollable Cart Section */}
        <div className="flex-grow p-6 md:p-10 lg:px-8">
          <div className="flex justify-between items-end border-b-1 border-black pb-4">
            <div>
              <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-6 uppercase text-[10px] font-black tracking-[0.3em]">
                <MdKeyboardBackspace className="text-xl" />
                Return to Store
              </Link>
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter uppercase">My Cart</h1>
            </div>
            <span className="font-black text-lg mb-2 tracking-widest uppercase">
              {items.length} Items
            </span>
          </div>

          <div className="lg:mt-2">
            {items.length > 0 ? (
              items.map((item) => (
                <div key={item.id} className="flex flex-col md:grid md:grid-cols-12 items-center py-2 border-b border-gray-200 group">
                  <div className="w-full md:col-span-6 flex gap-8">
                    <div className="bg-gray-50 p-2 rounded">
                      <img src={item.image} alt={item.name} className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-black text-md md:text-xl text-gray-900 uppercase tracking-tight">{item.name}</span>
                      <span className="text-gray-600 text-sm font-black uppercase mt-1 tracking-widest">{item.category}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-300 text-xs mt-8 text-left hover:text-red-500 transition-colors uppercase font-black tracking-[0.2em]"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between md:justify-center items-center w-full md:col-span-2 mt-4 md:mt-0">
                    <div className="flex items-center gap-6">
                      <MdRemove className="text-gray-300 cursor-pointer text-2xl hover:text-black transition-transform active:scale-75" onClick={() => updateQuantity(item.id, -1)} />
                      <span className="text-lg font-black min-w-[20px] text-center select-none">{item.quantity}</span>
                      <MdAdd className="text-gray-300 cursor-pointer text-2xl hover:text-black transition-transform active:scale-75" onClick={() => updateQuantity(item.id, 1)} />
                    </div>
                  </div>

                  <div className="flex justify-between md:justify-center items-center w-full md:col-span-2 mt-4 md:mt-0 px-2 font-bold text-gray-600 text-lg">
                     ₱{item.price.toFixed(2)}
                  </div>

                  <div className="flex justify-between md:justify-end items-center w-full md:col-span-2 mt-4 md:mt-0 px-2 font-black text-gray-900 text-lg md:text-xl">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-40 text-center font-black text-gray-200 text-4xl uppercase tracking-[0.5em]">Empty Cart</div>
            )}
          </div>
        </div>

        {/* STICKY CHECKOUT - Now strictly constrained to the 7xl width */}
        <div className="sticky bottom-0 w-full bg-white border-t-1 border-black py-8 px-6 md:px-16 lg:px-8 z-50 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">Estimated Total</span>
              <span className="text-2xl md:text-4xl font-black text-gray-900 tracking-tighter">₱{subtotal.toFixed(2)}</span>
            </div>

            <button 
              disabled={items.length === 0}
              className="w-full md:w-[320px] bg-black text-white py-2 md:py-6 text-xs font-black uppercase hover:bg-zinc-800 transition-all tracking-[0.5em] disabled:bg-gray-100 disabled:text-gray-300 active:scale-[0.98] shadow-2xl rounded-lg"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}