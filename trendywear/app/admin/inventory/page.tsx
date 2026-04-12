"use client";

import { LuArrowUpDown, LuList } from "react-icons/lu";
import { FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/utils/supabase/client";

const BUCKET_NAME = "images";
const ITEMS_PER_PAGE = 10;

type InventoryItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  tags: string[];
};

export default function InventoryPage() {
  const [selected, setSelected] = useState<number[]>([]);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stockItem, setStockItem] = useState<InventoryItem | null>(null);
  const [stockInput, setStockInput] = useState("");
  const [menuItemId, setMenuItemId] = useState<number | null>(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLButtonElement>(null);

  const fetchItems = useCallback(async (page: number) => {
    const supabase = createClient();
    const from = (page - 1) * ITEMS_PER_PAGE;
    const to   = from + ITEMS_PER_PAGE - 1;

    const { data, count } = await supabase
      .from("items")
      .select("id, name, image_id, tags", { count: "exact" })
      .eq("is_active", true)
      .order("id", { ascending: true })
      .range(from, to);

    if (data && data.length > 0) {
      const itemIds = data.map(i => i.id);
      const { data: prices } = await supabase
        .from("prices")
        .select("item_id, price")
        .in("item_id", itemIds);

      const priceMap: Record<number, number> = {};
      (prices ?? []).forEach(p => { if (!(p.item_id in priceMap)) priceMap[p.item_id] = p.price; });

      const mapped = data.map(item => {
        const firstImageId = item.image_id?.[0] ?? null;
        const imageUrl = firstImageId
          ? supabase.storage.from(BUCKET_NAME).getPublicUrl(firstImageId).data.publicUrl
          : "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf";
        return {
          id: item.id,
          name: item.name ?? "Unnamed",
          image: imageUrl,
          price: priceMap[item.id] ?? 0,
          tags: item.tags ?? [],
        };
      });
      return { items: mapped, count: count ?? 0 };
    }
    return { items: [], count: 0 };
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchItems(currentPage).then(result => {
      if (cancelled) return;
      setItems(result.items);
      setTotalPages(Math.max(1, Math.ceil(result.count / ITEMS_PER_PAGE)));
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [fetchItems, currentPage]);

  useEffect(() => {
    if (!menuItemId) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) return;
      setMenuItemId(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuItemId]);

  const toggleSelect = (id: number) =>
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  //  Tag color map ────────────────────────────────────────────────────────────
  const TAG_COLORS: Record<string, string> = {
    Women:       "bg-pink-100 text-pink-700",
    Men:         "bg-blue-100 text-blue-700",
    Tops:        "bg-amber-100 text-amber-700",
    Dress:       "bg-purple-100 text-purple-700",
    Bottoms:     "bg-emerald-100 text-emerald-700",
    Accessories: "bg-orange-100 text-orange-700",
    Shirt:       "bg-sky-100 text-sky-700",
    Jacket:      "bg-yellow-100 text-yellow-800",
    Trouser:     "bg-indigo-100 text-indigo-700",
    Short:       "bg-teal-100 text-teal-700",
    Polo:        "bg-cyan-100 text-cyan-700",
  };
  const getTagColor = (tag: string) => TAG_COLORS[tag] ?? "bg-gray-100 text-gray-600";

  return (
    <div className="w-full">
      {stockItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold text-[#1C1D21] mb-4">Update Stock</h2>
            <div className="flex items-center justify-center gap-5 my-6">
            <button
              onClick={() => setStockInput(String(Math.max(0, Number(stockInput || 0) - 1)))}
              className="w-12 h-12 rounded-full bg-red-100 hover:bg-red-200 text-red-600 text-xl font-bold"
            >
              −
            </button>
            <input
              type="number"
              value={stockInput}
              onChange={(e) => setStockInput(e.target.value)}
              className="w-24 text-center border border-black rounded-xl px-3 py-3 text-base font-semibold appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              onClick={() => setStockInput(String(Number(stockInput || 0) + 1))}
              className="w-12 h-12 rounded-full bg-green-100 hover:bg-green-200 text-green-600 text-xl font-bold"
            >
              +
            </button>
          </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => { setStockItem(null); setStockInput(""); }} className="px-5 py-2 rounded-xl text-gray-400 hover:bg-gray-100 text-sm font-medium">Cancel</button>
              <button onClick={() => { setStockItem(null); setStockInput(""); }} className="px-5 py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700">Update Stock</button>
            </div>
          </div>
        </div>
      )}

      {menuItemId && (
        <>
          {typeof window !== "undefined" && createPortal(
            <div
              onMouseDown={e => e.stopPropagation()}
              style={{ position: "absolute", top: menuCoords.top, left: menuCoords.left, zIndex: 99999, width: 160 }}
              className="bg-[#1C1D21] rounded-xl shadow-2xl py-1"
            >
              <button
                onClick={() => {
                  setStockItem(items.find(i => i.id === menuItemId) || null);
                  setMenuItemId(null);
                }}
                className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-medium text-green-400 hover:bg-white/10 hover:text-green-300 transition"
              >
                <FiEdit2 className="w-3.5 h-3.5" /> Update Stock
              </button>
            </div>,
            document.body
          )}
        </>
      )}
      
      <div className="mb-12">
        <h1 className="text-3xl text-[#C1121F] tracking-tight font-bold">Inventory</h1>
      </div>

      <div className="grid grid-cols-12 px-6 py-4 text-[14px] text-[#8181A5] font-semibold">
        <div className="col-span-4">Name</div>
        <div className="col-span-1 flex items-center justify-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"><LuArrowUpDown className="w-4 h-4 text-gray-500" /></button>
          <span>Sales</span>
        </div>
        <div className="col-span-1 flex items-center justify-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"><LuArrowUpDown className="w-4 h-4 text-gray-500" /></button>
          <span>Qty.</span>
        </div>
        <div className="col-span-2 flex items-center justify-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"><LuArrowUpDown className="w-4 h-4 text-gray-500" /></button>
          <span>Rating</span>
        </div>
        <div className="col-span-2 flex items-center justify-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"><LuArrowUpDown className="w-4 h-4 text-gray-500" /></button>
          <span>Price</span>
        </div>
        <div className="col-span-1 flex items-center justify-center space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"><LuArrowUpDown className="w-4 h-4 text-gray-500" /></button>
          <span>Tag</span>
        </div>
        <div className="col-span-1"></div>
      </div>

      <div className="space-y-4 mb-75">
        {loading ? (
          <p className="text-gray-400 text-sm px-6">Loading inventory...</p>
        ) : items.length === 0 ? (
          <p className="text-gray-400 text-sm px-6">No items found.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="grid grid-cols-12 items-center bg-[#F9FAFB] rounded-2xl px-6 py-4">
              <div className="col-span-4 flex items-center gap-4">
                <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggleSelect(item.id)} className="w-4 h-4 accent-blue-600" />
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shadow-sm overflow-hidden">
                  <Image src={item.image} alt={item.name} width={40} height={40} className="object-contain" unoptimized />
                </div>
                <span className="font-semibold text-[16px] text-[#1C1D21]">{item.name}</span>
              </div>
              <div className="col-span-1 text-center">
                <p className="font-bold text-[15px] text-[#1C1D21]">—</p>
                <span className="text-[10px] font-bold text-[#8181A5] uppercase tracking-wider">Sales</span>
              </div>
              <div className="col-span-1 text-center">
                <p className="font-bold text-[15px] text-[#1C1D21]">—</p>
                <span className="text-[10px] font-bold text-[#8181A5] uppercase tracking-wider">Qty.</span>
              </div>
              <div className="col-span-2 text-center">
                <p className="font-bold text-[15px] text-[#1C1D21]">—</p>
                <span className="text-[10px] font-bold text-[#8181A5] uppercase tracking-wider">Rating</span>
              </div>
              <div className="col-span-2 text-center">
                <p className="font-bold text-[15px] text-[#1C1D21]">₱{item.price.toLocaleString()}</p>
                <span className="text-[10px] font-bold text-[#8181A5] uppercase tracking-wider">Price</span>
              </div>
              <div className="col-span-1 flex justify-center">
                <span className={`${getTagColor(item.tags[0] || "")} text-[14px] font-semibold px-4 py-1.5 rounded-lg`}>
                  {item.tags[0] ?? "—"}
                </span>
              </div>
              <div className="col-span-1 flex justify-end">
                <button 
                  ref={menuItemId === item.id ? menuRef : undefined}
                  onClick={(e) => {
                    if (menuItemId === item.id) {
                      setMenuItemId(null);
                    } else {
                      const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
                      setMenuCoords({
                        top: rect.bottom + window.scrollY + 6,
                        left: rect.right - 160,
                      });
                      setMenuItemId(item.id);
                    }
                  }}
                  className="p-2 rounded-full hover:bg-gray-200 transition-colors text-[#7D7D7D] flex items-center justify-center" 
                  aria-label="More options"
                >
                  <LuList className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center mt-12 text-sm">
        <div className="flex items-center gap-2 mr-12">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-2 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40">&lt;</button>
          <span className="text-gray-500">Prev</span>
        </div>
        <div className="flex items-center gap-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)} className={`px-3 py-1 rounded-lg font-bold ${page === currentPage ? "bg-red-600 text-white" : "text-black hover:bg-gray-200"}`}>
              {page}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-12">
          <span className="text-gray-500">Next</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-2 py-1 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-40">&gt;</button>
        </div>
      </div>
    </div>
  );
}