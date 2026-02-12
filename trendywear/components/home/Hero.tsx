// components/home/Hero.tsx
"use client";

import Link from "next/link";
import Carousel from "./ui/Carousel";
import Image from "next/image";
import CategoryLink from "./ui/CategoryLink";

export default function Hero() {
  // Carousel slides
  const slides = [
    {
      title: "Blouse Collection",
      description:
        "Description ng tshirt blah blah blah blah.",
      href: "/collections/blouse",
      image: "/images/placeholder.jpg",
    },
    {
      title: "Summer Collection",
      description: "Explore fun summer styles for the sunny days ahead.",
      href: "/collections/summer",
      image: "/images/placeholder.jpg",
    },
  ];

  return (
    <section className="w-full bg-[#f8f9fa] py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col">

        {/* TOP: Left Large + Right Stacked */}
        <div className="flex flex-col lg:flex-row gap-4 h-[500px] mb-12">
          
          {/* LEFT: Large Feature Card */}
          <div className="lg:flex-[2] relative flex-1 rounded-2xl overflow-hidden">
            <Carousel slides={slides} interval={4000} />
          </div> 

          {/* RIGHT: Stacked Small Cards */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="relative flex-1 rounded-2xl overflow-hidden group">.
              <Image
                src="/images/placeholder.jpg"           
                alt="#TrendyWear"
                fill
                className="object-cover"
                priority
              />
              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6">
                <span className="text-2xl font-medium text-white tracking-wide">#TrendyWear</span>
              </div>
            </div>

            <div className="relative flex-1 rounded-2xl overflow-hidden group">
              <Image
                src="/images/placeholder.jpg"           
                alt="#FunForTheSummer"
                fill
                className="object-cover"
                priority
              />
              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-6 left-6">
                <span className="text-2xl font-medium text-white tracking-wide">#FunForTheSummer</span>
              </div>
            </div>
          </div>

        </div> 

        {/* BOTTOM: Category Links */}
        <div className="flex flex-col md:flex-row gap-8">
          <CategoryLink title="Best Selling" href="/best-selling" />
          <CategoryLink title="Women's Wear" href="/womens" />
          <CategoryLink title="Men's Wear" href="/mens" />
        </div>

      </div>
    </section>
  );
}
