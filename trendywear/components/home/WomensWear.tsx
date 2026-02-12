import Image from 'next/image';
import { MdFavoriteBorder, MdArrowOutward } from 'react-icons/md';

export default function WomensWearScroll() {
  const products = [
    { id: 1, name: "Oversize Shirt", price: "$199.00", image: "/images/placeholder.jpg" },
    { id: 2, name: "Hooded Jacket", price: "$199.00", image: "/images/placeholder.jpg" },
    { id: 3, name: "Blue Oxford", price: "$199.00", image: "/images/placeholder.jpg" },
    { id: 4, name: "Beige Knit", price: "$149.00", image: "/images/placeholder.jpg" },
    { id: 5, name: "Casual Blazer", price: "$299.00", image: "/images/placeholder.jpg" },
    { id: 6, name: "Cotton Tee", price: "$89.00", image: "/images/placeholder.jpg" },
  ];

  return (
    <section className="w-full py-10 pl-8 bg-[#f8f9fa] overflow-hidden">
      
      <div className="ml-4 md:ml-8 lg:ml-[calc((100vw-1300px)/2+2rem)] bg-[#b91c1c] rounded-l-[15px] flex flex-col lg:flex-row overflow-hidden relative min-h-[600px] py-8">
        
        {/* LEFT PANEL */}
        <div className="w-full lg:w-[550px] shrink-0 p-8 md:p-12 text-white flex flex-col justify-between z-10 relative">
          <div className="space-y-4 pt-4">
            <h2 className="text-4xl text-[#FDF0D5] md:text-5xl lg:text-6xl font-semibold">
              Women's Wear
            </h2>
            <p className="text-red-100 text-3xl font-regular tracking-wide opacity-90">
              Made for her.
            </p>
          </div>

          <div className="pt-12 lg:pt-0 pb-1 border-b inline-flex items-center gap-2 w-fit cursor-pointer group">
            <span className="text-xl font-medium group-hover:text-red-100 transition">View All Product</span>
            <MdArrowOutward className="text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ml-4" />
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 min-w-0 bg-[#b91c1c] flex items-center relative">
          
          {/* SCROLL CONTAINER */}
          <div className="w-full flex items-center gap-6 px-6 py-8 overflow-x-auto hide-scrollbar scroll-smooth">
            
            {products.map((item) => (
              <div 
                key={item.id} 
                className="shrink-0 w-[280px] sm:w-[300px] group cursor-pointer"
              >
                <div className="aspect-[3.5/4] bg-neutral-100 rounded-3xl overflow-hidden mb-5 relative transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-black/20">    
                  {/* IMAGE */}
                  <Image
                    src={item.image}         
                    alt={item.name}
                    fill                      
                    className="object-cover"  
                    priority
                  />
                  <button 
                    title="Heart"
                    type="button"
                    className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors text-slate-900"
                  >
                    <MdFavoriteBorder size={20} />
                  </button>
                </div>

                <div className="text-white space-y-1">
                  <h3 className="font-medium text-[#FDF0D5] text-xl tracking-wide">{item.name}</h3>
                  <p className="font-regular opacity-80">{item.price}</p>
                </div>
              </div>
            ))}
            
            <div className="w-20 shrink-0" />
          </div>
        </div>
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