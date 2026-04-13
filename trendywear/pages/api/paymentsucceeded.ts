import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from '@/utils/supabase/server'  // ✅ Use server, not client

type ResponseData = { message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
    const supabase = await createClient();
    const body = req.body;
    return res.status(200).json({ message: `Received data: ${JSON.stringify(body)}` });
    /*
    if (req.method === 'POST') {
        //Get User ID from Supabase Auth
        const { data: { user }, error } = await supabase.auth.getUser();
        const id = user?.id || 'Unknown User'
        
        if (error || !user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        // Create a new order row for the user, Table: orders
        const { data: newOrder, error: newOrderError } = await supabase
            .from('orders')
            .insert({
                user_id: id,
            })
            .select()
            .single();

        if (newOrderError) {
            return res.status(400).json({ message: "Failed to create order" });
        }

        // Fetch the user's active cart and its items
        const {data:cart_id,error:cart_error}= await supabase
            .from('shopping_cart')
            .select('*')
            .eq('user_id', id)
            .single()

        if (cart_error) {
            return res.status(400).json({ message: "Cannot Find cart_id of User." });
        }
        
        const { data: cartItems, error: fetchError } = await supabase
            .from('cart_items')
            .select('*')
            .eq('cart_id', cart_id.id);
        
        if (fetchError) {
            return res.status(400).json({ message: "Cannot Fetch Cart_Items" });
        }

        // Insert cart items into order_items table with the new order_id
        const { error: insertError } = await supabase
            .from('order_items')
            .insert(
                cartItems.map(item => ({
                   
                    
                }))
            );

        

        res.status(200).json({ message: `Supabase Updated, User: ${user.email}` })
    } else {
        res.status(200).json({ message: 'Hello from the TrendyWear Team!' })
    }*/
}