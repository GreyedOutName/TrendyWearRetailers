'use server'

import { createClient } from "@/utils/supabase/server";

export async function availVoucher(voucherCode: string, currentCartValue: number) {
    const supabase = await createClient()

    const {data,error} = await supabase
        .from('vouchers')
        .select('*')
        .eq('code', voucherCode)
        .single()

    if (error || !data) {
        return { success: false, message: 'Invalid voucher code' }
    }

    if (data.expiry_date && new Date(data.expiry_date) < new Date()) {
        return { success: false, message: 'Voucher code has expired' }
    }

    if (data.min_cart_value && currentCartValue < data.min_cart_value) {   
        return { success: false, message: `Minimum cart value of $${data.min_cart_value} required` }
    }

    if (data.discount > 0) {
        return { success: true, discount: data.discount, message: 'Voucher applied successfully' }
    }
}