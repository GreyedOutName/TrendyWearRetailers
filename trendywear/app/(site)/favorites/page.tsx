"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdKeyboardBackspace } from "react-icons/md";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      name: "Fifa 19",
      images: ["/images/placeholder.jpg"],
      price: 44,
      rating: 4.5,
      reviews: 120,
      colors: ["#000000"],
      inStock: true,
    },
    {
      id: 4,
      name: "DualShock 4",
      images: ["/images/placeholder.jpg"],
      price: 59.99,
      rating: 4.8,
      reviews: 320,
      colors: ["#000000", "#ffffff"],
      inStock: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      
      {/* OUTER WRAPPER: Matches your Cart page (max-w-7xl / 1280px) */}
      <div className="w-full max-w-7xl flex flex-col min-h-screen px-10">
        
        {/* HEADER: Spans the full 1280px width */}
        <header className="py-10">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-400 hover:text-black transition-colors mb-6 uppercase text-[10px] font-black tracking-[0.3em]"
          >
            <MdKeyboardBackspace className="text-xl" />
            Return to Store
          </Link>

          <div className="flex justify-between items-end border-b border-black pb-4">
            <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight ">
              My Favorites
            </h1>
            <span className="font-black text-lg mb-2 tracking-widest uppercase text-gray-900">
              {favorites.length} Items
            </span>
          </div>
        </header>

        <section className="flex-grow">
          <div className="max-w-[1044px]"> 
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 lg:pb-4">
                {favorites.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="py-40 text-center w-full">
                <div className="font-black text-gray-200 text-4xl uppercase tracking-[0.5em] mb-8">
                  Empty List
                </div>
                <Link
                  href="/"
                  className="inline-block border-b-2 border-black pb-1 font-black uppercase text-sm tracking-widest hover:text-gray-400"
                >
                  Start Exploring
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}