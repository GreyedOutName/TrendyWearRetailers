"use client";

import { FiPlus } from "react-icons/fi";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { LuArrowUpDown } from "react-icons/lu";
import { LuList } from "react-icons/lu";
import Image from "next/image";
import { useState } from "react";

export default function ProductsPage() {
  const [selected, setSelected] = useState<number[]>([1]);

  const products = [
    { id: 1, name: "Knitted Sweater" },
    { id: 2, name: "Knitted Sweater" },
    { id: 3, name: "Knitted Sweater" },
  ];

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-12">
        {/* Title */}
        <h1 className="text-[48px] font-bold text-[#C1121F] tracking-tight">
          Products
        </h1>

        {/* Buttons Row */}
        <div className="flex justify-end mt-6">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-blue-50 text-blue-600 px-5 py-3 rounded-xl text-[14px] font-medium hover:bg-blue-100 transition">
              <FiPlus size={24} />
              Add Item
            </button>

            <button className="flex items-center gap-2 bg-[#A52A2A] text-white px-5 py-3 rounded-xl text-[14px] font-semibold hover:bg-red-700 transition">
              <IoMdRemoveCircleOutline size={24} />
              Remove
            </button>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 px-6 py-4 text-[14px] text-[#8181A5] font-semibold">
        <div className="col-span-4">Name</div>

        {/* Sales */}
        <div className="col-span-1 flex items-center justify-center space-x-2 text-[14px] text-[#8181A5]">
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Sort Sales"
          >
            <LuArrowUpDown className="w-4 h-4 text-gray-500" />
          </button>
          <span>Sales</span>
        </div>

        {/* Qty */}
        <div className="col-span-1 flex items-center justify-center space-x-2 text-[14px] text-[#8181A5]">
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Sort Qty"
          >
            <LuArrowUpDown className="w-4 h-4 text-gray-500" />
          </button>
          <span>Qty.</span>
        </div>

        {/* Rating */}
        <div className="col-span-2 flex items-center justify-center space-x-2 text-[14px] text-[#8181A5]">
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Sort Rating"
          >
            <LuArrowUpDown className="w-4 h-4 text-gray-500" />
          </button>
          <span>Rating</span>
        </div>

        {/* Price */}
        <div className="col-span-2 flex items-center justify-center space-x-2 text-[14px] text-[#8181A5]">
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Sort Price"
          >
            <LuArrowUpDown className="w-4 h-4 text-gray-500" />
          </button>
          <span>Price</span>
        </div>

        {/* Tag */}
        <div className="col-span-1 flex items-center justify-center space-x-2 text-[14px] text-[#8181A5]">
          <button
            className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
            aria-label="Sort Tag"
          >
            <LuArrowUpDown className="w-4 h-4 text-gray-500" />
          </button>
          <span>Tag</span>
        </div>

        {/* Empty column for "More" */}
        <div className="col-span-1"></div>
      </div>

      {/* Rows */}
      <div className="space-y-4 mb-60">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-12 items-center bg-[#F9FAFB] rounded-2xl px-6 py-4"
          >
            {/* Name + Image */}
            <div className="col-span-4 flex items-center gap-4">
              <input
                type="checkbox"
                checked={selected.includes(product.id)}
                onChange={() => toggleSelect(product.id)}
                className="w-4 h-4 accent-blue-600"
              />

              <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
                  alt="product"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <span className="font-semibold text-[16px] text-[#1C1D21]">
                {product.name}
              </span>
            </div>

            {/* Sales */}
            <div className="col-span-1 text-center text-sm">
              <p className="font-semibold text-[16px] text-[#1C1D21]">1,597</p>
              <span className="text-[#8181A5] text-[14px]">Sales</span>
            </div>

            {/* Qty */}
            <div className="col-span-1 text-center text-sm">
              <p className="font-semibold text-[16px] text-[#1C1D21]">1236</p>
              <span className="text-[#8181A5] text-[14px]">Qty.</span>
            </div>

            {/* Rating */}
            <div className="col-span-2 text-center text-sm">
              <p className="font-semibold text-[16px] text-[#1C1D21]">4.8 / 5.0</p>
              <span className="text-[#8181A5] text-[14px]">Rating</span>
            </div>

            {/* Price */}
            <div className="col-span-2 text-center text-sm">
              <p className="font-semibold text-[#1C1D21]">$ 100.6</p>
              <span className="text-[#8181A5] text-[14px]">Price</span>
            </div>

            {/* Tag */}
            <div className="col-span-1 flex justify-center">
              <span className="bg-[#FFE680] text-[#58585B] text-[14px] font-semibold px-10 py-1.5 rounded-lg">
                Jacket
              </span>
            </div>

            {/* More button */}
            <div className="col-span-1 flex justify-end">
              <button
                className="p-2 rounded-full hover:bg-gray-200 transition-colors text-[#7D7D7D] flex items-center justify-center"
                aria-label="More options"
              >
                <LuList className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 text-sm">
        {/* Left: < Prev */}
        <div className="flex items-center gap-2 mr-12">
          <button className="px-2 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200">
            &lt;
          </button>
          <span className="text-gray-500">Prev</span>
        </div>

        {/* Page Numbers */}
        <div className="flex items-center gap-5">
          {[1, 2, 3, 4, 5].map((page) => (
            <span
              key={page}
              className={`px-3 py-1 rounded-lg font-bold ${page === 2
                  ? "bg-red-600 text-white"
                  : "text-black-500 hover:bg-gray-200"
                }`}
            >
              {page}
            </span>
          ))}
        </div>

        {/* Right: Next > */}
        <div className="flex items-center gap-2 ml-12">
          <span className="text-gray-500">Next</span>
          <button className="px-2 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}