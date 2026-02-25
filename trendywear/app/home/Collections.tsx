"use client";

import Image from "next/image";
import { collectionsData } from "../data/home/collections";

export default function Collections() {
  return (
    <section className="w-full bg-[#f8f9fa] py-20">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-medium">
            Collection for all seasons.
          </h2>
          <p className="font-light text-xl">
            A versatile foundation for every day. Our Collection for All Seasons blends 
            minimalist design with year-round durability, offering timeless essentials 
            engineered to transition effortlessly through any climate.
          </p>
        </div>

        {/* Flex Container */}
        <div className="flex flex-wrap justify-center -mx-3">
          {collectionsData.map((item, index) => {
            // compute mtClass here in a block
            const mtClass =
              index === 0 ? "lg:mt-12" :
              index === 1 ? "lg:mt-6" :
              index === 2 ? "lg:mt-24" : "lg:mt-0";

            return (
              <div
                key={item.id}
                className={`${mtClass} w-full sm:w-1/2 lg:w-1/5 px-3 mb-6 flex-shrink-0`}
              >
                <div className="aspect-[3/4] rounded-2xl transition duration-300 cursor-pointer relative group overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/20">
                    <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold text-black shadow-sm">
                      View Item
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}