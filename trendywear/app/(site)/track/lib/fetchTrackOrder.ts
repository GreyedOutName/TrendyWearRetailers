import { createClient } from "@/utils/supabase/client";

export type TrackOrderItem = {
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

export type TrackOrderData = {
  id: string;
  status: string;
  total: number;
  date: string;
  dateDelivered: string | null;
  items: TrackOrderItem[];
};

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

const BUCKET_NAME = "images";

export async function fetchTrackOrder(orderId: string): Promise<TrackOrderData | null> {
  const supabase = createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id,
      status,
      total_price,
      created_at,
      date_delivered,
      order_items (
        quantity,
        price_at_checkout,
        item_variants (
          size,
          color,
          items (
            name,
            image_id
          )
        )
      )
    `)
    .eq("id", orderId)
    .single();

  if (error || !order) return null;

  const items: TrackOrderItem[] = order.order_items.map((oi: any) => {
    const imageUrls = (oi.item_variants?.items?.image_id ?? []).map(
            (imgId: string) => supabase.storage.from(BUCKET_NAME).getPublicUrl(imgId).data.publicUrl
        );
    return{
        name: oi.item_variants?.items?.name ?? "Unknown",
        image: imageUrls.length > 0 ? imageUrls : ["/placeholder.jpg"],
        color: oi.item_variants?.color ?? "-",
        size: oi.item_variants?.size ?? "-",
        quantity: oi.quantity,
        price: oi.price_at_checkout,
    }
  });

  return {
    id: `TW-${String(order.id).padStart(6, "0")}`,
    status: order.status.replace(/'/g, "").trim().toLowerCase(),
    total: order.total_price,
    date: formatDate(order.created_at)!,
    dateDelivered: formatDate(order.date_delivered),
    items:items,
};
}