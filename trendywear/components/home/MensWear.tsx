import Link from "next/link";
import Image from "next/image";
import { MdArrowOutward, MdFavoriteBorder } from "react-icons/md";

export default function MensWear() {
  const products = [
  { id: 1, name: "Striped Polo", price: "$129.00", image: "/images/placeholder.jpg" },
  { id: 2, name: "Slim Fit Jeans", price: "$159.00", image: "/images/placeholder.jpg" },
  { id: 3, name: "Leather Jacket", price: "$299.00", image: "/images/placeholder.jpg" },
  { id: 4, name: "Graphic Tee", price: "$89.00", image: "/images/placeholder.jpg" },
  { id: 5, name: "Casual Shorts", price: "$79.00", image: "/images/placeholder.jpg" },
];

  return (
    <section className="w-full bg-[#f8f9fa] py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        {/* Top Divider */}
        <div className="border-t border-slate-300 w-full mb-12" />
      </div>

      <div className="relative flex flex-col lg:flex-row gap-12 items-center lg:pr-[calc((100vw-1280px)/2+2rem)] pr-8">
        
        {/* LEFT PANEL */}
        <div className="flex-1 min-w-0 flex relative justify-end ">
          
          {/* SCROLL CONTAINER */}
          <div className="flex items-center gap-6 px-6 py-8 overflow-x-auto hide-scrollbar scroll-smooth">
            
            {products.map((item) => (
              <div 
                key={item.id} 
                className="shrink-0 w-[280px] sm:w-[300px] group cursor-pointer"
              >
                <div className="aspect-[3.5/4] rounded-3xl overflow-hidden mb-5 relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-black/20">    
                  
                  {/* IMAGE */}
                  <Image
                    src={item.image}         
                    alt={item.name}
                    fill                      
                    className="object-cover"  
                    priority
                  />
                  
                  {/* WISHLIST BUTTON */}
                  <button 
                    title="Heart"
                    type="button"
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors text-slate-900"
                  >
                    <MdFavoriteBorder size={20} />
                  </button>
                </div>

                {/* TEXT */}
                <div className="text-white space-y-1">
                  <h3 className="font-medium text-[#003049] text-xl tracking-wide">{item.name}</h3>
                  <p className="font-regular text-[#1E293B]">{item.price}</p>
                </div>
              </div>
            ))}
            
            {/* Padding at the end so last card isn’t flush to edge */}
            <div className="w-20 shrink-0" />
          </div>
        </div>

        {/* RIGHT SIDE: Text Content (Anchored) */}
        <div className="lg:w-[420px] w-full pl-8 lg:pl-0 flex flex-col justify-between lg:items-end text-center lg:text-right order-1 lg:order-2 shrink-0 min-h-[400px]">
          <div className="space-y-4 pt-4">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-wide mb-3 text-[#003049]">
              Men's Wear
            </h2>
            <p className="text-3xl font-regular tracking-wide opacity-90">
              Made for him.
            </p>
          </div>
          
          <Link 
            href="/mens" 
            className="inline-flex items-center gap-2 border-b border-slate-900 pb-1 text-slate-900 hover:opacity-70 transition group"
          >
          <span className="text-xl text-[#003049] font-medium group-hover:text-[#003049]-100 transition">View All Product</span>
            <MdArrowOutward className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-4" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {/* Bottom Divider */}
        <div className="border-t border-slate-300 w-full mt-12" />
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

