export default function ReportsAnalytics() {
  return (
    <div className="w-full flex flex-col pb-4 animate-in duration-300">
      <h1 className="text-4xl font-semibold text-[#b81d24] mb-8 tracking-wide">
        Reports & Analytics
      </h1>

      {/* ROW 1 */}
      <div className="flex flex-col lg:flex-row gap-6 w-full mb-6">
        {/* Top Left (5/12) */}
        <div className="w-full lg:w-5/12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-64 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenues</h2>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl font-bold text-gray-900 tracking-tight">15%</span>
            <span className="text-2xl text-green-500 font-medium pb-1">&#8599;</span>
          </div>
          <p className="text-gray-500 text-sm mb-auto">Increase compared to last week</p>
          <button className="text-[#9c6f37] text-sm font-medium hover:underline text-left mt-8 w-fit">
            Revenues report &rarr;
          </button>
        </div>

        {/* Top Right (7/12) */}
        <div className="w-full lg:w-7/12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-64 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Revenues</h2>
          <div className="flex items-end gap-3 mb-2">
            <span className="text-5xl font-bold text-gray-900 tracking-tight">15%</span>
            <span className="text-2xl text-green-500 font-medium pb-1">&#8599;</span>
          </div>
          <p className="text-gray-500 text-sm mb-auto">Increase compared to last week</p>
          <button className="text-[#9c6f37] text-sm font-medium hover:underline text-left mt-8 w-fit">
            Revenues report &rarr;
          </button>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="flex flex-col lg:flex-row gap-6 w-full items-stretch">
        
        {/* Bottom Left: 6/12 */}
        <div className="w-full lg:w-6/12 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">Deep Dive<br/>Analytics</h2>
          <div className="flex items-end gap-3 mb-4">
            <span className="text-6xl font-black text-gray-900 tracking-tighter">24.8k</span>
          </div>
          <p className="text-gray-600 text-base leading-relaxed mb-12">
            Detailed breakdown of user engagement across all platforms. 
          </p>
          
          <div className="mt-auto">
             <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#b81d24] h-full w-[70%] rounded-full"></div>
             </div>
             <p className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">Target Reach: 70%</p>
          </div>
        </div>

        {/* Bottom Right: Growth Chart & Summaries 6/12 */}
        <div className="w-full lg:w-6/12 flex flex-col gap-6">
          {/* Growth Area Chart */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Growth</h2>
              <button className="text-gray-400 text-xs border border-gray-100 px-3 py-1 rounded-md">Yearly ▼</button>
            </div>
            
            <div className="relative h-48 w-full">
              <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-gray-400">
                <span>100k</span><span>50k</span><span>20k</span><span>10k</span><span>0</span>
              </div>
              <div className="ml-10 h-full relative">
                <svg className="absolute inset-0 w-full h-[calc(100%-1.5rem)]" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <path d="M0,85 L20,80 L40,40 L60,70 L80,20 L100,5 L100,100 L0,100 Z" fill="rgba(34, 197, 94, 0.1)" />
                  <path d="M0,85 L20,80 L40,40 L60,70 L80,20 L100,5" fill="none" stroke="#22c55e" strokeWidth="3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mini Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-md font-bold text-gray-400 uppercase">Top month</h3>
              <p className="text-lg font-bold text-[#8c6b30]">November</p>
              <p className="text-md font-bold text-yellow-500">2019</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-md font-bold text-gray-400 uppercase">Top year</h3>
              <p className="text-lg font-bold text-[#8c6b30]">2023</p>
              <p className="text-md text-gray-500">96K sold</p>
            </div>
            {/* Top Buyer Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col justify-center">
              <h3 className="text-md font-bold text-gray-400 uppercase tracking-tight mb-3">Top buyer</h3>
              <div className="flex items-center gap-3">
                <img 
                  src="https://i.pravatar.cc/150?img=5" 
                  className="w-8 h-8 rounded-full object-cover shrink-0" 
                  alt="Maggie Johnson" 
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate leading-tight">Maggie Johnson</p>
                  <p className="text-sm text-gray-500 truncate">Oasis Organic</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}