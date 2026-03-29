"use client"

import { createCheckout } from "@/app/actions/payrex/createCheckout";

//this is only for testing purposes
export default function CheckOut(){
    const handleCheckout = async () => {
        try {
            const url = await createCheckout();
            console.log("Checkout URL:", url);

            if (!url) {
                throw new Error("No checkout URL returned");
            }

            window.location.href = url;
        } catch (err) {
            console.error("Checkout error:", err);
        }
    };

    return (
        <button onClick={handleCheckout}>
            Checkout
        </button>
    );
}