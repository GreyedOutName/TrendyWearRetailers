'use client';

import { createClient } from "@/utils/supabase/client";

export type Product = {
    id: number;
    name: string;
    images: string[];
    oldPrice?: number;
    price: number;
    rating: number;
    reviews: number;
    is_liked: boolean;
    colors: string[];
    sizes: string[];
    tags: string[];
};

interface Item {
  id: number;
  name: string;
  image_id: string[];
  tags?: string[]; // Match your DB schema
}

const BUCKET_NAME = "images";

export type SortOption = "name" | "price_asc" | "rating" | null;

// Pass the category string here (which acts as a tag)
export async function fetchFavorites(search?: string | null,
    tags?: string | null,
    sortBy?: SortOption,
    createdAfter?: string | Date | null,
): Promise<Product[]> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const user_id = user?.id;

    if (!user_id) return [];

    let query = supabase
      .from("wishlist")
      // Use !inner and select tags instead of category
      .select("item:items!inner(id, name, image_id, tags, created_at)") 
      .eq("user_id", user_id);

    // Filter using the exact same logic from your fetchProducts reference
    if (search && search.trim() !== "") {
        query = query.ilike("item.name", `%${search}%`);
    }

    if (tags) {
        query = query.contains("item.tags", [tags]);
    }

    if (createdAfter) {
        const cutoffIso =
            typeof createdAfter === "string"
                ? createdAfter
                : createdAfter.toISOString();
        query = query.gte("item.created_at", cutoffIso);
    }

    const { data: raw_items, error } = await query;

    if (error || !raw_items) {
        throw error ?? new Error('No items returned');
    }

    const items: Item[] = raw_items?.flatMap(
      (w: any) => w.item
    ) || [];

    const itemIds = items.map((i) => i.id);
    if (itemIds.length === 0) return [];
    const now = new Date().toISOString();

    // Fetch prices
    const { data: prices } = await supabase
        .from("prices")
        .select("item_id, price")
        .in("item_id", itemIds)
        .lte("valid_from", now)
        .or(`valid_to.is.null,valid_to.gte.${now}`)
        .order("priority", { ascending: false });

    const priceGroups: Record<number, number[]> = {};
    if (prices) {
        for (const p of prices) {
            if (!priceGroups[p.item_id]) priceGroups[p.item_id] = [];
            priceGroups[p.item_id].push(p.price);
        }
    }

    const { data: reviews } = await supabase
        .from("reviews").select("item_id, rating").in("item_id", itemIds);

    const ratingMap: Record<number, { sum: number; count: number }> = {};
    if (reviews) {
        for (const r of reviews) {
            if (!ratingMap[r.item_id]) ratingMap[r.item_id] = { sum: 0, count: 0 };
            ratingMap[r.item_id].sum += r.rating;
            ratingMap[r.item_id].count += 1;
        }
    }

    const { data: variants } = await supabase
    .from("item_variants")
    .select("item_id, color, size")
    .in("item_id", itemIds);

    const colorMap: Record<number, Set<string>> = {};
    const sizeMap: Record<number, Set<string>> = {};
    if (variants) {
        for (const v of variants) {
            if (!colorMap[v.item_id]) colorMap[v.item_id] = new Set();
            colorMap[v.item_id].add(v.color);

            if (!sizeMap[v.item_id]) sizeMap[v.item_id] = new Set();
            sizeMap[v.item_id].add(v.size);
        }
    }

    const mapped: Product[] = items.map((item) => {
        const imageUrls = (item.image_id ?? []).map(
            (imgId: string) => supabase.storage.from(BUCKET_NAME).getPublicUrl(imgId).data.publicUrl
        );
        
        const rd = ratingMap[item.id];
        const rawAvg = rd ? rd.sum / rd.count : 0;
        const avgRating = rd ? Math.round(rawAvg * 2) / 2 : 0;

        const currentPrice: number = priceGroups[item.id]?.[0] ?? 0;
        const oldPrice: number | null =
        priceGroups[item.id]?.length > 1
            ? priceGroups[item.id][1]
            : null;

        return {
            id: item.id,
            name: item.name ?? "Unnamed",
            images: imageUrls.length > 0 ? imageUrls : ["/placeholder.jpg"],
            price: currentPrice,
            oldPrice: oldPrice && oldPrice > currentPrice ? oldPrice : undefined,
            rating: avgRating,
            reviews: rd?.count ?? 0,
            is_liked: itemIds.includes(item.id),
            colors: [...(colorMap[item.id] ?? new Set())],
            sizes: [...(sizeMap[item.id] ?? new Set())],
            tags: item.tags ?? [],
        };
    });

    if (sortBy === "price_asc") mapped.sort((a, b) => a.price - b.price);
    else if (sortBy === "rating") mapped.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "name") mapped.sort((a, b) => a.name.localeCompare(b.name));

    return mapped;
}